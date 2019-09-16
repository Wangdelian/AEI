package io.jeasyframework.controller.train;


import com.github.pagehelper.PageHelper;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.ChTraincheckdetailEntity;
import io.jeasyframework.entity.SysLogEntity;
import io.jeasyframework.service.ChTraincheckdetailService;
import io.jeasyframework.service.SysLogService;
import io.jeasyframework.utils.*;
import io.jeasyframework.utils.annotation.SysLog;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import io.jeasyframework.entity.ChTraincheckinfoEntity;
import io.jeasyframework.service.ChTraincheckinfoService;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpSession;
import java.io.BufferedOutputStream;
import java.net.URLEncoder;

import static io.jeasyframework.utils.aop.SysLogAspect.makeLog;


/**
 * ${comments}
 *
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-10-23 09:36:04
 */
@RestController
@RequestMapping("/train/chtraincheckinfo")
public class ChTraincheckinfoController extends AbstractController {
    @Autowired
    private SysLogService sysLogService;
    @Autowired
    private ChTraincheckinfoService chTraincheckinfoService;
    @Autowired
    private SiteConfig siteConfig;
    @Autowired
    private ChTraincheckdetailService chTraincheckdetailService;

    private static int START_YEAR = 2018;

    @RequestMapping("/searchlist")
    public ModelAndView searchlist(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/TrainCheckinfo/traincheckinfolist", this.getUserSkin());
        ModelAndView view = mf.CreateModelAndView();
        view.addObject("mileage", siteConfig.getMileage());
        return view;
    }

    @RequestMapping("/datareport")
    public ModelAndView datareport(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/TrainCheckinfo/datareport", this.getUserSkin());
        ModelAndView view = mf.CreateModelAndView();
        return view;
    }

    @RequestMapping("/operation")
    public ModelAndView operation(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/operation/operation", this.getUserSkin());
        ModelAndView view = mf.CreateModelAndView();
        view.addObject("mileage", siteConfig.getMileage());
        return view;
    }

