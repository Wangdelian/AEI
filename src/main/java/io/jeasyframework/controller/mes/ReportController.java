/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.controller
 *文件名：  ReportController 
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017/06/20 15:39
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017/06/20 15:39
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.controller.mes;
import com.github.pagehelper.PageHelper;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.*;
import io.jeasyframework.service.*;
import io.jeasyframework.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by daixirui on 2017/6/20.
 */
@RestController
@RequestMapping("/biz/report")
public class ReportController extends AbstractController {
    @Autowired
    private SiteConfig siteConfig;
    @Autowired
    private ODAndonService odAndonService;
    @Autowired
    private ODCncToolService odCncToolService;
    @Autowired
    private ODGroupCheckService odGroupCheckService;
    @Autowired
    private ODMarkService odMarkService;
    @Autowired
    private ODTightenService odTightenService;

    @RequestMapping("/report1")
    public ModelAndView report1(HttpServletRequest req) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/report1","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }


    //2017年7月20日14:27:25添加 zbf
    @RequestMapping("/OEEPromote")
    public ModelAndView OEEReport(HttpServletRequest req) {
        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/Report/OEEPromote","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }

    //2017年7月21日11:42:58,页面不带数据
    @RequestMapping("/OEEDataTable")
    public ModelAndView OEEDataTable(HttpServletRequest req) {
        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/Report/OEEDataTable","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }

    @RequestMapping("/report2")
    public ModelAndView report2(HttpServletRequest req) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/Report/report2","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }
    @RequestMapping("/report4")
    public ModelAndView report4(HttpServletRequest req) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/Report/report4","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }
    @RequestMapping("/report7")
    public ModelAndView report7(HttpServletRequest req) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/Report/report7","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }
    @RequestMapping("/report16")
    public ModelAndView report16(HttpServletRequest req) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/Report/report16","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }
    @RequestMapping("/report3")
    public ModelAndView report3(HttpServletRequest req) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/Report/report3","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }

    @RequestMapping("/report5")
    public ModelAndView report5(HttpServletRequest req) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/Report/report5","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }

    @RequestMapping("/report6")
    public ModelAndView report6(HttpServletRequest req) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/Report/report6","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }

    @RequestMapping("/report8")
    public ModelAndView report8(HttpServletRequest req) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/Report/report8","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }

    @RequestMapping("/report9")
    public ModelAndView report9(HttpServletRequest req) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/Report/report9","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }

    @RequestMapping("/andonreport")
    /**
     * @method       andonreport
     * @description 
     * @author       daixirui@gmail.com
     * @date         2017/8/30 09:42
     * @param        [req]
     * @return       org.springframework.web.servlet.ModelAndView
     */
    public ModelAndView andonreport(HttpServletRequest req) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/Report/andonreport","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }

    @ResponseBody
    @RequestMapping(value = "/listbyandonreport/{pageNum}", method = RequestMethod.POST)
    public R listByAndonReport(@RequestBody Map<String, Object> condition, @PathVariable int pageNum) {

        PageHelper.startPage(pageNum, siteConfig.getPagesize());

        //根据条件设置查询时间位置
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        String  time = (String)condition.get("timeSwitch");

        //判断是否选中单选框时间按钮
        if (!"".equals(time)) {
            switch (time) {
                case "all":
                    c.add(Calendar.YEAR, -100);
                    break;
                case "three-day":
                    c.add(Calendar.DATE, -3);
                    break;
                case "one-week":
                    c.add(Calendar.DATE, -7);
                    break;
                case "one-month":
                    c.add(Calendar.MONTH, -1);
                    break;
                default:
                    break;
            }

            condition.put("startTime", new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(c.getTime()));
            condition.put("endTime", new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(new Date()));
        }


        Query query = new Query(condition,String.valueOf(siteConfig.getPagesize()));
        List<ODAndonEntity> ODAndonEntityList =odAndonService.queryList(query);

        int total = odAndonService.queryTotal(query);


        PageUtils pageUtil = new PageUtils(ODAndonEntityList, total, query.getLimit(), query.getPage());

        return R.ok().put("page", pageUtil);

    }

    @RequestMapping("/cnctoolreport")
    public ModelAndView CncToolReport(HttpServletRequest req) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/Report/cnctoolreport","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }

    @ResponseBody
    @RequestMapping(value = "/listbycnctoolreport/{pageNum}", method = RequestMethod.POST)
    public R listByCncToolReport(@RequestBody Map<String, Object> condition, @PathVariable int pageNum) {

        PageHelper.startPage(pageNum, siteConfig.getPagesize());

        //根据条件设置查询时间位置
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        String  time = (String)condition.get("timeSwitch");

        //判断是否选中单选框时间按钮
        if (!"".equals(time)) {
            switch (time) {
                case "all":
                    c.add(Calendar.YEAR, -100);
                    break;
                case "three-day":
                    c.add(Calendar.DATE, -3);
                    break;
                case "one-week":
                    c.add(Calendar.DATE, -7);
                    break;
                case "one-month":
                    c.add(Calendar.MONTH, -1);
                    break;
                default:
                    break;
            }

            condition.put("startTime", new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(c.getTime()));
            condition.put("endTime", new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(new Date()));
        }


        Query query = new Query(condition,String.valueOf(siteConfig.getPagesize()));
        List<ODCncToolEntity> ODCncToolEntityList =odCncToolService.queryList(query);

        int total = odCncToolService.queryTotal(query);


        PageUtils pageUtil = new PageUtils(ODCncToolEntityList, total, query.getLimit(), query.getPage());

        return R.ok().put("page", pageUtil);

    }

    @RequestMapping("/groupcheckreport")
    public ModelAndView GroupCheckReport(HttpServletRequest req) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/Report/groupcheckreport","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }

    @ResponseBody
    @RequestMapping(value = "/listbygroupcheckreport/{pageNum}", method = RequestMethod.POST)
    public R listByGroupCheckReport(@RequestBody Map<String, Object> condition, @PathVariable int pageNum) {

        PageHelper.startPage(pageNum, siteConfig.getPagesize());

        //根据条件设置查询时间位置
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        String  time = (String)condition.get("timeSwitch");

        //判断是否选中单选框时间按钮
        if (!"".equals(time)) {
            switch (time) {
                case "all":
                    c.add(Calendar.YEAR, -100);
                    break;
                case "three-day":
                    c.add(Calendar.DATE, -3);
                    break;
                case "one-week":
                    c.add(Calendar.DATE, -7);
                    break;
                case "one-month":
                    c.add(Calendar.MONTH, -1);
                    break;
                default:
                    break;
            }

            condition.put("startTime", new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(c.getTime()));
            condition.put("endTime", new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(new Date()));
        }


        Query query = new Query(condition,String.valueOf(siteConfig.getPagesize()));
        List<ODGroupCheckEntity> ODGroupCheckEntityList =odGroupCheckService.queryList(query);

        int total = odGroupCheckService.queryTotal(query);


        PageUtils pageUtil = new PageUtils(ODGroupCheckEntityList, total, query.getLimit(), query.getPage());

        return R.ok().put("page", pageUtil);

    }

    @RequestMapping("/markreport")
    public ModelAndView MarkReport(HttpServletRequest req) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/Report/markreport","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }

    @ResponseBody
    @RequestMapping(value = "/listbymarkreport/{pageNum}", method = RequestMethod.POST)
    public R listByMarkReport(@RequestBody Map<String, Object> condition, @PathVariable int pageNum) {

        PageHelper.startPage(pageNum, siteConfig.getPagesize());

        //根据条件设置查询时间位置
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        String  time = (String)condition.get("timeSwitch");

        //判断是否选中单选框时间按钮
        if (!"".equals(time)) {
            switch (time) {
                case "all":
                    c.add(Calendar.YEAR, -100);
                    break;
                case "three-day":
                    c.add(Calendar.DATE, -3);
                    break;
                case "one-week":
                    c.add(Calendar.DATE, -7);
                    break;
                case "one-month":
                    c.add(Calendar.MONTH, -1);
                    break;
                default:
                    break;
            }

            condition.put("startTime", new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(c.getTime()));
            condition.put("endTime", new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(new Date()));
        }


        Query query = new Query(condition,String.valueOf(siteConfig.getPagesize()));
        List<ODMarkEntity> ODMarkEntityList =odMarkService.queryList(query);

        int total = odMarkService.queryTotal(query);


        PageUtils pageUtil = new PageUtils(ODMarkEntityList, total, query.getLimit(), query.getPage());

        return R.ok().put("page", pageUtil);

    }

    @RequestMapping("/tightenreport")
    public ModelAndView TightenReport(HttpServletRequest req) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/Report/tightenreport","");

        ModelAndView view=mf.CreateModelAndView();

        return view;
    }

    @ResponseBody
    @RequestMapping(value = "/listbytightenreport/{pageNum}", method = RequestMethod.POST)
    public R listByTightenReport(@RequestBody Map<String, Object> condition, @PathVariable int pageNum) {

        PageHelper.startPage(pageNum, siteConfig.getPagesize());

        //根据条件设置查询时间位置
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        String  time = (String)condition.get("timeSwitch");

        //判断是否选中单选框时间按钮
        if (!"".equals(time)) {
            switch (time) {
                case "all":
                    c.add(Calendar.YEAR, -100);
                    break;
                case "three-day":
                    c.add(Calendar.DATE, -3);
                    break;
                case "one-week":
                    c.add(Calendar.DATE, -7);
                    break;
                case "one-month":
                    c.add(Calendar.MONTH, -1);
                    break;
                default:
                    break;
            }

            condition.put("startTime", new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(c.getTime()));
            condition.put("endTime", new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(new Date()));
        }


        Query query = new Query(condition,String.valueOf(siteConfig.getPagesize()));
        List<ODTightenEntity> ODTightenEntityList =odTightenService.queryList(query);

        int total = odTightenService.queryTotal(query);


        PageUtils pageUtil = new PageUtils(ODTightenEntityList, total, query.getLimit(), query.getPage());

        return R.ok().put("page", pageUtil);

    }
}
