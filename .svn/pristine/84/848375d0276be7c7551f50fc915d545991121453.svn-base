package io.jeasyframework.controller.train;


import com.github.pagehelper.PageHelper;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.ChDictionaryCaroutEntity;
import io.jeasyframework.entity.ChTraincheckinfoEntity;
import io.jeasyframework.entity.SysLogEntity;
import io.jeasyframework.service.ChDictionaryCaroutService;
import io.jeasyframework.service.ChTraincheckinfoService;
import io.jeasyframework.service.SysLogService;
import io.jeasyframework.utils.*;
import io.jeasyframework.utils.annotation.SysLog;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static io.jeasyframework.utils.aop.SysLogAspect.makeLog;


/**
 * ${comments}
 */
@RestController
@RequestMapping("/train/trainout")
public class TrainOutController extends AbstractController {
    @Autowired
    private ChTraincheckinfoService chTraincheckinfoService;
    @Autowired
    private SiteConfig siteConfig;
    @Autowired
    private ChDictionaryCaroutService cHDictionaryCaroutService;
    @Autowired
    private SysLogService sysLogService;

    private static  int PAGE_LIMIT = 10;

    //出库预警当天数据，一页显示
    private static  int PAGE_LIMIT_TODAY = 10000;


    @RequestMapping("/searchlist")
    public ModelAndView searchlist(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/trainOut/trainOut", this.getUserSkin());
        ModelAndView view = mf.CreateModelAndView();
        return view;
    }

    /**
     * 列表
     */
    @RequestMapping(value = "/list/{pageNum}", method = RequestMethod.POST)
    public R list(@RequestBody Map<String, Object> params, @PathVariable("pageNum") int pageNum) {
        params.put("startTime",DateUtils.format(new Date(),"yyyy-MM-dd")+" 00:00:00");
        params.put("endTime",DateUtils.format(new Date(),"yyyy-MM-dd")+" 23:59:59");
        PageHelper.startPage(pageNum, PAGE_LIMIT_TODAY);
        //查询列表数据
        Query query = new Query(params);
        List<ChDictionaryCaroutEntity> list = cHDictionaryCaroutService.queryList(query);
        int total = cHDictionaryCaroutService.queryTotal(query);
        PageUtils pageUtil = new PageUtils(list, total,PAGE_LIMIT_TODAY, query.getPage());
        //即将出库的记录
        int nextIndex = -1;
        if(list!=null && list.size()>0){
            Date now = new Date();
            for (int i=0; i<list.size();i++){
                if (DateUtils.toDate(list.get(i).getFPredicttimeout().toString()).after(now)){
                    nextIndex = i;
                    break;
                }
            }
        }
        return R.ok().put("page", pageUtil).put("nextIndex",nextIndex);
    }

    /**
     * 历史查询
     */
    @RequestMapping(value = "/history/{pageNum}", method = RequestMethod.POST)
    public R history(@RequestBody Map<String, Object> params, @PathVariable("pageNum") int pageNum) {
        PageHelper.startPage(pageNum, PAGE_LIMIT);
        //查询列表数据
        Query query = new Query(params);
        List<ChDictionaryCaroutEntity> list = cHDictionaryCaroutService.queryHistoryList(query);
        int total = cHDictionaryCaroutService.queryHistoryTotal(query);
        PageUtils pageUtil = new PageUtils(list, total,PAGE_LIMIT, query.getPage());
        return R.ok().put("page", pageUtil);
    }


    @SysLog(value = "导出出库预警报表",type = "业务操作")
    @RequestMapping(value = "/exporttable", method = RequestMethod.GET)
    public void export(@RequestParam Map<String, Object> condition, HttpServletResponse response) {
        Query query = new Query(condition);
        List<ChDictionaryCaroutEntity> list = cHDictionaryCaroutService.queryHistoryList(query);
        List<Integer> excelWidth = new ArrayList<>();
        excelWidth.add(2500);
        excelWidth.add(3000);
        excelWidth.add(3500);
        excelWidth.add(2500);
        excelWidth.add(2500);
        excelWidth.add(6000);
        excelWidth.add(4000);
        excelWidth.add(3000);
        excelWidth.add(3000);
        excelWidth.add(3500);
        excelWidth.add(6000);
        excelWidth.add(4000);
        excelWidth.add(4000);

        List<String> excelHead = new ArrayList<>();
        excelHead.add("交路");
        excelHead.add("车次");
        excelHead.add("机车");
        excelHead.add("发站");
        excelHead.add("到站");
        excelHead.add("出库时间");
        excelHead.add("出库地点");
        excelHead.add("状态");
        excelHead.add("实际车次");
        excelHead.add("实际机车");
        excelHead.add("实际出库时间");
        excelHead.add("实际出库地点");
        excelHead.add("备注信息");

        List<String> paramItemsName = new ArrayList<>();
        paramItemsName.add("fReserve1");
        paramItemsName.add("fTrainorder");
        paramItemsName.add("trainName");
        paramItemsName.add("fDepartsite");
        paramItemsName.add("fTrainnumberverdict");
        paramItemsName.add("fArrivesite");
        paramItemsName.add("fPredicttimeout");
        paramItemsName.add("fPasssite");
        paramItemsName.add("fStatus1");
        paramItemsName.add("fPracticaltrainorder");
        paramItemsName.add("trainNameReal");
        paramItemsName.add("fPracticaltimeout");
        paramItemsName.add("fPracticalpasssite");
        paramItemsName.add("fRemark");

        HSSFWorkbook hssfWorkbook = ExportExcel.export2("出库预警报表" + DateUtils.formatT(new Date()) + "", excelHead, excelWidth, paramItemsName, list, ChDictionaryCaroutEntity.class);
        BufferedOutputStream buff = null;
        ServletOutputStream outSTr = null;

        try {
            response.setContentType("text/plain");
            response.addHeader("Content-Disposition",
                    "attachment;filename=" + URLEncoder.encode("出库预警报表" + DateUtils.format(new Date(), "yyyy年MM月dd日 HH时mm分ss秒") + "-.xls", "UTF-8"));
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

                SysLogEntity sysLog = makeLog("导出出库预警报表","业务操作",query,true);
                //保存系统日志
                sysLogService.save(sysLog);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
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
}
