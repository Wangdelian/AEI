package io.jeasyframework.controller.mes;
import com.github.pagehelper.PageHelper;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.service.MesScheduleService;
import io.jeasyframework.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;
import java.util.List;
import io.jeasyframework.entity.MesScheduleEntity;
/**
 * Created by yaobaolin on 2017/8/3 0003.
 */
@RestController
@RequestMapping("/mes/schedule")
public class MesProduceScheduleController {
    @Autowired
    private SiteConfig siteConfig;
    @Autowired
    private MesScheduleService mesScheduleService;
    /**
     *
     *初始化班次管理
     */
    @RequestMapping("/searchlist")
    public ModelAndView report1(HttpServletRequest req) {
        String webTitle=siteConfig.getWebTitle();
        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/MesSchedule/mesScheduleList","");
        ModelAndView view=mf.CreateModelAndView();
        return view;
    }
    /**
     * 查询所有班次
     */
    @RequestMapping("/list/{page}")
    public R list(@RequestParam Map<String, Object> params, @RequestBody Map<String,Object> condition, @PathVariable int page){

        String name=(String)condition.get("name");
        PageHelper.startPage(page,10);
        //查询列表数据
        Query query = new Query(params);
        query.put("name",name);
        List<MesScheduleEntity> list = mesScheduleService.queryList(query);
        int total = mesScheduleService.queryTotal(query);

        PageUtils pageUtil = new PageUtils(list, total, query.getLimit(), query.getPage());
        return R.ok().put("page", pageUtil);
    }
    /**
     * 删除班次
     */
    @RequestMapping("/delete/{ids}")
    public R delete(@RequestBody Long[] ids){

        mesScheduleService.deleteBatch(ids);
        return R.ok();
    }
    /**
     * 初始化编辑班次页面
     */
    @RequestMapping("/edit/{id}")
    public ModelAndView edit(HttpServletRequest req,@PathVariable("id") Long id) {

        String webTitle=siteConfig.getWebTitle();
        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/MesSchedule/editmesSchedule","");
        ModelAndView view=mf.CreateModelAndView();
        view.addObject("id",id);
        return view;
    }
    /**
     * 班次信息
     */
    @RequestMapping("/info/{id}")

    public R info(@PathVariable("id") Long id){
        MesScheduleEntity mesScheduleEntity = mesScheduleService.queryObject(id);

        return R.ok().put("mes", mesScheduleEntity);
    }
    /**
     * 更新班次
     */
    @RequestMapping("/update")
    public R update(@RequestBody MesScheduleEntity mesScheduleEntity,@RequestParam Map<String, Object> params){
        String timeStart=mesScheduleEntity.getfDatestart();
        String timeEnd=mesScheduleEntity.getfDateend();
        Query query = new Query(params);
        query.put("timeStart",timeStart);
        query.put("timeEnd",timeEnd);
        query.put("id",mesScheduleEntity.getfProducescheduleid());
        List<MesScheduleEntity> list = mesScheduleService.queryListCase(query);
        if(list.size()>0){
            return R.error("时间有重叠！");
        }

        mesScheduleService.update(mesScheduleEntity);
        return R.ok();
    }
    /**
     * 查询最大的结束时间
     */
    @RequestMapping("/getMaxend/{id}")
    public R maxEndtime(@PathVariable("id") Long id){

        MesScheduleEntity mesScheduleEntity = mesScheduleService.getMaxendTime(id);


        return R.ok().put("mesMax", mesScheduleEntity);
    }

    /**
     * 初始化新增班次
     */
    @RequestMapping("/add")
    public ModelAndView add(HttpServletRequest req) {
        String webTitle=siteConfig.getWebTitle();
        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/MesSchedule/addmesSchedule","");
        ModelAndView view=mf.CreateModelAndView();
        return view;
    }
    /**
     * 保存班次
     */
    @RequestMapping("/save")
    public R save(@RequestBody MesScheduleEntity mesScheduleEntity,@RequestParam Map<String, Object> params){

        String timeStart=mesScheduleEntity.getfDatestart();
        String timeEnd=mesScheduleEntity.getfDateend();
        mesScheduleEntity.setfPlanid("1");
        Query query = new Query(params);
        query.put("timeStart",timeStart);
        query.put("timeEnd",timeEnd);
        List<MesScheduleEntity> list = mesScheduleService.queryListCase(query);
        if(list.size()>0){
            return R.error("时间有重叠！");
        }
        mesScheduleService.save(mesScheduleEntity);
        return R.ok();
    }
}