    @RequestMapping("/operationSH")
    public ModelAndView operationSH(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/operation/operationSH", this.getUserSkin());
        ModelAndView view = mf.CreateModelAndView();
        view.addObject("mileage", siteConfig.getMileage());
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
        List<ChTraincheckinfoEntity> chTraincheckinfoList = chTraincheckinfoService.queryList(query);
        int total = chTraincheckinfoService.queryTotal(query);
        PageUtils pageUtil = new PageUtils(chTraincheckinfoList, total, query.getLimit(), query.getPage());
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


    @ResponseBody
    @RequestMapping(value = "/queryreporterrorlist/{pageNum}", method = RequestMethod.POST)
    public R queryreporterrorlist(@RequestBody Map<String, Object> params, @PathVariable("pageNum") int pageNum) {
        params.put("startTime", DateUtils.format(new Date(), "yyyy-MM-dd") + " 00:00:00");
        params.put("endTime", DateUtils.format(new Date(), "yyyy-MM-dd") + " 23:59:59");
       /* params.put("startTime", "2018-01-01 00:00:00");
        params.put("endTime", "2019-01-01 00:00:00");*/
        PageHelper.startPage(pageNum, siteConfig.getPagesize());
        //查询列表数据
        Query query = new Query(params);
        List<ChTraincheckinfoEntity> chTraincheckinfoList = chTraincheckinfoService.queryreporterrorlist(query);
        int total = chTraincheckinfoService.queryreporterrorlistTotal(query);
        total = total > 100 ? 100 : total;
        PageUtils pageUtil = new PageUtils(chTraincheckinfoList, total, query.getLimit(), query.getPage());
        return R.ok().put("page", pageUtil);
    }


    @SysLog(value = "导出标签监测报表",type = "业务操作")
    @RequestMapping(value = "/exporttable", method = RequestMethod.GET)
    public void export(@RequestParam Map<String, Object> condition, HttpServletResponse response) {
        List<ChTraincheckinfoEntity> chTraincheckinfoList = chTraincheckinfoService.queryList(condition);
        List<Integer> excelWidth = new ArrayList<>();
        excelWidth.add(3500);
        excelWidth.add(3500);
        excelWidth.add(3500);
        excelWidth.add(3500);
        excelWidth.add(3500);
        excelWidth.add(3500);
        excelWidth.add(5000);
        excelWidth.add(3000);
        excelWidth.add(6000);
        excelWidth.add(6000);
        excelWidth.add(2500);
        excelWidth.add(3000);
        excelWidth.add(3000);


        List<String> excelHead = new ArrayList<>();
        excelHead.add("车次");
        excelHead.add("识别车型");
        excelHead.add("识别车号");
        excelHead.add("确认车型");
        excelHead.add("确认车号");
        excelHead.add("地点");
        excelHead.add("闸楼");
        excelHead.add("方向");
        excelHead.add("通过时间");
        excelHead.add("标签");
        excelHead.add("配属局");
        excelHead.add("配属段");
        excelHead.add("图像识别");


        List<String> paramItemsName = new ArrayList<>();
        paramItemsName.add("fTrainorder");
        paramItemsName.add("fTraintypeverdict");
        paramItemsName.add("fTrainnumberverdict");
        paramItemsName.add("fdetalReserve2");
        paramItemsName.add("fdetalReserve5");
        paramItemsName.add("fPasssite");
        paramItemsName.add("fPasspoint");
        paramItemsName.add("fDirection");
        paramItemsName.add("fTimethrough");
        paramItemsName.add("fInforfid");
        paramItemsName.add("fBureauname");
        paramItemsName.add("fSectionname");
        paramItemsName.add("fInfoimage1");

        HSSFWorkbook hssfWorkbook = ExportExcel.export2("标签监测报表" + DateUtils.formatT(new Date()) + "", excelHead, excelWidth, paramItemsName, chTraincheckinfoList, ChTraincheckinfoEntity.class);
        BufferedOutputStream buff = null;
        ServletOutputStream outSTr = null;

        try {
            response.setContentType("text/plain");
            response.addHeader("Content-Disposition",
                    "attachment;filename=" + URLEncoder.encode("标签监测报表" + DateUtils.format(new Date(), "yyyy年MM月dd日 HH时mm分ss秒") + "-.xls", "UTF-8"));
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

                SysLogEntity sysLog = makeLog("导出标签监测报表","业务操作",condition,true);
                //保存系统日志
                sysLogService.save(sysLog);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }


    @SysLog(value = "导出错误标签数据",type = "业务操作")
    @RequestMapping(value = "/exportreport")
    public void exportreport(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        //得到数据
        List<ChTraincheckinfoEntity> chTraincheckinfoerrorList = (List<ChTraincheckinfoEntity>) session.getAttribute("errorlist");

        List<Integer> excelWidth = new ArrayList<>();
        excelWidth.add(3500);
        excelWidth.add(3500);
        excelWidth.add(3500);
        excelWidth.add(3500);
        excelWidth.add(3500);
        excelWidth.add(2500);
        excelWidth.add(5000);
        excelWidth.add(3000);
        excelWidth.add(6000);
        excelWidth.add(6000);
        excelWidth.add(3000);
        excelWidth.add(3500);
        excelWidth.add(3500);


        List<String> excelHead = new ArrayList<>();
        excelHead.add("车次");
        excelHead.add("自动识别车型");
        excelHead.add("自动识别车号");
        excelHead.add("人工确认车型");
        excelHead.add("人工确认车号");
        excelHead.add("设备战场");
        excelHead.add("设备地点");
        excelHead.add("进出方向");
        excelHead.add("通过时间");
        excelHead.add("标签识别");
        excelHead.add("配属局");
        excelHead.add("配属段");
        excelHead.add("图像识别");

        List<String> paramItemsName = new ArrayList<>();
        paramItemsName.add("fTrainorder");
        paramItemsName.add("fTraintypeverdict");
        paramItemsName.add("fTrainnumberverdict");
        paramItemsName.add("fdetalReserve2");
        paramItemsName.add("fdetalReserve5");
        paramItemsName.add("fPasssite");
        paramItemsName.add("fPasspoint");
        paramItemsName.add("fDirection");
        paramItemsName.add("fTimethrough");
        paramItemsName.add("fInforfid");
        paramItemsName.add("fBureauname");
        paramItemsName.add("fSectionname");
        paramItemsName.add("fInfoimage1");


        //进行导出逻辑
        HSSFWorkbook hssfWorkbook = ExportExcel.export2("错误标签数据" + DateUtils.formatT(new Date()), excelHead, excelWidth, paramItemsName, chTraincheckinfoerrorList, ChTraincheckinfoEntity.class);
        BufferedOutputStream buff = null;
        ServletOutputStream outSTr = null;

        try {
            response.setContentType("text/plain");
            response.addHeader("Content-Disposition",
                    "attachment;filename=" + URLEncoder.encode("错误标签数据" + DateUtils.format(new Date(), "yyyy年MM月dd日 HH时mm分ss秒") + ".xls", "UTF-8"));
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

                SysLogEntity sysLog = makeLog("导出错误标签数据","业务操作",session,true);
                //保存系统日志
                sysLogService.save(sysLog);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping("/editchtraincheckinfo/{fid}")
    public ModelAndView editzerokmissue(HttpServletRequest req, @PathVariable("fid") Long fid) {
        String webTitle = siteConfig.getWebTitle();
        ChTraincheckinfoEntity chTraincheckinfoEntity = chTraincheckinfoService.queryObject(fid);
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/TrainCheckinfo/editchtraincheckinfo", this.getUserSkin());
        ModelAndView view = mf.CreateModelAndView();
        view.addObject("chTraincheckinfoEntity", chTraincheckinfoEntity);
        return view;
    }

    @RequestMapping(value = "/queryecharts", method = RequestMethod.POST)
    public Map report(@RequestBody Map<String, Object> condition, HttpServletRequest request) {
        HttpSession session = request.getSession();
        String daterange = condition.get("daterange").toString();
        String endtime = DateUtils.formatT(new Date());
        condition.put("endTime", endtime);
        Map<String, Object> resmap = new HashMap<String, Object>();
        if ("day".equals(daterange)) {
            resmap = queryreport(condition, 1, session);
        } else if ("week".equals(daterange)) {
            resmap = queryreport(condition, 7, session);
        } else if ("month".equals(daterange)) {
            resmap = queryreport(condition, 4, session);
        } else {
            resmap = queryreport(condition, 12, session);
        }
        return resmap;
    }

    public Map queryreport(Map condition, int datecount, HttpSession session) {
        condition.put("reportType", 0);
        Map<String, Object> resmap = new HashMap<String, Object>();
        List totallist = new ArrayList();
        List rightlist = new ArrayList();
        List errorlist = new ArrayList();
        List repairlist = new ArrayList();
        List datelist = new ArrayList();
        List<ChTraincheckinfoEntity> chTraincheckinfoList = new ArrayList<ChTraincheckinfoEntity>();
        List<ChTraincheckinfoEntity> chTraincheckinfoerrorList = new ArrayList<ChTraincheckinfoEntity>();
        int repairtotle = 0;
        //统计分析年报，近10年数据，2018年为开始年
        if (datecount == 12) {
            List<ChTraincheckinfoEntity> allchTraincheckinfoerrorList = new ArrayList<ChTraincheckinfoEntity>();
            Integer curryear = Integer.parseInt(condition.get("endTime").toString().substring(0, 4));
            Integer startyear;
            if (curryear > START_YEAR + 10) {
                startyear = curryear - 10;
            } else {
                startyear = START_YEAR;
            }
            for (int i = 0; i < 10; i++) {
                if (curryear < startyear) {
                    break;
                }
                condition.put("startTime", DateUtils.getStartTimeByYear(startyear));
                condition.put("endTime", DateUtils.getEndTimeByYear(startyear));
                condition.put("tagstatus", "");
                chTraincheckinfoList = chTraincheckinfoService.queryList(condition);
                condition.put("tagstatus", "0");
                //chTraincheckinfoerrorList = chTraincheckinfoService.queryerrorList(condition);
                chTraincheckinfoerrorList = chTraincheckinfoService.queryList(condition);
                repairtotle = chTraincheckinfoService.queryrepairList(condition);
                totallist.add(chTraincheckinfoList.size());
                rightlist.add(chTraincheckinfoList.size() - chTraincheckinfoerrorList.size());
                errorlist.add(chTraincheckinfoerrorList.size());
                repairlist.add(repairtotle);
                datelist.add((startyear++) + "年");
                allchTraincheckinfoerrorList.addAll(chTraincheckinfoerrorList);
            }
            resmap.put("totallist", totallist);
            resmap.put("rightlist", rightlist);
            resmap.put("errorlist", errorlist);
            resmap.put("repairlist", repairlist);
            resmap.put("datelist", datelist);
            session.setAttribute("errorlist", allchTraincheckinfoerrorList);
        }
        //统计分析日报
        else if (datecount == 1) {
            List<ChTraincheckinfoEntity> allchTraincheckinfoerrorList = new ArrayList<ChTraincheckinfoEntity>();
            Date begindate = DateUtils.toDate(DateUtils.getBackDayTime(DateUtils.toDate((String) condition.get("endTime")), 6));
            for (int i = 0; i < 7; i++) {
                condition.put("startTime", DateUtils.getBackDayTime(begindate, -i).substring(0, 11) + "00:00:00");
                condition.put("endTime", DateUtils.getBackDayTime(begindate, -i).substring(0, 11) + "23:59:59");
                condition.put("tagstatus", "");
                chTraincheckinfoList = chTraincheckinfoService.queryList(condition);
                condition.put("tagstatus", "0");
                //chTraincheckinfoerrorList = chTraincheckinfoService.queryerrorList(condition);
                chTraincheckinfoerrorList = chTraincheckinfoService.queryList(condition);
                repairtotle = chTraincheckinfoService.queryrepairList(condition);
                totallist.add(chTraincheckinfoList.size());
                rightlist.add(chTraincheckinfoList.size() - chTraincheckinfoerrorList.size());
                errorlist.add(chTraincheckinfoerrorList.size());
                repairlist.add(repairtotle);
                datelist.add(condition.get("endTime").toString().substring(0, 11));
                allchTraincheckinfoerrorList.addAll(chTraincheckinfoerrorList);
            }

            resmap.put("totallist", totallist);
            resmap.put("rightlist", rightlist);
            resmap.put("errorlist", errorlist);
            resmap.put("repairlist", repairlist);
            resmap.put("datelist", datelist);
            session.setAttribute("errorlist", allchTraincheckinfoerrorList);
        }
        //统计分析周报
        else if (datecount == 7) {
            List<ChTraincheckinfoEntity> allchTraincheckinfoerrorList = new ArrayList<ChTraincheckinfoEntity>();
            Date begindate = DateUtils.toDate(DateUtils.getFirstMonthDay(DateUtils.toDate(condition.get("endTime").toString()), 0));
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(begindate);
            calendar.setFirstDayOfWeek(Calendar.MONDAY);
            int weekcount = 0;
            int days = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
            for (int i = 0; i < days; i++) {
                if (i > 0) {
                    begindate = DateUtils.toDate(DateUtils.getBackDayTime(begindate, -1));
                }
                calendar.setTime(begindate);
                int k = new Integer(calendar.get(Calendar.DAY_OF_WEEK));
                if (k == 1) {// 若当天是周日
                    weekcount++;
                    if (i - 6 < 0) {
                        condition.put("startTime", DateUtils.getBackDayTime(begindate, i));
                    } else {
                        condition.put("startTime", DateUtils.getBackDayTime(begindate, 6));
                    }
                    condition.put("endTime", DateUtils.getBackDayTime(begindate, 0).substring(0, 11) + "23:59:59");
                } else if (k != 1 && i == days - 1) {// 若是本月最好一天，且不是周日
                    weekcount++;
                    condition.put("startTime", DateUtils.getBackDayTime(begindate, k - 2));
                    condition.put("endTime", DateUtils.getBackDayTime(begindate, 0).substring(0, 11) + "23:59:59");
                } else {
                    continue;
                }
                condition.put("tagstatus", "");
                chTraincheckinfoList = chTraincheckinfoService.queryList(condition);
                condition.put("tagstatus", "0");
                //chTraincheckinfoerrorList = chTraincheckinfoService.queryerrorList(condition);
                chTraincheckinfoerrorList = chTraincheckinfoService.queryList(condition);
                repairtotle = chTraincheckinfoService.queryrepairList(condition);
                totallist.add(chTraincheckinfoList.size());
                rightlist.add(chTraincheckinfoList.size() - chTraincheckinfoerrorList.size());
                errorlist.add(chTraincheckinfoerrorList.size());
                repairlist.add(repairtotle);
                datelist.add(new Date().getMonth() + 1 + "月第" + weekcount + "周" + "\n" + condition.get("startTime").toString().substring(5, 11) + "~ "
                        + condition.get("endTime").toString().substring(5, 11));
                allchTraincheckinfoerrorList.addAll(chTraincheckinfoerrorList);
            }
            resmap.put("totallist", totallist);
            resmap.put("rightlist", rightlist);
            resmap.put("errorlist", errorlist);
            resmap.put("repairlist", repairlist);
            resmap.put("datelist", datelist);
            session.setAttribute("errorlist", allchTraincheckinfoerrorList);
        }
        //统计分析月报
        else {
            List<ChTraincheckinfoEntity> allchTraincheckinfoerrorList = new ArrayList<ChTraincheckinfoEntity>();
            Integer curryear = Integer.parseInt(condition.get("endTime").toString().substring(0, 4));
            for (int i = 0; i < 12; i++) {
                condition.put("startTime", DateUtils.getStartTimeByMonth(curryear, i + 1));
                condition.put("endTime", DateUtils.getEndTimeByMonth(curryear, i + 1));
                condition.put("tagstatus", "");
                chTraincheckinfoList = chTraincheckinfoService.queryList(condition);
                condition.put("tagstatus", "0");
                //chTraincheckinfoerrorList = chTraincheckinfoService.queryerrorList(condition);
                chTraincheckinfoerrorList = chTraincheckinfoService.queryList(condition);
                repairtotle = chTraincheckinfoService.queryrepairList(condition);
                totallist.add(chTraincheckinfoList.size());
                rightlist.add(chTraincheckinfoList.size() - chTraincheckinfoerrorList.size());
                errorlist.add(chTraincheckinfoerrorList.size());
                repairlist.add(repairtotle);
                datelist.add((i + 1) + "月");
                allchTraincheckinfoerrorList.addAll(chTraincheckinfoerrorList);
            }
            resmap.put("totallist", totallist);
            resmap.put("rightlist", rightlist);
            resmap.put("errorlist", errorlist);
            resmap.put("repairlist", repairlist);
            resmap.put("datelist", datelist);
            session.setAttribute("errorlist", allchTraincheckinfoerrorList);
        }

        return resmap;

    }


    /**
     * 信息
     */
    @RequestMapping("/info/{fId}")
    public R info(@PathVariable("fId") Long fId) {
        ChTraincheckinfoEntity chTraincheckinfo = chTraincheckinfoService.queryObject(fId);

        return R.ok().put("chTraincheckinfo", chTraincheckinfo);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    public R save(@RequestBody ChTraincheckinfoEntity chTraincheckinfo) {
        chTraincheckinfoService.save(chTraincheckinfo);

        return R.ok();
    }


    /**
     * 修改运维监测的错误信息列表
     */
    @SysLog(value = "人工确认车型车号",type = "业务操作")
    @RequestMapping(value = "/updaterrorinfo", method = RequestMethod.POST)
    public R updaterrorinfo(@RequestBody ChTraincheckinfoEntity chTraincheckinfo) {
        //ChTraincheckinfoEntity chTraincheckinfotguid = chTraincheckinfoService.queryObject(chTraincheckinfo.getFId());
        ChTraincheckdetailEntity chTraincheckdetail = new ChTraincheckdetailEntity();
        chTraincheckdetail.setFId(chTraincheckinfo.getFId());
        chTraincheckdetail.setFReserve3(getUser().getChineseName());
        chTraincheckdetail.setFReserve4(DateUtils.formatT(new Date()));
        chTraincheckdetail.setFReserve5(chTraincheckinfo.getfTrainnumberverdict());
        chTraincheckdetail.setFReserve2(chTraincheckinfo.getfTraintypeverdict());
        chTraincheckdetail.setFBureauname(chTraincheckinfo.getfBureauname());
        chTraincheckdetail.setFSectionname(chTraincheckinfo.getfSectionname());
        chTraincheckdetailService.update(chTraincheckdetail);
        chTraincheckdetailService.updateResult(chTraincheckdetail);

        SysLogEntity sysLog = makeLog("人工确认车型车号","业务操作",chTraincheckinfo,true);
        //保存系统日志
        sysLogService.save(sysLog);

        return R.ok();
    }

    /**
     * 标签监测人工销号，chTraincheckdetail.FReserve1变为1
     */
    @SysLog(value = "标签监测人工销号",type = "业务操作")
    @RequestMapping(value = "/updateStatus", method = RequestMethod.POST)
    public R updateStatus(@RequestBody ChTraincheckinfoEntity chTraincheckinfo) {
        //ChTraincheckinfoEntity chTraincheckinfotguid = chTraincheckinfoService.queryObject(chTraincheckinfo.getFId());
        ChTraincheckdetailEntity chTraincheckdetail = new ChTraincheckdetailEntity();
        chTraincheckdetail.setFId(chTraincheckinfo.getFId());
        //1为已修复，
        chTraincheckdetail.setFReserve1(1);
        chTraincheckdetailService.update(chTraincheckdetail);
        chTraincheckdetailService.updateResult(chTraincheckdetail);

        SysLogEntity sysLog = makeLog("标签监测人工销号","业务操作",chTraincheckinfo,true);
        //保存系统日志
        sysLogService.save(sysLog);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public R update(@RequestBody ChTraincheckinfoEntity chTraincheckinfo) {
        chTraincheckinfoService.update(chTraincheckinfo);
        ChTraincheckdetailEntity chTraincheckdetail = new ChTraincheckdetailEntity();
        //chTraincheckdetail.setFId(chTraincheckinfo.getFId());
        chTraincheckdetail.setFTguid(chTraincheckinfo.getFTguid());
        chTraincheckdetail.setFTrainnumberverdict(chTraincheckinfo.getfTrainnumberverdict());
        chTraincheckdetail.setFTraintypeverdict(chTraincheckinfo.getfTraintypeverdict());
        chTraincheckdetail.setFBureauname(chTraincheckinfo.getfBureauname());
        chTraincheckdetail.setFSectionname(chTraincheckinfo.getfSectionname());
        chTraincheckdetail.setFInforfid(chTraincheckinfo.getfInforfid());
        chTraincheckdetailService.update(chTraincheckdetail);

        chTraincheckdetailService.updateResult(chTraincheckdetail);
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("generator:chtraincheckinfo:delete")
    public R delete(@RequestBody Long[] fIds) {
        chTraincheckinfoService.deleteBatch(fIds);

        return R.ok();
    }


    /**
     * 判断是否有新的列车出入
     */
    @ResponseBody
    @RequestMapping(value = "/checkChange", method = RequestMethod.POST)
    public R checkChange(@RequestBody Map<String, Object> params) {
        params.put("startTime", DateUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss"));
        params.put("endTime", DateUtils.format(new Date(), "yyyy-MM-dd") + " 23:59:59");
        PageHelper.startPage(1, 5);
        //查询列表数据
        Query query = new Query(params);
        List<ChTraincheckinfoEntity> chTraincheckinfoList = chTraincheckinfoService.queryreporterrorlist(query);
        int total = chTraincheckinfoService.queryreporterrorlistTotal(query);
        PageUtils pageUtil = new PageUtils(chTraincheckinfoList, total, 5, query.getPage());
        return R.ok().put("page", pageUtil);
    }

}
