package io.jeasyframework.controller.train;


import com.github.pagehelper.PageHelper;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.ChTraincheckdetailEntity;
import io.jeasyframework.entity.ChTraincheckinfoEntity;
import io.jeasyframework.entity.SysLogEntity;
import io.jeasyframework.service.ChTraincheckdetailService;
import io.jeasyframework.service.ChTraincheckinfoService;
import io.jeasyframework.service.SysLogService;
import io.jeasyframework.utils.*;
import io.jeasyframework.utils.annotation.SysLog;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedOutputStream;
import java.net.URLEncoder;
import java.util.*;

import static io.jeasyframework.utils.aop.SysLogAspect.makeLog;


/**
 * ${comments}
 */
@RestController
@RequestMapping("/train/trainmanage")
public class TrainManageController extends AbstractController {
    @Autowired
    private ChTraincheckinfoService chTraincheckinfoService;
    @Autowired
    private SiteConfig siteConfig;
    @Autowired
    private ChTraincheckdetailService chTraincheckdetailService;
    @Autowired
    private SysLogService sysLogService;

    private static  int PAGE_LIMIT = 20;

    @RequestMapping("/searchlist")
    public ModelAndView searchlist(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/TrainManage/trainManageList", this.getUserSkin());
        ModelAndView view = mf.CreateModelAndView();
        view.addObject("mileage",siteConfig.getMileage());
        return view;
    }

    @RequestMapping("/searchlistSH")
    public ModelAndView searchlistSH(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/TrainManage/trainManageListSH", this.getUserSkin());
        ModelAndView view = mf.CreateModelAndView();
        view.addObject("mileage",siteConfig.getMileage());
        return view;
    }

    /**
     * 列表
     */
    @RequestMapping(value = "/list/{pageNum}", method = RequestMethod.POST)
    public R list(@RequestBody Map<String, Object> params, @PathVariable("pageNum") int pageNum) {
        PageHelper.startPage(pageNum, siteConfig.getPagesize());
        //查询列表数据
        Query query = new Query(params);
        List<ChTraincheckinfoEntity> chTraincheckinfoList = chTraincheckinfoService.queryManageList(query);
        int total = chTraincheckinfoService.queryManageTotal(query);
        PageUtils pageUtil = new PageUtils(chTraincheckinfoList, total,siteConfig.getPagesize(), query.getPage());
        return R.ok().put("page", pageUtil);
    }

    @RequestMapping(value = "/queryJu", method = RequestMethod.POST)
    public R queryJu(@RequestBody Map<String, Object> params) {
        List<ChTraincheckinfoEntity> juInfoList = chTraincheckinfoService.queryJu(params);
        return R.ok().put("juInfoList", juInfoList);
    }

    @RequestMapping(value = "/queryDuan", method = RequestMethod.POST)
    public R queryDuan(@RequestBody Map<String, Object> params) {
        List<ChTraincheckinfoEntity> juInfoList = chTraincheckinfoService.queryDuan(params);
        return R.ok().put("juInfoList", juInfoList);
    }

    @RequestMapping(value = "/queryChang", method = RequestMethod.POST)
    public R queryChang(@RequestBody Map<String, Object> params) {
        List<ChTraincheckinfoEntity> juInfoList = chTraincheckinfoService.queryChang(params);
        return R.ok().put("juInfoList", juInfoList);
    }


    @SysLog(value = "导出过车管理报表",type = "业务操作")
    @RequestMapping(value = "/exporttable", method = RequestMethod.GET)
    public void export(@RequestParam Map<String, Object> condition, HttpServletResponse response) {
        //判断是否为上海局
        Boolean SHANGHAI = siteConfig.getWebTitle().indexOf("上海")!=-1;
        Query query = new Query(condition);
        List<ChTraincheckinfoEntity> chTraincheckinfoList = chTraincheckinfoService.queryManageList(query);
        List<Integer> excelWidth = new ArrayList<>();
        excelWidth.add(3000);
        excelWidth.add(2500);
        excelWidth.add(2500);
        //上海局定制
        if(SHANGHAI){
            excelWidth.add(4500);
            excelWidth.add(4500);
        }
        excelWidth.add(3500);
        excelWidth.add(3500);
        excelWidth.add(2000);
        excelWidth.add(6000);
        excelWidth.add(8000);
        excelWidth.add(3500);
        excelWidth.add(3500);
        excelWidth.add(3000);

        List<String> excelHead = new ArrayList<>();
        excelHead.add("车次");
        excelHead.add("综合车型");
        excelHead.add("综合车号");
        if(SHANGHAI){
            excelHead.add("当前里程(km)");
            excelHead.add("出入里程(km)");
        }
        excelHead.add("设备站场");
        excelHead.add("设备地点");
        excelHead.add("方向");
        excelHead.add("通过时间");
        excelHead.add("标签识别");
        excelHead.add("配属局");
        excelHead.add("配属段");
        excelHead.add("图像识别");

        List<String> paramItemsName = new ArrayList<>();
        paramItemsName.add("fTrainorder");
        paramItemsName.add("fTraintypeverdict");
        paramItemsName.add("fTrainnumberverdict");
        if(SHANGHAI){
            paramItemsName.add("fTrainstatus");
            paramItemsName.add("fTrainattribute");
        }
        paramItemsName.add("fPasssite");
        paramItemsName.add("fPasspoint");
        paramItemsName.add("fDirection");
        paramItemsName.add("fTimethrough");
        paramItemsName.add("fInforfid");
        paramItemsName.add("fBureauname");
        paramItemsName.add("fSectionname");
        paramItemsName.add("fInfoimage1");

        HSSFWorkbook hssfWorkbook = ExportExcel.export2("过车管理报表" + DateUtils.formatT(new Date()) + "", excelHead, excelWidth, paramItemsName, chTraincheckinfoList, ChTraincheckinfoEntity.class);
        BufferedOutputStream buff = null;
        ServletOutputStream outSTr = null;

        try {
            response.setContentType("text/plain");
            response.addHeader("Content-Disposition",
                    "attachment;filename=" + URLEncoder.encode("过车管理报表" + DateUtils.format(new Date(), "yyyy年MM月dd日 HH时mm分ss秒") + "-.xls", "UTF-8"));
            StringBuffer write = new StringBuffer();
            outSTr = response.getOutputStream();// 建立
            buff = new BufferedOutputStream(outSTr);
            buff.write(write.toString().getBytes("UTF-8"));
            if (hssfWorkbook != null) {
                hssfWorkbook.write(buff);
            }
            buff.flush();
            buff.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                buff.close();
                outSTr.close();

                SysLogEntity sysLog = makeLog("导出过车管理报表","业务操作",query,true);
                //保存系统日志
                sysLogService.save(sysLog);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
