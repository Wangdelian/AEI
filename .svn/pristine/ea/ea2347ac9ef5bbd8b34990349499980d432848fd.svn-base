/*
package io.jeasyframework.controller.system;

import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.*;
import io.jeasyframework.service.*;
import io.jeasyframework.utils.DateUtils;
import io.jeasyframework.utils.R;
import io.jeasyframework.utils.annotation.SysLog;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sun.misc.BASE64Decoder;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.util.*;

*/
/**
 * java知识点
 * 1、反射：实体类名.class.getMethods等可获取对应方法
 * 根据自己的需要获取方法，getMethod('你的方法名'，方法需要什么参数tips:参数类型.class)
 * invoke(需要执行的实体实例，你的方法需要的参数)
 * <p>
 * 2、方法之间的值传递几乎都是传递地址，类似C，所以有时候在一处更改了数据，所有地方的数据都被更改了
 * 需要两个相同的对象而又不想要有关联，使用克隆
 *//*

@Component
@RestController
@RequestMapping("/mqs/ftt")
public class MqsFttReportController extends AbstractController {
    @Autowired
    private MqsProductlineService mqsProductlineService;
    @Autowired
    MqsFttReportService mqsFttReportService;
    @Autowired
    MqsIssueService mqsIssueService;
    @Autowired
    MqsKpitargetService mqsKpitargetService;
    @Autowired
    SiteConfig siteConfig;
    @Autowired
    MqsFttLogService mqsFttLogService;

    //默认执行时间
    private final int RUN_AT_HOUR = 8;
    //开始小时
    private final int HOUR = 8;
    //周截止时间
    private final int WEEK_LOCALTION = 6;
    //整线mesStationId，设置好，后整线数据将根据此列查询
    private final int[] zxMesStationIds = {29, 60, 128, 196, 0, -1};

    private final DecimalFormat NUMBERFORMAT = new DecimalFormat("######0.00");

    private final DecimalFormat NUMBERFORMATFOUR = new DecimalFormat("######0.0000");

    //
    String[] dayList;
    //
    HttpServletRequest request;
    //
    Map<String, Object> sessionConditions;

    @RequestMapping("fttHealthValue")
    public R fttHealthValue(@RequestBody Map<String, Object> condition, HttpServletRequest request) {
        //查询生产线表的名称
        MqsProductlineEntity mqsProductlineEntity = mqsProductlineService.queryProductlineByid(1L);
        //返回信息
        Map<String, Object> result = new HashMap<>();
        //结束时间
        String endTime = (String) condition.get("endTime");
        endTime = endTime.equals("") ? DateUtils.formatT(new Date()) : endTime;

        //整线mesStationId = [29,60,128,196,0,-1]
        Map<String, Object> stationCondition = new HashMap<>();

        //根据条件取得采集点信息，由于整线数据需要分采集点计算，所以每次都会查询所有采集点的各个阶段数据，即使选择了单个采集点信息
        List<MqsStationEntity> mqsStationEntityList = mqsIssueService.queryStation(stationCondition);
        //时间段，标题
        String[] dayList = colList(endTime);
        //表格数据
        List<FTTTableEntity> fttTable1 = new ArrayList<>();

        FTTTableEntity fTTTableEntity;
        boolean onceTimey1 = true;
        boolean onceTimey2 = true;
        boolean onceTimem = true;
        boolean onceTimew = true;
        boolean onceTimed = true;
        boolean onceTimeds = true;

        */
/**
         * 逻辑描述
         *
         * H一期整线FTT
         * H一期总装FTT
         * 部装FTT
         * 内装1 FTT
         * 内装2 FTT
         * 外装1 FTT
         * 外装2FTT
         * 磨合FTT
         * CAL FTT
         * H一期总装一次合格数
         * H一期总装样本值
         * 部装一次合格数
         * 部装样本值
         * 内装1 一次合格数
         * 内装1 样本值
         * 内装2 一次合格数
         * 内装2 样本值
         * 外装1 一次合格数
         * 外装1 样本值
         * 外装2 一次合格数
         * 外装2 样本值
         * 磨合一次合格数
         * 磨合样本值
         * CAL一次合格数
         * CAL样本值
         *
         * 由于循环前面部分只有一个ftt，而后面部分有两个相关值
         * 为了避免双重循环，引入j，j为0，对station循环第一遍，写ftt相关信息
         * 当i第一遍结束的时候，将i重置为-2；写样本值及合格数信息，同时j置为非0，不再循环重置i
         *//*

        for (int i = -2, j = 0; i < mqsStationEntityList.size(); i++) {
            fTTTableEntity = new FTTTableEntity();

            switch (i) {
                case -2: {
                    if (j == 0)
                        fTTTableEntity.setTitle(this.getCurSwitchSite().getSwitchsitename() + "整线FTT");
                    else
                        fTTTableEntity.setTitle(this.getCurSwitchSite().getSwitchsitename() + "总装一次合格数");

                    fttTable1.add(fTTTableEntity);
                    break;

                }
                case -1: {
                    if (j == 0)
                        fTTTableEntity.setTitle(this.getCurSwitchSite().getSwitchsitename() + "总装FTT");
                    else
                        fTTTableEntity.setTitle(this.getCurSwitchSite().getSwitchsitename() + "总装样本值");

                    fttTable1.add(fTTTableEntity);
                    break;
                }
                default: {
                    //station为空代表查询全部，不为空，只显示该条件的信息
                    if (j == 0) {
                        fTTTableEntity.setTitle(mqsStationEntityList.get(i).getStationname() + "FTT");
                        fttTable1.add(fTTTableEntity);
                    } else {
                        fTTTableEntity.setTitle(mqsStationEntityList.get(i).getStationname() + "一次合格数");
                        fttTable1.add(fTTTableEntity);
                        fTTTableEntity = new FTTTableEntity();
                        fTTTableEntity.setTitle(mqsStationEntityList.get(i).getStationname() + "样本值");
                        fttTable1.add(fTTTableEntity);
                    }
                }
            }

            if (j == 0 && i + 1 == mqsStationEntityList.size()) {
                j = 1;
                i = -3;
            }
        }

        //根据每个采集点的信息取数据
        List<String> mesStions = new ArrayList<>();//排除样本值重复问题
        for (int i = 0; i < mqsStationEntityList.size(); i++) {
            //首年
            String startTime = DateUtils.getTimeByDateAndHour(DateUtils.toDate(DateUtils.getStartTimeByYear(DateUtils.getYear(endTime))), HOUR);
            startTime = DateUtils.getBackYearTime(DateUtils.toDate(startTime), 1);//时间倒退一年再查询
            condition.put("datestart", DateUtils.toDate(startTime));
            condition.put("dateend", DateUtils.toDate(DateUtils.getBackYearTime(DateUtils.toDate(startTime), -1)));

            //设置该采集点的信息
            condition.put("station", mqsStationEntityList.get(i).getMesStationid());
            condition.put("stationChineseName", mqsStationEntityList.get(i).getStationname());

            Double fttTotal = mqsFttReportService.queryFttYearValue(condition);
            fttTotal = fttTotal == null ? 0 : fttTotal;
            Long sample = mqsFttReportService.queryFttYearSampleSum(condition);//样本值数
            sample = sample == null ? 0 : sample;//sql查询为空时不能使用基本数据类型long接收数据
            Long issue = mqsFttReportService.queryFttYearIssueSum(condition);//问题数
            issue = issue == null ? 0 : issue;//同sample

            */
/**
             * 整线ftt
             * ftt
             *
             *//*

            String zxFtt = fttTable1.get(0).getYear1();
            zxFtt = zxFtt == null ? "100" : zxFtt;

            if (i != mqsStationEntityList.size() - 1)
                fttTable1.get(0).setYear1(NUMBERFORMATFOUR.format(Double.parseDouble(zxFtt) * fttTotal / 100));
            else
                fttTable1.get(0).setYear1(NUMBERFORMAT.format(Double.parseDouble(zxFtt) * fttTotal / 100));

            */
/**
             * 总装ftt
             *
             * ftt,一次合格数,样本值
             *
             *//*

            String zzFtt;
            if (!mqsStationEntityList.get(i).getMesStationid().equals("-1")) {
                if (onceTimey1 && mqsStationEntityList.get(i).getMesStationid().equals("0")) {
                    Object station = condition.get("station");
                    Object stationChineseName = condition.get("stationChineseName");
                    sample = mqsFttReportService.queryFttYearSampleSum(condition);//样本值数
                    sample = sample == null ? 0 : sample;//sql查询为空时不能使用基本数据类型long接收数据

                    condition.put("isZX", true);
                    condition.put("zxMesStationIds", new int[]{29, 60, 128, 196, 0});
                    condition.put("station", null);
                    condition.put("stationChineseName", null);

                    Long issueZ = mqsFttReportService.queryFttYearIssueSum(condition);//问题数
                    issueZ = issueZ == null ? 0 : issueZ;//同sample

                    fttTable1.get(2 + mqsStationEntityList.size()).setYear1(String.valueOf(sample - issueZ));//H一期总装一次合格数
                    fttTable1.get(3 + mqsStationEntityList.size()).setYear1(String.valueOf(sample));//H一期总装样本值

                    onceTimey1 = false;
                    condition.put("station", station);
                    condition.put("stationChineseName", stationChineseName);
                    condition.put("isZX", false);
                }

                zzFtt = fttTable1.get(1).getYear1();
                zzFtt = zzFtt == null ? "100" : zzFtt;

                if (mesStions.size() < zxMesStationIds.length - 1)
                    fttTable1.get(1).setYear1(NUMBERFORMATFOUR.format(Double.parseDouble(zzFtt) * fttTotal / 100));
                else
                    fttTable1.get(1).setYear1(NUMBERFORMAT.format(Double.parseDouble(zzFtt) * fttTotal / 100));
            }

            fttTable1.get(i + 2).setYear1(NUMBERFORMAT.format(fttTotal));

            fttTable1.get(2 * i + 4 + mqsStationEntityList.size()).setYear1(String.valueOf(sample - issue));//一次合格数
            fttTable1.get(2 * i + 5 + mqsStationEntityList.size()).setYear1(String.valueOf(sample));//样本值


            //第二年
            startTime = DateUtils.getBackYearTime(DateUtils.toDate(startTime), -1);//今年
            condition.put("datestart", DateUtils.toDate(startTime));
            condition.put("dateend", DateUtils.toDate(DateUtils.getBackYearTime(DateUtils.toDate(startTime), -1)));

            fttTotal = mqsFttReportService.queryFttYearValue(condition);//该条件下的ftt
            fttTotal = fttTotal == null ? 0 : fttTotal;
            sample = mqsFttReportService.queryFttYearSampleSum(condition);
            sample = sample == null ? 0 : sample;
            issue = mqsFttReportService.queryFttYearIssueSum(condition);
            issue = issue == null ? 0 : issue;

            */
/**
             * 整线ftt
             * ftt
             *
             *//*

            zxFtt = fttTable1.get(0).getYear2();
            zxFtt = zxFtt == null ? "100" : zxFtt;

            if (i != mqsStationEntityList.size() - 1)
                fttTable1.get(0).setYear2(NUMBERFORMATFOUR.format(Double.parseDouble(zxFtt) * fttTotal / 100));
            else
                fttTable1.get(0).setYear2(NUMBERFORMAT.format(Double.parseDouble(zxFtt) * fttTotal / 100));

            */
/**
             * 总装ftt
             *
             * ftt,一次合格数,样本值
             *
             *//*

            if (!mqsStationEntityList.get(i).getMesStationid().equals("-1")) {
                if (onceTimey2 && mqsStationEntityList.get(i).getMesStationid().equals("0")) {
                    Object station = condition.get("station");
                    Object stationChineseName = condition.get("stationChineseName");
                    sample = mqsFttReportService.queryFttYearSampleSum(condition);//样本值数
                    sample = sample == null ? 0 : sample;//sql查询为空时不能使用基本数据类型long接收数据

                    condition.put("isZX", true);
                    condition.put("zxMesStationIds", new int[]{29, 60, 128, 196, 0});
                    condition.put("station", null);
                    condition.put("stationChineseName", null);

                    Long issueZ = mqsFttReportService.queryFttYearIssueSum(condition);//问题数
                    issueZ = issueZ == null ? 0 : issueZ;//同sample

                    fttTable1.get(2 + mqsStationEntityList.size()).setYear2(String.valueOf(sample - issueZ));//H一期总装一次合格数
                    fttTable1.get(3 + mqsStationEntityList.size()).setYear2(String.valueOf(sample));//H一期总装样本值

                    onceTimey2 = false;
                    condition.put("station", station);
                    condition.put("stationChineseName", stationChineseName);
                    condition.put("isZX", false);
                }

                zzFtt = fttTable1.get(1).getYear2();
                zzFtt = zzFtt == null ? "100" : zzFtt;

                if (mesStions.size() < zxMesStationIds.length - 1)
                    fttTable1.get(1).setYear2(NUMBERFORMATFOUR.format(Double.parseDouble(zzFtt) * fttTotal / 100));
                else
                    fttTable1.get(1).setYear2(NUMBERFORMAT.format(Double.parseDouble(zzFtt) * fttTotal / 100));
            }

            //为空时全部显示，不为空只显示该采集点的信息

            fttTable1.get(i + 2).setYear2(NUMBERFORMAT.format(fttTotal));

            fttTable1.get(2 * i + 4 + mqsStationEntityList.size()).setYear2(String.valueOf(sample - issue));//一次合格数
            fttTable1.get(2 * i + 5 + mqsStationEntityList.size()).setYear2(String.valueOf(sample));//样本值


            //月数据
            int year = DateUtils.getYear(endTime);//选择时间所在的年
            int month = DateUtils.getMonth(endTime);//月

            for (int j = 0; j < 3; j++) {
                */
/**
                 * getStartTimeByMonth系列方法在month为-1，或者13以上会自适应得出正确的时间
                 * 即我们并不用手动去判断月份等是否越界
                 * 2,3,4
                 *//*

                condition.put("datestart", DateUtils.toDate(DateUtils.getTimeByDateAndHour(DateUtils.toDate(DateUtils.getStartTimeByMonth(year, month - 2 + j)), HOUR)));
                condition.put("dateend", DateUtils.toDate(DateUtils.getTimeByDateAndHour(DateUtils.toDate(DateUtils.getStartTimeByMonth(year, month - 1 + j)), HOUR)));

                //利用反射将setMonth+I的方法联系起来
                try {
                    //i = 2获取setMonth1方法
                    Method method = FTTTableEntity.class.getDeclaredMethod("setMonth" + (j + 1), String.class);
                    Method methodGet = FTTTableEntity.class.getDeclaredMethod("getMonth" + (j + 1));

                    fttTotal = mqsFttReportService.queryFttMonthValue(condition);//该条件下的ftt和
                    fttTotal = fttTotal == null ? 0 : fttTotal;
                    sample = mqsFttReportService.queryFttMonthSampleSum(condition);//ftt样本数
                    sample = sample == null ? 0 : sample;//防止为空
                    issue = mqsFttReportService.queryFttMonthIssueSum(condition);//问题数
                    issue = issue == null ? 0 : issue;//同sample

                    */
/**
                     * 整线ftt
                     * ftt
                     *
                     *//*

                    zxFtt = (String) methodGet.invoke(fttTable1.get(0));
                    zxFtt = zxFtt == null ? "100" : zxFtt;

                    if (i != mqsStationEntityList.size() - 1)
                        method.invoke(fttTable1.get(0), (NUMBERFORMATFOUR.format(Double.parseDouble(zxFtt) * fttTotal / 100)));
                    else
                        method.invoke(fttTable1.get(0), (NUMBERFORMAT.format(Double.parseDouble(zxFtt) * fttTotal / 100)));

                    */
/**
                     * 总装ftt
                     *
                     * ftt,一次合格数,样本值
                     *
                     *//*

                    if (!mqsStationEntityList.get(i).getMesStationid().equals("-1")) {
                        if (mqsStationEntityList.get(i).getMesStationid().equals("0")) {
                            Object station = condition.get("station");
                            Object stationChineseName = condition.get("stationChineseName");
                            sample = mqsFttReportService.queryFttMonthSampleSum(condition);//样本值数
                            sample = sample == null ? 0 : sample;//sql查询为空时不能使用基本数据类型long接收数据

                            condition.put("isZX", true);
                            condition.put("zxMesStationIds", new int[]{29, 60, 128, 196, 0});
                            condition.put("station", null);
                            condition.put("stationChineseName", null);

                            Long issueZ = mqsFttReportService.queryFttMonthIssueSum(condition);//问题数
                            issueZ = issueZ == null ? 0 : issueZ;//同sample

                            method.invoke(fttTable1.get(2 + mqsStationEntityList.size()), String.valueOf(sample - issueZ));//H一期总装一次合格数
                            method.invoke(fttTable1.get(3 + mqsStationEntityList.size()), String.valueOf(sample));//H一期总装样本值

                            condition.put("station", station);
                            condition.put("stationChineseName", stationChineseName);
                            condition.put("isZX", false);
                        }

                        zzFtt = (String) methodGet.invoke(fttTable1.get(1));
                        zzFtt = zzFtt == null ? "100" : zzFtt;

                        if (mesStions.size() < zxMesStationIds.length - 1)
                            method.invoke(fttTable1.get(1), (NUMBERFORMATFOUR.format(Double.parseDouble(zzFtt) * fttTotal / 100)));
                        else
                            method.invoke(fttTable1.get(1), (NUMBERFORMAT.format(Double.parseDouble(zzFtt) * fttTotal / 100)));

                    }

                    //将对应月份的ftt传入第一行的对应位置，下同
                    //为空时全部显示，不为空只显示该采集点的信息

                    method.invoke(fttTable1.get(i + 2), NUMBERFORMAT.format(fttTotal));

                    method.invoke(fttTable1.get(2 * i + 4 + mqsStationEntityList.size()), String.valueOf(sample - issue));
                    method.invoke(fttTable1.get(2 * i + 5 + mqsStationEntityList.size()), String.valueOf(sample));
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                }
            }


            //周数据
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(DateUtils.toDate(endTime));
            int currrntWeekDay = calendar.get(Calendar.DAY_OF_WEEK);

            //第一周的周五
            endTime = DateUtils.getTimeByDateAndHour(
                    DateUtils.toDate(DateUtils.getBackDayTime(calendar.getTime(), currrntWeekDay < WEEK_LOCALTION ? 7 - WEEK_LOCALTION + currrntWeekDay : currrntWeekDay - WEEK_LOCALTION)), HOUR);
            endTime = DateUtils.getBackWeekTime(DateUtils.toDate(endTime), 5);
            for (int j = 0; j < 6; j++) {
                condition.put("datestart", DateUtils.toDate(DateUtils.getBackDayTime(DateUtils.toDate(endTime), 7)));
                condition.put("dateend", DateUtils.toDate(endTime));

                //利用反射将setWeek+I的方法联系起来
                try {
                    //i = 2获取setWeek1方法
                    Method method = FTTTableEntity.class.getDeclaredMethod("setWeek" + (j + 1), String.class);
                    Method methodGet = FTTTableEntity.class.getDeclaredMethod("getWeek" + (j + 1));

                    fttTotal = mqsFttReportService.queryFttWeekValue(condition);//该条件下的ftt和
                    fttTotal = fttTotal == null ? 0 : fttTotal;
                    sample = mqsFttReportService.queryFttWeekSampleSum(condition);
                    sample = sample == null ? 0 : sample;//防止为空
                    issue = mqsFttReportService.queryFttWeekIssueSum(condition);
                    issue = issue == null ? 0 : issue;//同sample

                    */
/**
                     * 整线ftt
                     * ftt
                     *
                     *//*

                    zxFtt = (String) methodGet.invoke(fttTable1.get(0));
                    zxFtt = zxFtt == null ? "100" : zxFtt;

                    if (i != mqsStationEntityList.size() - 1)
                        method.invoke(fttTable1.get(0), (NUMBERFORMATFOUR.format(Double.parseDouble(zxFtt) * (fttTotal) / 100)));
                    else
                        method.invoke(fttTable1.get(0), (NUMBERFORMAT.format(Double.parseDouble(zxFtt) * (fttTotal) / 100)));


                    */
/**
                     * 总装ftt
                     *
                     * ftt,一次合格数,样本值
                     *
                     *//*

                    if (!mqsStationEntityList.get(i).getMesStationid().equals("-1")) {
                        if (mqsStationEntityList.get(i).getMesStationid().equals("0")) {
                            Object station = condition.get("station");
                            Object stationChineseName = condition.get("stationChineseName");
                            sample = mqsFttReportService.queryFttWeekSampleSum(condition);//样本值数
                            sample = sample == null ? 0 : sample;//sql查询为空时不能使用基本数据类型long接收数据

                            condition.put("isZX", true);
                            condition.put("zxMesStationIds", new int[]{29, 60, 128, 196, 0});
                            condition.put("station", null);
                            condition.put("stationChineseName", null);

                            Long issueZ = mqsFttReportService.queryFttWeekIssueSum(condition);//问题数
                            issueZ = issueZ == null ? 0 : issueZ;//同sample

                            method.invoke(fttTable1.get(2 + mqsStationEntityList.size()), String.valueOf(sample - issueZ));//H一期总装一次合格数
                            method.invoke(fttTable1.get(3 + mqsStationEntityList.size()), String.valueOf(sample));//H一期总装样本值

                            onceTimew = false;
                            condition.put("station", station);
                            condition.put("stationChineseName", stationChineseName);
                            condition.put("isZX", false);
                        }

                        zzFtt = (String) methodGet.invoke(fttTable1.get(1));
                        zzFtt = zzFtt == null ? "100" : zzFtt;

                        if (mesStions.size() < zxMesStationIds.length - 1)
                            method.invoke(fttTable1.get(1), (NUMBERFORMATFOUR.format(Double.parseDouble(zzFtt) * (fttTotal) / 100)));
                        else
                            method.invoke(fttTable1.get(1), (NUMBERFORMAT.format(Double.parseDouble(zzFtt) * (fttTotal) / 100)));
                    }

                    //将对应月份的ftt传入第一行的对应位置，下同
                    //为空时全部显示，不为空只显示该采集点的信息
                    method.invoke(fttTable1.get(i + 2), NUMBERFORMAT.format(fttTotal));

                    method.invoke(fttTable1.get(2 * i + 4 + mqsStationEntityList.size()), String.valueOf(sample - issue));
                    method.invoke(fttTable1.get(2 * i + 5 + mqsStationEntityList.size()), String.valueOf(sample));
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                }
                endTime = DateUtils.getBackDayTime(DateUtils.toDate(endTime), -7);
            }


            //日数据
            Long sampleSum = 0l;//20天加上采集点样本值总和
            Long issueSum = 0l;//20天加上采集点问题
            Long sampleStationSum = 0l;//20天加上采集点样本值总和
            Long issueStationSum = 0l;//20天加上采集点问题
            endTime = (String) condition.get("endTime");
            endTime = endTime.equals("") ? DateUtils.formatT(new Date()) : endTime;
            endTime = DateUtils.getBackDayTime(DateUtils.toDate(endTime), 19);
            endTime = DateUtils.getTimeByDateAndHour(DateUtils.toDate(endTime), 8);

            for (int j = 0; j < 20; j++) {
                condition.put("datecreated", DateUtils.toDate(endTime));
                condition.put("datestart", DateUtils.toDate(endTime));
                condition.put("dateend", DateUtils.toDate(DateUtils.getBackDayTime(DateUtils.toDate(endTime), -1)));


                //利用反射将setDay+I的方法联系起来
                try {
                    //i = 2获取setDay1方法
                    Method method = FTTTableEntity.class.getDeclaredMethod("setDay" + (j + 1), String.class);
                    Method methodGet = FTTTableEntity.class.getDeclaredMethod("getDay" + (j + 1));

                    fttTotal = mqsFttReportService.queryFttDayValue(condition);
                    fttTotal = fttTotal == null ? 0 : fttTotal;
                    sample = mqsFttReportService.queryFttDaySampleSum(condition);
                    sample = sample == null ? 0 : sample;//防止为空
                    issue = mqsFttReportService.queryFttDayIssueSum(condition);
                    issue = issue == null ? 0 : issue;//同sample

                    sampleSum += sample;
                    issueSum += issue;

                    */
/**
                     * 整线ftt
                     * ftt
                     *
                     *//*

                    zxFtt = (String) methodGet.invoke(fttTable1.get(0));
                    zxFtt = zxFtt == null ? "100" : zxFtt;

                    if (i != mqsStationEntityList.size() - 1)
                        method.invoke(fttTable1.get(0), (NUMBERFORMATFOUR.format(Double.parseDouble(zxFtt) * fttTotal / 100)));
                    else
                        method.invoke(fttTable1.get(0), (NUMBERFORMAT.format(Double.parseDouble(zxFtt) * fttTotal / 100)));

                    */
/**
                     * 总装ftt
                     *
                     * ftt,一次合格数,样本值
                     *
                     *//*

                    if (!mqsStationEntityList.get(i).getMesStationid().equals("-1")) {
                        if (mqsStationEntityList.get(i).getMesStationid().equals("0")) {
                            Object station = condition.get("station");
                            Object stationChineseName = condition.get("stationChineseName");
                            sample = mqsFttReportService.queryFttDaySampleSum(condition);//样本值数
                            sample = sample == null ? 0 : sample;//sql查询为空时不能使用基本数据类型long接收数据

                            condition.put("isZX", true);
                            condition.put("zxMesStationIds", new int[]{29, 60, 128, 196, 0});
                            condition.put("station", null);
                            condition.put("stationChineseName", null);

                            Long issueZ = mqsFttReportService.queryFttDayIssueSum(condition);//问题数
                            issueZ = issueZ == null ? 0 : issueZ;//同sample

                            method.invoke(fttTable1.get(2 + mqsStationEntityList.size()), String.valueOf(sample - issueZ));//H一期总装一次合格数
                            method.invoke(fttTable1.get(3 + mqsStationEntityList.size()), String.valueOf(sample));//H一期总装样本值

                            onceTimed = false;
                            condition.put("station", station);
                            condition.put("stationChineseName", stationChineseName);
                            condition.put("isZX", false);
                        }

                        zzFtt = (String) methodGet.invoke(fttTable1.get(1));
                        zzFtt = zzFtt == null ? "100" : zzFtt;

                        if (mesStions.size() < zxMesStationIds.length - 1)
                            method.invoke(fttTable1.get(1), (NUMBERFORMATFOUR.format(Double.parseDouble(zzFtt) * fttTotal / 100)));
                        else
                            method.invoke(fttTable1.get(1), (NUMBERFORMAT.format(Double.parseDouble(zzFtt) * fttTotal / 100)));

                    }

                    //将对应的ftt传入第一行的对应位置，下同
                    //为空时全部显示，不为空只显示该采集点的信息
                    method.invoke(fttTable1.get(i + 2), NUMBERFORMAT.format(fttTotal));

                    method.invoke(fttTable1.get(2 * i + 4 + mqsStationEntityList.size()), String.valueOf(sample - issue));
                    method.invoke(fttTable1.get(2 * i + 5 + mqsStationEntityList.size()), String.valueOf(sample));
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                }

                sampleStationSum += sample;
                issueStationSum += issue;
                endTime = DateUtils.getBackDayTime(DateUtils.toDate(endTime), -1);
            }

            //利用反射将setDays的方法联系起来
            try {
                Method method = FTTTableEntity.class.getDeclaredMethod("setDays", String.class);
                Method methodGet = FTTTableEntity.class.getDeclaredMethod("getDays");

                condition.put("datecreated", null);
                condition.put("datestart", DateUtils.toDate(DateUtils.getBackDayTime(DateUtils.toDate(endTime), 20)));
                condition.put("dateend", DateUtils.toDate(endTime));

                sample = mqsFttReportService.queryFttDaySampleSum(condition);
                sample = sample == null ? 0 : sample;//防止为空
                issue = mqsFttReportService.queryFttDayIssueSum(condition);
                issue = issue == null ? 0 : issue;//同sample

                //将对应月份的ftt传入第一行的对应位置，下同
                //为空时全部显示，不为空只显示该采集点的信息
                double currentStationDaysFtt = sampleStationSum == 0 ? 0 : ((double) sampleStationSum - (double) issueStationSum) * 100 / (double) sampleStationSum;

                method.invoke(fttTable1.get(i + 2), NUMBERFORMAT.format(currentStationDaysFtt));

                method.invoke(fttTable1.get(2 * i + 4 + mqsStationEntityList.size()), String.valueOf(sampleStationSum - issueStationSum));
                method.invoke(fttTable1.get(2 * i + 5 + mqsStationEntityList.size()), String.valueOf(sampleStationSum));


                */
/**
                 * 整线ftt
                 * ftt
                 *
                 *//*

                zxFtt = (String) methodGet.invoke(fttTable1.get(0));
                zxFtt = zxFtt == null ? "1" : zxFtt;

                if (i != mqsStationEntityList.size() - 1)
                    method.invoke(fttTable1.get(0), (NUMBERFORMATFOUR.format(Double.parseDouble(zxFtt) * currentStationDaysFtt / 100)));
                else
                    method.invoke(fttTable1.get(0), (NUMBERFORMAT.format(Double.parseDouble(zxFtt) * currentStationDaysFtt)));


                */
/**
                 * 总装ftt
                 *
                 *//*

                if (!mqsStationEntityList.get(i).getMesStationid().equals("-1")) {
                    if (mqsStationEntityList.get(i).getMesStationid().equals("0")) {
                        Object station = condition.get("station");
                        Object stationChineseName = condition.get("stationChineseName");
                        sample = mqsFttReportService.queryFttDaySampleSum(condition);//样本值数
                        sample = sample == null ? 0 : sample;//sql查询为空时不能使用基本数据类型long接收数据

                        condition.put("isZX", true);
                        condition.put("zxMesStationIds", new int[]{29, 60, 128, 196, 0});
                        condition.put("station", null);
                        condition.put("stationChineseName", null);

                        Long issueZ = mqsFttReportService.queryFttDayIssueSum(condition);//问题数
                        issueZ = issueZ == null ? 0 : issueZ;//同sample

                        method.invoke(fttTable1.get(2 + mqsStationEntityList.size()), String.valueOf(sample - issueZ));//H一期总装一次合格数
                        method.invoke(fttTable1.get(3 + mqsStationEntityList.size()), String.valueOf(sample));//H一期总装样本值

                        condition.put("station", station);
                        condition.put("stationChineseName", stationChineseName);
                        condition.put("isZX", false);
                    }

                    zzFtt = (String) methodGet.invoke(fttTable1.get(1));
                    zzFtt = zzFtt == null ? "100" : zzFtt;

                    if (mesStions.size() < zxMesStationIds.length - 1)
                        method.invoke(fttTable1.get(1), (NUMBERFORMATFOUR.format(sample == 0 ? 0 : Double.parseDouble(zzFtt) * currentStationDaysFtt / 100)));
                    else
                        method.invoke(fttTable1.get(1), (NUMBERFORMAT.format(sample == 0 ? 0 : Double.parseDouble(zzFtt) * currentStationDaysFtt / 100)));

                }


                //查询20天的数据
                endTime = (String) condition.get("endTime");
                endTime = endTime.equals("") ? DateUtils.formatT(new Date()) : endTime;
                condition.put("datestart", DateUtils.toDate(DateUtils.getBackDayTime(DateUtils.toDate(endTime), 20)));
                condition.put("dateend", DateUtils.toDate(endTime));
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();

            }
            mesStions.add(mqsStationEntityList.get(i).getMesStationid());
        }

        result.put("dayList", dayList);
        result.put("fttTable1", fttTable1);

        HttpSession session = request.getSession();
        session.setAttribute("fttHealth", result);

        return R.ok(result);
    }

    @RequestMapping("fttValue")
    public R getFttValue(@RequestBody Map<String, Object> condition, HttpServletRequest req) {
        request = req;
        //查询生产线表的名称
        //MqsProductlineEntity mqsProductlineEntity = mqsProductlineService.queryProductlineByid(1L);
        String endTime = (String) condition.get("endTime");
        endTime = endTime.equals("") ? DateUtils.formatT(new Date()) : endTime;

        //选择的采集点mesStationId
        String station = (String) condition.get("station");//为空时ftt需要查询整线数据进行计算
        Boolean isZX = station == null || "".equals(station);//判断是否是整线数据
        condition.put("isZX", isZX);
        //选择的采集点名字
        String stationChineseName = (String) condition.get("stationChineseName");
        if (isZX) {
            condition.put("station", "0");
            station = "0";
            //stationChineseName = mqsProductlineEntity.getProductionlinename() + "磨合采集点";
        }

        //计算整线数据时需要使用
        //整线mesStationId = [29,60,128,196,0,-1]
        Map<String, Object> stationCondition = new HashMap<>();
        stationCondition.put("zxMesStationIds", zxMesStationIds);
        List<MqsStationEntity> mqsStationEntityList = mqsIssueService.queryStation(stationCondition);

        Map<String, Object> result = new HashMap<>();

        //echart中x轴时间，表格中的时间标题
        dayList = colList(endTime);
        //f
        List fttYear = new ArrayList();
        //平均
        List fttAv = new ArrayList();
        //表格数据
        List<FTTTableEntity> fttTable1 = new ArrayList<>();

        //查询
        for (int i = 0; i < 32; i++) {
            Double kpi;
            if (i < 2) {//年
                kpi = mqsKpitargetService.queryValue(dayList[i], "M13", "FTT");
            } else if (i < 5) {//月
                //当前两个有一个为11月，或者12月，代表跨年了，所以取年份为dayList[1]
                if (i != 4 && (dayList[i].equals("11月") || dayList[i].equals("12月")))
                    kpi = mqsKpitargetService.queryValue(dayList[0], "M" + dayList[i].split("月")[0], "FTT");
                else//没跨年
                    kpi = mqsKpitargetService.queryValue(dayList[1], "M" + dayList[i].split("月")[0], "FTT");
            } else if (i < 11) {//周
                int monthi = Integer.parseInt(dayList[i].split("/")[0]);//当前位置的month值
                int month10 = Integer.parseInt(dayList[10].split("/")[0]);//最后一周的month值
                if (monthi > month10)//当前位置大于最后一个month值时，代表当前周属于前一年
                    kpi = mqsKpitargetService.queryValue(dayList[0], "M" + monthi, "FTT");
                else//属于现在年份的值
                    kpi = mqsKpitargetService.queryValue(dayList[1], "M" + monthi, "FTT");
            } else if (i > 11) {//周
                int monthi = Integer.parseInt(dayList[i].split("/")[0]);//当前位置的month值
                int month10 = Integer.parseInt(dayList[31].split("/")[0]);//最后一天的month值
                if (monthi > month10)//当前位置大于最后一个month值时，代表当前天属于前一年
                    kpi = mqsKpitargetService.queryValue(dayList[0], "M" + monthi, "FTT");
                else//属于现在年份的值
                    kpi = mqsKpitargetService.queryValue(dayList[1], "M" + monthi, "FTT");
            } else {//20天总汇，取最后一月的值
                kpi = mqsKpitargetService.queryValue(dayList[1], "M" + dayList[31].split("/")[0], "FTT");
            }

            fttAv.add(kpi == null ? 0 : kpi);
        }

        //写表格数据
        for (int i = 0; i < 3; i++) {
            FTTTableEntity FTTTableEntity = new FTTTableEntity();
            switch (i) {
                case 0: {
                    FTTTableEntity.setTitle("FTT%");
                    break;
                }
                case 1: {
                    FTTTableEntity.setTitle("一次合格数");
                    break;
                }
                default: {
                    FTTTableEntity.setTitle("样本值");
                }
            }
            fttTable1.add(FTTTableEntity);
        }

        result.put("dayList", dayList);
        result.put("fttYear", fttYear);
        result.put("fttTable1", fttTable1);//务必在查询年，月，日，周数据之间添加ftt表信息进去，否者会导致result里没有相关信息

        //ftt
        Double fttTotal = 0.0;
        Double zxFttTotal = 100.0;
        Long sample;
        Long issue;
        //年ftt
        //样本数
        //问题数
        String startTime = DateUtils.getTimeByDateAndHour(DateUtils.toDate(DateUtils.getStartTimeByYear(DateUtils.getYear(endTime))), HOUR);
        startTime = DateUtils.getBackYearTime(DateUtils.toDate(startTime), 1);//时间倒退一年再查询
        condition.put("datestart", DateUtils.toDate(startTime));
        condition.put("dateend", DateUtils.toDate(DateUtils.getBackYearTime(DateUtils.toDate(startTime), -1)));

        //updateDate:2018-7-9 11:29:08
        HttpSession session = request.getSession();
        sessionConditions = new HashMap<>();
        sessionConditions.put("datestart", condition.get("datestart"));
        sessionConditions.put("dateend", condition.get("dateend"));
        session.setAttribute(dayList[0], sessionConditions);

        for (MqsStationEntity mqsStationEntity : mqsStationEntityList) {
            //如果生产线为空，代表查整线数据，需要将station采集点数据全部进行查处汇总，不为空，就按照condition查询，同时执行一边循环即跳出
            if (!isZX) {
                fttTotal = mqsFttReportService.queryFttYearValue(condition);
                fttTotal = fttTotal == null ? 0.0 : fttTotal;
                break;
            } else {
                condition.put("station", mqsStationEntity.getMesStationid());
                condition.put("stationChineseName", mqsStationEntity.getStationname());
                fttTotal = mqsFttReportService.queryFttYearValue(condition);
                fttTotal = fttTotal == null ? 0.0 : fttTotal;

                zxFttTotal = zxFttTotal * fttTotal / 100;
            }
        }

        //查询样本值和问题数将采集点置为正常，整线置为0
        condition.put("station", station);
        //上面用到了stationChineseName，将该信息重置为前端选择的数据
        if (!isZX) {
            condition.put("stationChineseName", stationChineseName);
        } else {
            condition.put("stationChineseName", null);
        }

        sample = mqsFttReportService.queryFttYearSampleSum(condition);//样本值数
        sample = sample == null ? 0 : ("0".equals(station) || "128".equals(station)) && isZX ? sample / 2 : sample;//sql查询为空时不能使用基本数据类型long接收数据

        if (isZX) {
            //整线的问题数需要查询全部不包括CL，而样本数又不需要
            condition.put("zxMesStationIds", new int[]{29, 60, 128, 196, 0});
            //将其他station信息去掉
            condition.put("station", null);
            condition.put("stationChineseName", null);
        }
        issue = mqsFttReportService.queryFttYearIssueSum(condition);//问题数
        issue = issue == null ? 0 : issue;//同sample

        //生产单位不为空，设置正常数值，为空，设置整线数据
        if (!isZX) {
            fttTable1.get(0).setYear1(NUMBERFORMAT.format(fttTotal));
            fttYear.add(NUMBERFORMAT.format(fttTotal));//前年
        } else {
            fttTable1.get(0).setYear1(NUMBERFORMAT.format(zxFttTotal));
            fttYear.add(NUMBERFORMAT.format(zxFttTotal));//前年
        }

        fttTable1.get(1).setYear1(String.valueOf(sample - issue));
        fttTable1.get(2).setYear1(String.valueOf(sample));

        startTime = DateUtils.getBackYearTime(DateUtils.toDate(startTime), -1);//今年
        condition.put("datestart", DateUtils.toDate(startTime));
        condition.put("dateend", DateUtils.toDate(DateUtils.getBackYearTime(DateUtils.toDate(startTime), -1)));

        sessionConditions = new HashMap<>();
        sessionConditions.put("datestart", condition.get("datestart"));
        sessionConditions.put("dateend", condition.get("dateend"));
        session.setAttribute(dayList[1], sessionConditions);

        zxFttTotal = 100.0;
        for (MqsStationEntity mqsStationEntity : mqsStationEntityList) {
            //如果生产线为空，代表查整线数据，需要将station采集点数据全部进行查处汇总，不为空，就按照condition查询，同时执行一边循环即跳出
            if (!isZX) {
                fttTotal = mqsFttReportService.queryFttYearValue(condition);
                fttTotal = fttTotal == null ? 0.0 : fttTotal;
                break;
            } else {
                condition.put("station", mqsStationEntity.getMesStationid());
                condition.put("stationChineseName", mqsStationEntity.getStationname());
                fttTotal = mqsFttReportService.queryFttYearValue(condition);
                fttTotal = fttTotal == null ? 0.0 : fttTotal;

                zxFttTotal = zxFttTotal * fttTotal / 100;
            }
        }

        //查询样本值和问题数将采集点置为正常，整线置为0
        condition.put("station", station);
        //上面用到了stationChineseName，将该信息重置为前端选择的数据
        if (!isZX) {
            condition.put("stationChineseName", stationChineseName);
        } else {
            condition.put("stationChineseName", null);
        }

        sample = mqsFttReportService.queryFttYearSampleSum(condition);//样本值数
        sample = sample == null ? 0 : ("0".equals(station) || "128".equals(station)) && isZX ? sample / 2 : sample;//sql查询为空时不能使用基本数据类型long接收数据

        if (isZX) {
            //整线的问题数需要查询全部，而样本数又不需要
            condition.put("zxMesStationIds", new int[]{29, 60, 128, 196, 0});
            //将其他station信息去掉
            condition.put("station", null);
            condition.put("stationChineseName", null);
        }

        issue = mqsFttReportService.queryFttYearIssueSum(condition);//问题数
        issue = issue == null ? 0 : issue;//同sample

        //生产单位不为空，设置正常数值，为空，设置整线数据
        if (!isZX) {
            fttTable1.get(0).setYear2(NUMBERFORMAT.format(fttTotal));
            fttYear.add(NUMBERFORMAT.format(fttTotal));//前年
        } else {
            fttTable1.get(0).setYear2(NUMBERFORMAT.format(zxFttTotal));
            fttYear.add(NUMBERFORMAT.format(zxFttTotal));//前年
        }

        fttTable1.get(1).setYear2(String.valueOf(sample - issue));
        fttTable1.get(2).setYear2(String.valueOf(sample));

        result.put("fttAv", fttAv);

        condition.put("isData", null);
        condition.put("station", station);
        condition.put("stationChineseName", stationChineseName);

        result = fttMonthData(condition, result);
        result = fttWeekData(condition, result);
        result = fttDayData(condition, result);

        session.setAttribute("fttValue", result);

        return R.ok(result);
    }

    */
/**
     * S类问题数，前五
     * topNum = 5
     *
     * @param condition
     * @return
     *//*

    @RequestMapping("SValue")
    public R getSValue(@RequestBody Map<String, Object> condition, HttpServletRequest request) {
        //返回结果集
        Map<String, Object> result = new HashMap<>();
        //S表数据集
        List<FTTTableEntity> fttTableS = new ArrayList<>();
        //提前将结果集放入result，在进行分段时间查询时直接写入结果
        result.put("fttTableS", fttTableS);

        //设置Title
        result = this.setRolTitle(condition, result, "S类");

        result = this.getTableValue(condition, result, "S类");

        HttpSession session = request.getSession();
        session.setAttribute("SValue", result.get("fttTableS"));

        return R.ok(result);
    }

    */
/**
     * A类问题数，前五
     * topNum = 5
     *
     * @param condition
     * @return
     *//*

    @RequestMapping("AValue")
    public R getAValue(@RequestBody Map<String, Object> condition, HttpServletRequest request) {
        //返回结果集
        Map<String, Object> result = new HashMap<>();
        //A表数据集
        List<FTTTableEntity> fttTable = new ArrayList<>();
        //提前将结果集放入result，在进行分段时间查询时直接写入结果
        result.put("fttTableA", fttTable);

        result = this.setRolTitle(condition, result, "A类");
        result = this.getTableValue(condition, result, "A类");

        HttpSession session = request.getSession();
        session.setAttribute("AValue", result.get("fttTableA"));

        return R.ok(result);
    }

    */
/**
     * B类问题数，前五
     * topNum = 5
     *
     * @param condition
     * @return
     *//*

    @RequestMapping("BValue")
    public R getBValue(@RequestBody Map<String, Object> condition, HttpServletRequest request) {
        //返回结果集
        Map<String, Object> result = new HashMap<>();
        //A表数据集
        List<FTTTableEntity> fttTable = new ArrayList<>();
        //提前将结果集放入result，在进行分段时间查询时直接写入结果
        result.put("fttTableB", fttTable);

        result = this.setRolTitle(condition, result, "B类");
        result = this.getTableValue(condition, result, "B类");

        HttpSession session = request.getSession();
        session.setAttribute("BValue", result.get("fttTableB"));

        return R.ok(result);
    }

    */
/**
     * C类问题数，前五
     * topNum = 5
     *
     * @param condition
     * @return
     *//*

    @RequestMapping("CValue")
    public R getCValue(@RequestBody Map<String, Object> condition, HttpServletRequest request) {
        //返回结果集
        Map<String, Object> result = new HashMap<>();
        //C表数据集
        List<FTTTableEntity> fttTable = new ArrayList<>();
        //提前将结果集放入result，在进行分段时间查询时直接写入结果
        result.put("fttTableC", fttTable);

        result = this.setRolTitle(condition, result, "C类");
        result = this.getTableValue(condition, result, "C类");

        HttpSession session = request.getSession();
        session.setAttribute("CValue", result.get("fttTableC"));

        return R.ok(result);
    }

    */
/**
     * 最近一天的问题数，前十
     * topNum = 10
     *
     * @param condition
     * @return
     *//*

    @RequestMapping("recentDayValue")
    public R getRecentDayValue(@RequestBody Map<String, Object> condition, HttpServletRequest request) {
        //返回结果集
        Map<String, Object> result = new HashMap<>();
        //A表数据集
        List<FTTTableEntity> fttTable = new ArrayList<>();
        //提前将结果集放入result，在进行分段时间查询时直接写入结果
        result.put("fttTableOneDay", fttTable);

        result = this.setNearTitle(condition, result, "TOP10 ICCs-最近一天");
        result = this.getTableValue(condition, result, "day");

        HttpSession session = request.getSession();
        session.setAttribute("dayValue", result.get("fttTableOneDay"));

        return R.ok(result);
    }

    */
/**
     * 最近一月的问题数，前十
     * topNum = 10
     *
     * @param condition
     * @return
     *//*

    @RequestMapping("recentMonthValue")
    public R getRecentMonthValue(@RequestBody Map<String, Object> condition, HttpServletRequest request) {
        //返回结果集
        Map<String, Object> result = new HashMap<>();
        //A表数据集
        List<FTTTableEntity> fttTable = new ArrayList<>();
        //提前将结果集放入result，在进行分段时间查询时直接写入结果
        result.put("fttTableOneMonth", fttTable);

        result = this.setNearTitle(condition, result, "TOP10 ICCs-最近一月");
        result = this.getTableValue(condition, result, "month");

        HttpSession session = request.getSession();
        session.setAttribute("monthValue", result.get("fttTableOneMonth"));

        return R.ok(result);
    }

    */
/**
     * 最近一年的问题数，前十
     * topNum = 10
     *
     * @param condition
     * @return
     *//*

    @RequestMapping("recentYearValue")
    public R getRecentYearValue(@RequestBody Map<String, Object> condition, HttpServletRequest request) {
        //返回结果集
        Map<String, Object> result = new HashMap<>();
        //A表数据集
        List<FTTTableEntity> fttTable = new ArrayList<>();
        //提前将结果集放入result，在进行分段时间查询时直接写入结果
        result.put("fttTableOneYear", fttTable);

        result = this.setNearTitle(condition, result, "TOP10 ICCs-最近一年");
        result = this.getTableValue(condition, result, "year");

        HttpSession session = request.getSession();
        session.setAttribute("yearValue", result.get("fttTableOneYear"));

        return R.ok(result);
    }

    public Map<String, Object> getTableValue
            (Map<String, Object> condition, Map<String, Object> result, String skname) {
        //结束时间，作用域范围内不允许修改
        String endTime = (String) condition.get("endTime");
        endTime = endTime.equals("") ? DateUtils.formatT(new Date()) : endTime;

        //设置第一年，将时间计算完成后再调用
        String startTime = DateUtils.getTimeByDateAndHour(DateUtils.toDate(DateUtils.getStartTimeByYear(DateUtils.getYear(endTime))), HOUR);
        startTime = DateUtils.getBackYearTime(DateUtils.toDate(startTime), 1);//时间倒退一年再查询
        condition.put("datestart", DateUtils.toDate(startTime));
        condition.put("dateend", DateUtils.toDate(DateUtils.getBackYearTime(DateUtils.toDate(startTime), -1)));
        //第一年
        result = this.setYear(condition, result, skname, 1);

        startTime = DateUtils.getBackYearTime(DateUtils.toDate(startTime), -1);//今年
        condition.put("datestart", DateUtils.toDate(startTime));
        condition.put("dateend", DateUtils.toDate(DateUtils.getBackYearTime(DateUtils.toDate(startTime), -1)));
        //第二年
        result = this.setYear(condition, result, skname, 2);

        //月
        int year = DateUtils.getYear(endTime);//选择时间所在的年
        int month = DateUtils.getMonth(endTime);//月
        for (int i = 2; i < 5; i++) {
            */
/**
             * getStartTimeByMonth系列方法在month为-1，或者13以上会自适应得出正确的时间
             * 即我们并不用手动去判断月份等是否越界
             *//*

            condition.put("datestart", DateUtils.toDate(DateUtils.getTimeByDateAndHour(DateUtils.toDate(DateUtils.getStartTimeByMonth(year, month - 4 + i)), HOUR)));
            condition.put("dateend", DateUtils.toDate(DateUtils.getTimeByDateAndHour(DateUtils.toDate(DateUtils.getStartTimeByMonth(year, month - 3 + i)), HOUR)));

            //利用反射将setMonth+I的方法联系起来
            try {
                //i = 2获取setMonth1方法
                Method method = FTTTableEntity.class.getDeclaredMethod("setMonth" + (i - 1), String.class);
                this.setOther(condition, result, skname, i, "Month", method);
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            }
        }

        //周
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(DateUtils.toDate(endTime));
        int currrntWeekDay = calendar.get(Calendar.DAY_OF_WEEK);

        //第一周的周五
        String endTimeForWeek = DateUtils.getTimeByDateAndHour(
                DateUtils.toDate(DateUtils.getBackDayTime(calendar.getTime(), currrntWeekDay < WEEK_LOCALTION ? 7 - WEEK_LOCALTION + currrntWeekDay : currrntWeekDay - WEEK_LOCALTION)), HOUR);
        //
        endTimeForWeek = DateUtils.getBackWeekTime(DateUtils.toDate(endTimeForWeek), 5);

        for (int i = 5; i < 11; i++) {
            condition.put("datestart", DateUtils.toDate(DateUtils.getBackDayTime(DateUtils.toDate(endTimeForWeek), 7)));
            condition.put("dateend", DateUtils.toDate(endTimeForWeek));

            //利用反射将setWeek+I的方法联系起来
            try {
                //i = 2获取setWeek1方法
                Method method = FTTTableEntity.class.getDeclaredMethod("setWeek" + (i - 4), String.class);

                //SABC问题数
                this.setOther(condition, result, skname, i, "Week", method);
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            }

            endTimeForWeek = DateUtils.getBackDayTime(DateUtils.toDate(endTimeForWeek), -7);
        }

        //日
        String endTimeForDay = DateUtils.getBackDayTime(DateUtils.toDate(endTime), 18);
        endTimeForDay = DateUtils.getTimeByDateAndHour(DateUtils.toDate(endTimeForDay), 8);
        for (int i = 12; i < 32; i++) {
            condition.put("datecreated", DateUtils.toDate(endTimeForDay));
            condition.put("datestart", DateUtils.toDate(DateUtils.getBackDayTime(DateUtils.toDate(endTimeForDay), 1)));
            condition.put("dateend", DateUtils.toDate(endTimeForDay));

            //利用反射将setDay+I的方法联系起来
            try {
                //i = 2获取setDay1方法
                Method method = FTTTableEntity.class.getDeclaredMethod("setDay" + (i - 11), String.class);
                //问题数
                this.setOther(condition, result, skname, i, "Day", method);
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            }

            endTimeForDay = DateUtils.getBackDayTime(DateUtils.toDate(endTimeForDay), -1);
        }

        //20日
        String startTimeFor20Day = DateUtils.getBackDayTime(DateUtils.toDate(endTime), 19);
        startTimeFor20Day = DateUtils.getTimeByDateAndHour(DateUtils.toDate(startTimeFor20Day), 8);

        condition.put("datestart", DateUtils.toDate(startTimeFor20Day));//20天开始时间
        condition.put("dateend", DateUtils.toDate(DateUtils.getTimeByDateAndHour(DateUtils.toDate(DateUtils.getBackDayTime(DateUtils.toDate(endTime), -1)), 8)));

        int dataCount = 5;
        List<FTTTableEntity> fttTable;
        condition.put("skname", null);//默认不按分类查询

        switch (skname) {
            case "S类": {
                condition.put("skname", skname);//添加分类查询
                fttTable = (List<FTTTableEntity>) result.get("fttTableS");
                break;
            }
            case "A类": {
                condition.put("skname", skname);
                fttTable = (List<FTTTableEntity>) result.get("fttTableA");
                break;
            }
            case "B类": {
                condition.put("skname", skname);
                fttTable = (List<FTTTableEntity>) result.get("fttTableB");
                break;
            }
            case "C类": {
                condition.put("skname", skname);
                fttTable = (List<FTTTableEntity>) result.get("fttTableC");
                break;
            }
            case "day": {
                dataCount = 10;
                fttTable = (List<FTTTableEntity>) result.get("fttTableOneDay");
                break;
            }
            case "month": {
                dataCount = 10;
                fttTable = (List<FTTTableEntity>) result.get("fttTableOneMonth");
                break;
            }
            default: {
                dataCount = 10;
                fttTable = (List<FTTTableEntity>) result.get("fttTableOneYear");
            }
        }

        condition.put("isData", "isData");//为空，查询无时间条件下的前五条对应的有时间条件的数据
        condition.put("icc", null);
        Long issueTotal = mqsIssueService.queryIssueCount(condition);
        issueTotal = issueTotal == null ? 0 : issueTotal;

        for (int j = 0; j < (dataCount == 5 ? dataCount + 2 : dataCount); j++) {
            try {
                Method method = FTTTableEntity.class.getDeclaredMethod("setDays", String.class);
                //设置该行的icc，条件查询
                condition.put("icc", fttTable.get(j).getTitle());

                if (dataCount == 5) {
                    if (j == 0) {
                        method.invoke(fttTable.get(j), String.valueOf(issueTotal));//第一行
                    } else if (j == 1) {
                        method.invoke(fttTable.get(j), "20Days");//第一列时将中间title写入
                    } else if (j > 1) {
                        Long issueItem = mqsIssueService.queryIssueCount(condition);
                        method.invoke(fttTable.get(j), String.valueOf(issueItem == null ? 0 : issueItem));
                    }
                } else {
                    Long issueItem = mqsIssueService.queryIssueCount(condition);
                    method.invoke(fttTable.get(j), String.valueOf(issueItem == null ? 0 : issueItem));
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            }
        }

        return result;
    }

    //月数据
    private Map<String, Object> fttMonthData(Map<String, Object> condition, Map<String, Object> result) {
        //查询生产线表的名称
        //MqsProductlineEntity mqsProductlineEntity = mqsProductlineService.queryProductlineByid(1L);
        //查询当前整线的采集点
        Map<String, Object> stationCondition = new HashMap<>();
        stationCondition.put("zxMesStationIds", zxMesStationIds);
        List<MqsStationEntity> mqsStationEntityList = mqsIssueService.queryStation(stationCondition);

        //采集点的mesStation
        String station = (String) condition.get("station");//为空时ftt需要查询整线数据进行计算
        Boolean isZX = (Boolean) condition.get("isZX");
        //选择的采集点名字
        String stationChineseName = (String) condition.get("stationChineseName");
        if (isZX) {
            condition.put("station", "0");
            station = "0";
            //stationChineseName = mqsProductlineEntity.getProductionlinename() + "磨合采集点";
        }

        List fttMonth = new ArrayList();
        String endTime = (String) condition.get("endTime");
        endTime = endTime.equals("") ? DateUtils.formatT(new Date()) : endTime;//没有选择时间将时间置为now
        int year = DateUtils.getYear(endTime);//选择时间所在的年
        int month = DateUtils.getMonth(endTime);//月

        Double fttTotal = 0.0;
        Double zxFttTotal;
        Long sample;//样本值数
        Long issue;//问题数
        List<FTTTableEntity> fttTable1 = (List<FTTTableEntity>) result.get("fttTable1");//ftt表格数据
        HttpSession session = request.getSession();
        for (int i = 0; i < 5; i++) {
            if (i < 2) {
                fttMonth.add(null);
            } else {
                */
/**
                 * getStartTimeByMonth系列方法在month为-1，或者13以上会自适应得出正确的时间
                 * 即我们并不用手动去判断月份等是否越界
                 * 2,3,4
                 *//*

                condition.put("datestart", DateUtils.toDate(DateUtils.getTimeByDateAndHour(DateUtils.toDate(DateUtils.getStartTimeByMonth(year, month - 4 + i)), HOUR)));
                condition.put("dateend", DateUtils.toDate(DateUtils.getTimeByDateAndHour(DateUtils.toDate(DateUtils.getStartTimeByMonth(year, month - 3 + i)), HOUR)));

                //updateDate：2018-7-9 11:36:31
                sessionConditions = new HashMap<>();
                sessionConditions.put("datestart", condition.get("datestart"));
                sessionConditions.put("dateend", condition.get("dateend"));
                session.setAttribute(dayList[i], sessionConditions);

                zxFttTotal = 100.0;
                for (MqsStationEntity mqsStationEntity : mqsStationEntityList) {
                    //如果生产线为空，代表查整线数据，需要将station采集点数据全部进行查处汇总，不为空，就按照condition查询，同时执行一边循环即跳出
                    if (!isZX) {
                        fttTotal = mqsFttReportService.queryFttMonthValue(condition);
                        fttTotal = fttTotal == null ? 0.0 : fttTotal;
                        break;
                    } else {
                        condition.put("station", mqsStationEntity.getMesStationid());
                        condition.put("stationChineseName", mqsStationEntity.getStationname());
                        fttTotal = mqsFttReportService.queryFttMonthValue(condition);
                        fttTotal = fttTotal == null ? 0.0 : fttTotal;

                        zxFttTotal = zxFttTotal * fttTotal / 100;
                    }
                }

                //查询样本值和问题数将采集点置为正常，整线置为0
                condition.put("station", station);
                //上面用到了stationChineseName，将该信息重置为前端选择的数据
                if (!isZX) {
                    condition.put("stationChineseName", stationChineseName);
                } else {
                    condition.put("stationChineseName", null);
                }
                sample = mqsFttReportService.queryFttMonthSampleSum(condition);//ftt样本数
                sample = sample == null ? 0 : ("0".equals(station) || "128".equals(station)) && isZX ? sample / 2 : sample;//sql查询为空时不能使用基本数据类型long接收数据

                if (isZX) {
                    //整线的问题数需要查询全部，而样本数又不需要
                    condition.put("zxMesStationIds", new int[]{29, 60, 128, 196, 0});
                    //将其他station信息去掉
                    condition.put("station", null);
                    condition.put("stationChineseName", null);
                }
                //整线问题数查询mesStationId里的全部数据
                issue = mqsFttReportService.queryFttMonthIssueSum(condition);//问题数
                issue = issue == null ? 0 : issue;//同sample

                //利用反射将setMonth+I的方法联系起来
                try {
                    //i = 2获取setMonth1方法
                    Method method = FTTTableEntity.class.getDeclaredMethod("setMonth" + (i - 1), String.class);
                    //将对应月份的ftt传入第一行的对应位置，下同

                    if (!isZX) {
                        method.invoke(fttTable1.get(0), NUMBERFORMAT.format(fttTotal));
                        fttMonth.add(NUMBERFORMAT.format(fttTotal));
                    } else {
                        method.invoke(fttTable1.get(0), NUMBERFORMAT.format(zxFttTotal));
                        fttMonth.add(NUMBERFORMAT.format(zxFttTotal));
                    }
                    method.invoke(fttTable1.get(1), String.valueOf(sample - issue));
                    method.invoke(fttTable1.get(2), String.valueOf(sample));
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                }

            }
        }

        result.put("fttMonth", fttMonth);

        return result;
    }

    //周数据
    private Map<String, Object> fttWeekData(Map<String, Object> condition, Map<String, Object> result) {
        //查询生产线表的名称
        //MqsProductlineEntity mqsProductlineEntity = mqsProductlineService.queryProductlineByid(1L);
        Map<String, Object> stationCondition = new HashMap<>();
        stationCondition.put("zxMesStationIds", zxMesStationIds);
        List<MqsStationEntity> mqsStationEntityList = mqsIssueService.queryStation(stationCondition);
        //采集点mesStationId
        String station = (String) condition.get("station");
        Boolean isZX = (Boolean) condition.get("isZX");
        //选择的采集点名字
        String stationChineseName = (String) condition.get("stationChineseName");
        if (isZX) {
            condition.put("station", "0");
            station = "0";
            //stationChineseName = mqsProductlineEntity.getProductionlinename() + "磨合采集点";
        }

        List fttWeek = new ArrayList();
        String endTime = (String) condition.get("endTime");
        endTime = endTime.equals("") ? DateUtils.formatT(new Date()) : endTime;
        Double fttTotal = 0.0;
        Double zxFttTotal;
        Long sample;//样本值数
        Long issue;//问题数
        List<FTTTableEntity> fttTable1 = (List<FTTTableEntity>) result.get("fttTable1");//ftt表格数据

        HttpSession session = request.getSession();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(DateUtils.toDate(endTime));
        int currrntWeekDay = calendar.get(Calendar.DAY_OF_WEEK);

        //第一周的周五
        endTime = DateUtils.getTimeByDateAndHour(
                DateUtils.toDate(DateUtils.getBackDayTime(calendar.getTime(), currrntWeekDay < WEEK_LOCALTION ? 7 - WEEK_LOCALTION + currrntWeekDay : currrntWeekDay - WEEK_LOCALTION)), HOUR);
        //
        endTime = DateUtils.getBackWeekTime(DateUtils.toDate(endTime), 5);

        for (int i = 0; i < 11; i++) {
            if (i < 5) {
                fttWeek.add(null);
            } else {
                condition.put("datestart", DateUtils.toDate(DateUtils.getBackDayTime(DateUtils.toDate(endTime), 7)));
                condition.put("dateend", DateUtils.toDate(endTime));

                sessionConditions = new HashMap<>();
                sessionConditions.put("datestart", condition.get("datestart"));
                sessionConditions.put("dateend", condition.get("dateend"));
                session.setAttribute(dayList[i] + "w", sessionConditions);

                zxFttTotal = 100.0;
                for (MqsStationEntity mqsStationEntity : mqsStationEntityList) {
                    //如果生产线为空，代表查整线数据，需要将station采集点数据全部进行查处汇总，不为空，就按照condition查询，同时执行一边循环即跳出
                    if (!isZX) {
                        fttTotal = mqsFttReportService.queryFttWeekValue(condition);
                        fttTotal = fttTotal == null ? 0.0 : fttTotal;
                        break;
                    } else {
                        condition.put("station", mqsStationEntity.getMesStationid());
                        condition.put("stationChineseName", mqsStationEntity.getStationname());

                        fttTotal = mqsFttReportService.queryFttWeekValue(condition);
                        fttTotal = fttTotal == null ? 0.0 : fttTotal;

                        zxFttTotal = zxFttTotal * fttTotal / 100;
                    }
                }

                //查询样本值和问题数将采集点置为正常，整线置为0
                condition.put("station", station);
                //上面用到了stationChineseName，将该信息重置为前端选择的数据
                if (!isZX) {
                    condition.put("stationChineseName", stationChineseName);
                } else {
                    condition.put("stationChineseName", null);
                }

                sample = mqsFttReportService.queryFttWeekSampleSum(condition);
                sample = sample == null ? 0 : ("0".equals(station) || "128".equals(station)) && isZX ? sample / 2 : sample;//sql查询为空时不能使用基本数据类型long接收数据

                if (isZX) {
                    //整线的问题数需要查询全部，而样本数又不需要
                    condition.put("zxMesStationIds", new int[]{29, 60, 128, 196, 0});
                    //将其他station信息去掉
                    condition.put("station", null);
                    condition.put("stationChineseName", null);
                }

                issue = mqsFttReportService.queryFttWeekIssueSum(condition);
                issue = issue == null ? 0 : issue;//同sample

                //利用反射将setWeek+I的方法联系起来
                try {
                    //i = 2获取setWeek1方法
                    Method method = FTTTableEntity.class.getDeclaredMethod("setWeek" + (i - 4), String.class);
                    //将对应月份的ftt传入第一行的对应位置，下同
                    if (!isZX) {
                        method.invoke(fttTable1.get(0), NUMBERFORMAT.format(fttTotal));
                        fttWeek.add(NUMBERFORMAT.format(fttTotal));
                    } else {
                        method.invoke(fttTable1.get(0), NUMBERFORMAT.format(zxFttTotal));
                        fttWeek.add(NUMBERFORMAT.format(zxFttTotal));
                    }

                    method.invoke(fttTable1.get(1), String.valueOf(sample - issue));
                    method.invoke(fttTable1.get(2), String.valueOf(sample));
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                }


                endTime = DateUtils.getBackDayTime(DateUtils.toDate(endTime), -7);
            }
        }
        result.put("fttWeek", fttWeek);

        return result;
    }

    //20天总汇及日数据
    private Map<String, Object> fttDayData(Map<String, Object> condition, Map<String, Object> result) {
        //查询生产线表的名称
        //MqsProductlineEntity mqsProductlineEntity = mqsProductlineService.queryProductlineByid(1L);
        //查询当前设置的整线采集点
        Map<String, Object> stationCondition = new HashMap<>();
        stationCondition.put("zxMesStationIds", zxMesStationIds);
        List<MqsStationEntity> mqsStationEntityList = mqsIssueService.queryStation(stationCondition);
        //采集点mesStationId
        String station = (String) condition.get("station");
        Boolean isZX = (Boolean) condition.get("isZX");
        //采集点名
        String stationChineseName = (String) condition.get("stationChineseName");
        if (isZX) {
            condition.put("station", "0");
            station = "0";
            //stationChineseName = mqsProductlineEntity.getProductionlinename() + "磨合采集点";
        }

        List fttDays = new ArrayList();
        List fttDay = new ArrayList();

        Double fttTotal = 0.0;
        Double zxFttTotal;
        Long sampleSum = 0l;//20天样本值总和
        Long issueSum = 0l;//20天问题
        String endTime = (String) condition.get("endTime");
        endTime = endTime.equals("") ? DateUtils.formatT(new Date()) : endTime;
        endTime = DateUtils.getBackDayTime(DateUtils.toDate(endTime), 19);
        endTime = DateUtils.getTimeByDateAndHour(DateUtils.toDate(endTime), 8);
        Long sample;//样本值数
        Long issue;//问题数
        List<FTTTableEntity> fttTable1 = (List<FTTTableEntity>) result.get("fttTable1");//ftt表格数据

        //updateDate：2018-7-9 11:37:44
        HttpSession session = request.getSession();

        //清楚之前使用的开始时间和结束时间
        condition.put("datestart", null);
        condition.put("dateend", null);

        for (int i = 0; i < 32; i++) {
            if (i < 12) {
                fttDay.add(null);
            } else {
                condition.put("datecreated", DateUtils.toDate(endTime));
                condition.put("datestart", DateUtils.toDate(endTime));
                condition.put("dateend", DateUtils.toDate(DateUtils.getBackDayTime(DateUtils.toDate(endTime), -1)));

                sessionConditions = new HashMap<>();
                sessionConditions.put("datestart", DateUtils.toDate(endTime));
                sessionConditions.put("dateend", DateUtils.toDate(DateUtils.getBackDayTime(DateUtils.toDate(endTime), -1)));
                session.setAttribute(dayList[i], sessionConditions);

                zxFttTotal = 100.0;
                for (int m = 0; m < mqsStationEntityList.size(); m++) {
                    //如果生产线为空，代表查整线数据，需要将station采集点数据全部进行查处汇总，不为空，就按照condition查询，同时执行一边循环即跳出
                    if (!isZX) {
                        fttTotal = mqsFttReportService.queryFttDayValue(condition);
                        fttTotal = fttTotal == null ? 0.0 : fttTotal;
                        break;
                    } else {
                        //condition.put("station", mqsStationEntityList.get(m).getMesStationid());
                        condition.put("stationChineseName", mqsStationEntityList.get(m).getStationname());

                        fttTotal = mqsFttReportService.queryFttDayValue(condition);
                        fttTotal = fttTotal == null ? 0.0 : fttTotal;

                        zxFttTotal = zxFttTotal * fttTotal / 100;
                    }
                }

                //查询样本值和问题数将采集点置为正常，整线置为0
                condition.put("station", station);
                //上面用到了stationChineseName，将该信息重置为前端选择的数据
                if (!isZX) {
                    condition.put("stationChineseName", stationChineseName);
                } else {
                    condition.put("stationChineseName", null);
                }

                sample = mqsFttReportService.queryFttDaySampleSum(condition);
                sample = sample == null ? 0 : ("0".equals(station) || "128".equals(station)) && isZX ? sample / 2 : sample;//sql查询为空时不能使用基本数据类型long接收数据

                if (isZX) {
                    //整线的问题数需要查询全部，而样本数又不需要
                    condition.put("zxMesStationIds", new int[]{29, 60, 128, 196, 0});
                    //将其他station信息去掉
                    condition.put("station", null);
                    condition.put("stationChineseName", null);
                }

                issue = mqsFttReportService.queryFttDayIssueSum(condition);
                issue = issue == null ? 0 : issue;//同sample

                //利用反射将setDay+I的方法联系起来
                try {
                    //i = 2获取setDay1方法
                    Method method = FTTTableEntity.class.getDeclaredMethod("setDay" + (i - 11), String.class);
                    //将对应月份的ftt传入第一行的对应位置，下同

                    if (!isZX) {
                        method.invoke(fttTable1.get(0), NUMBERFORMAT.format(fttTotal));
                        fttDay.add(NUMBERFORMAT.format(fttTotal));

                    } else {
                        method.invoke(fttTable1.get(0), NUMBERFORMAT.format(zxFttTotal));
                        fttDay.add(NUMBERFORMAT.format(zxFttTotal));
                    }

                    method.invoke(fttTable1.get(1), String.valueOf(sample - issue));
                    method.invoke(fttTable1.get(2), String.valueOf(sample));
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                }

                sampleSum += sample;
                issueSum += issue;
                endTime = DateUtils.getBackDayTime(DateUtils.toDate(endTime), -1);
            }
        }

        for (int i = 0; i < 12; i++) {
            if (i < 11) {
                fttDays.add(null);
            } else {

                //利用反射将setDays的方法联系起来
                try {
                    Method method = FTTTableEntity.class.getDeclaredMethod("setDays", String.class);

                    //查询20天的数据
                    endTime = (String) condition.get("endTime");
                    endTime = endTime.equals("") ? DateUtils.formatT(new Date()) : endTime;
                    condition.put("datestart", DateUtils.toDate(DateUtils.getTimeByDateAndHour(DateUtils.toDate(DateUtils.getBackDayTime(DateUtils.toDate(endTime), 19)), 8)));
                    condition.put("dateend", DateUtils.toDate(DateUtils.getTimeByDateAndHour(DateUtils.toDate(DateUtils.getBackDayTime(DateUtils.toDate(endTime), -1)), 8)));
                    condition.put("datecreated", null);

                    sessionConditions = new HashMap<>();
                    sessionConditions.put("datestart", condition.get("datestart"));
                    sessionConditions.put("dateend", condition.get("dateend"));
                    session.setAttribute(dayList[i], sessionConditions);

                    Double daysFtt = 1.0;
                    condition.put("zxMesStationIds", null);

                    if (isZX) {
                        Map<String,Object> params = new HashMap<>();
                        params.putAll(condition);
                        params.put("isZX",0);
                        for (MqsStationEntity mqsStationEntity : mqsStationEntityList) {
                            params.put("station", mqsStationEntity.getMesStationid());
                            params.put("stationChineseName", mqsStationEntity.getStationname());

                            Long stationSample = mqsFttReportService.queryFttDaySampleSum(params);
                            stationSample = stationSample == null ? 0 : stationSample;//防止为空
                            stationSample = "0".equals((params.get("station"))) ? stationSample / 2 : stationSample;
                            Long stationIssue = mqsFttReportService.queryFttDayIssueSum(params);
                            stationIssue = stationIssue == null ? 0 : stationIssue;//同sample

                            daysFtt *= stationSample == 0 ? 0 : (double) (stationSample - stationIssue) / (double) (stationSample);
                        }
                    }

                    if (!isZX) {
                        method.invoke(fttTable1.get(0), NUMBERFORMAT.format((double) (sampleSum - issueSum) / (double) sampleSum * 100));
                        fttDays.add(NUMBERFORMAT.format((double) (sampleSum - issueSum) / (double) sampleSum * 100));
                    } else {
                        method.invoke(fttTable1.get(0), NUMBERFORMAT.format(daysFtt * 100));
                        fttDays.add(NUMBERFORMAT.format(daysFtt * 100));

                        //将对应月份的ftt传入第一行的对应位置，下同
                        condition.put("isZX", true);
                        condition.put("zxMesStationIds", new int[]{29, 60, 128, 196, 0});
                        condition.put("station", null);
                        condition.put("stationChineseName", null);

                        issueSum = mqsFttReportService.queryFttDayIssueSum(condition);//问题数
                        issueSum = issueSum == null ? 0 : issueSum;//同sample
                    }
                    method.invoke(fttTable1.get(1), String.valueOf(sampleSum - issueSum));
                    method.invoke(fttTable1.get(2), String.valueOf(sampleSum));
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                }
            }
        }

        result.put("fttDays", fttDays);
        result.put("fttDay", fttDay);
        return result;
    }

    //日期列
    private String[] colList(String endTime) {
        Date endDate = DateUtils.toDate(endTime);
        String[] result = new String[32];

        result[0] = String.valueOf(DateUtils.getYear(DateUtils.getBackYearTime(endDate, 1)));
        result[1] = String.valueOf(DateUtils.getYear(endTime));

        int currentMonth = DateUtils.getMonth(endTime);
        result[4] = String.valueOf(currentMonth) + "月";
        result[3] = String.valueOf(currentMonth - 1 == 0 ? 12 : currentMonth - 1) + "月";
        result[2] = String.valueOf(currentMonth - 2 < 1 ? 10 + currentMonth : currentMonth - 2) + "月";


        String endTimeS;
        Date endTimeD = new Date();
        for (int i = 10; i > 4; i--) {
            //第一次取得结束的周五时间
            if (i == 10) {
                //判断当前时间是周末，取时间为当前周的周五，否者，取上一周周五
                endTimeS = DateUtils.getFridayEndTime(endDate, DateUtils.isWeekend(endDate) ? -1 : 0);
                endTimeD = DateUtils.toDate(endTimeS);
                result[i] = DateUtils.getMonth(endTimeS) + "/" + DateUtils.getDay(endTimeS);
            } else {
                //只需向前推7天即可
                endTimeS = DateUtils.getBackDayTime(endTimeD, 7);
                endTimeD = DateUtils.toDate(endTimeS);
                result[i] = DateUtils.getMonth(endTimeS) + "/" + DateUtils.getDay(endTimeS);
            }
        }

        result[11] = "20days";

        for (int i = 31; i > 11; i--) {
            result[i] = DateUtils.getMonth(endTime) + "/" + DateUtils.getDay(endTime);
            endTime = DateUtils.getBackDayTime(endDate, 1);
            endDate = DateUtils.toDate(endTime);
        }

        return result;
    }

    //设置sabc的第一列
    private Map<String, Object> setRolTitle(Map<String, Object> condition, Map<String, Object> result, String
            skname) {
        List<FTTTableEntity> fttTable;
        switch (skname) {
            case "S类": {
                fttTable = (List<FTTTableEntity>) result.get("fttTableS");
                break;
            }
            case "A类": {
                fttTable = (List<FTTTableEntity>) result.get("fttTableA");
                break;
            }
            case "B类": {
                fttTable = (List<FTTTableEntity>) result.get("fttTableB");
                break;
            }
            default: {
                fttTable = (List<FTTTableEntity>) result.get("fttTableC");
            }
        }

        //设置类别
        condition.put("skname", skname);
        //top5
        condition.put("topNum", 5);
        //没有时间限制
        condition.put("datestart", null);
        condition.put("dateend", null);
        //设置识别条件
        //isData，约束top排序的，为空时不top排序，同时带条件查询
        condition.put("isData", "isData");
        List<MqsIssueEntity> mqsIssueEntityList = mqsIssueService.queryIssue(condition);
        for (int i = 0; i < 7; i++) {
            FTTTableEntity fttTableEntity = new FTTTableEntity();
            switch (i) {
                case 0: {
                    fttTableEntity.setTitle("问题总数");
                    break;
                }
                case 1: {
                    fttTableEntity.setTitle("TOP5 ICCs");
                    break;
                }
                default: {
                    fttTableEntity.setTitle(mqsIssueEntityList.size() <= i - 2 ? "-" : mqsIssueEntityList.get(i - 2).getIcc());
                }
            }
            fttTable.add(fttTableEntity);
        }


        condition.put("topNum", null);
        condition.put("isData", null);
        return result;
    }

    //查询条件，返回数据，查询类型，第一年还是第二年
    private Map<String, Object> setYear(Map<String, Object> condition, Map<String, Object> result, String
            skname, int s) {
        int dataCount = 5;//前几个表是top5,后几个表是10;
        List<FTTTableEntity> fttTable;
        condition.put("skname", null);//默认不按分类查询

        switch (skname) {
            case "S类": {
                condition.put("skname", skname);//添加分类查询
                fttTable = (List<FTTTableEntity>) result.get("fttTableS");
                break;
            }
            case "A类": {
                condition.put("skname", skname);
                fttTable = (List<FTTTableEntity>) result.get("fttTableA");
                break;
            }
            case "B类": {
                condition.put("skname", skname);
                fttTable = (List<FTTTableEntity>) result.get("fttTableB");
                break;
            }
            case "C类": {
                condition.put("skname", skname);
                fttTable = (List<FTTTableEntity>) result.get("fttTableC");
                break;
            }
            case "day": {
                dataCount = 10;
                fttTable = (List<FTTTableEntity>) result.get("fttTableOneDay");
                break;
            }
            case "month": {
                dataCount = 10;
                fttTable = (List<FTTTableEntity>) result.get("fttTableOneMonth");
                break;
            }
            default: {
                dataCount = 10;
                fttTable = (List<FTTTableEntity>) result.get("fttTableOneYear");
            }
        }

        //isData，约束top排序的，为空时不top排序，同时带条件查询
        condition.put("isData", "isData");
        condition.put("icc", null);
        Long issueTotal = mqsIssueService.queryIssueCount(condition);
        issueTotal = issueTotal == null ? 0 : issueTotal;

        for (int i = 0; i < (dataCount == 5 ? dataCount + 2 : dataCount); i++) {
            condition.put("icc", fttTable.get(i).getTitle());

            if (dataCount == 5) {
                switch (i) {
                    case 0: {
                        if (s == 1)
                            fttTable.get(i).setYear1(String.valueOf(issueTotal));
                        else
                            fttTable.get(i).setYear2(String.valueOf(issueTotal));
                        break;
                    }
                    case 1: {
                        if (s == 1)
                            fttTable.get(i).setYear1("CY");
                        break;
                    }
                    default: {
                        Long issueItem = mqsIssueService.queryIssueCount(condition);
                        if (s == 1) {
                            fttTable.get(i).setYear1(String.valueOf(issueItem == null ? 0 : issueItem));
                        } else {
                            fttTable.get(i).setYear2(String.valueOf(issueItem == null ? 0 : issueItem));
                        }
                        break;
                    }
                }
            } else {
                Long issueItem = mqsIssueService.queryIssueCount(condition);
                if (s == 1) {
                    fttTable.get(i).setYear1(String.valueOf(issueItem == null ? 0 : issueItem));
                } else {
                    fttTable.get(i).setYear2(String.valueOf(issueItem == null ? 0 : issueItem));
                }

            }
        }

        return result;
    }

    //设置月，周，日的数据，参数：查询条件，返回数据，查询类型，数据头(month,day,week),设置的方法
    private Map<String, Object> setOther(Map<String, Object> condition, Map<String, Object> result, String
            skname, int i, String dataType, Method method) {
        int dataCount = 5;
        List<FTTTableEntity> fttTable;
        condition.put("skname", null);//默认不按分类查询

        switch (skname) {
            case "S类": {
                condition.put("skname", skname);//添加分类查询
                fttTable = (List<FTTTableEntity>) result.get("fttTableS");
                break;
            }
            case "A类": {
                condition.put("skname", skname);
                fttTable = (List<FTTTableEntity>) result.get("fttTableA");
                break;
            }
            case "B类": {
                condition.put("skname", skname);
                fttTable = (List<FTTTableEntity>) result.get("fttTableB");
                break;
            }
            case "C类": {
                condition.put("skname", skname);
                fttTable = (List<FTTTableEntity>) result.get("fttTableC");
                break;
            }
            case "day": {
                dataCount = 10;
                fttTable = (List<FTTTableEntity>) result.get("fttTableOneDay");
                break;
            }
            case "month": {
                dataCount = 10;
                fttTable = (List<FTTTableEntity>) result.get("fttTableOneMonth");
                break;
            }
            default: {
                dataCount = 10;
                fttTable = (List<FTTTableEntity>) result.get("fttTableOneYear");
            }
        }

        condition.put("isData", "isData");//为空，查询无时间条件下的前五条对应的有时间条件的数据
        condition.put("icc", null);
        Long issueTotal = mqsIssueService.queryIssueCount(condition);
        issueTotal = issueTotal == null ? 0 : issueTotal;

        for (int j = 0; j < (dataCount == 5 ? dataCount + 2 : dataCount); j++) {
            try {
                //设置该行的icc，条件查询
                condition.put("icc", fttTable.get(j).getTitle());

                if (dataCount == 5) {
                    if (j == 0) {
                        method.invoke(fttTable.get(j), String.valueOf(issueTotal));//第一行
                    } else if (j == 1 && i - 2 == 0) {
                        method.invoke(fttTable.get(j), dataType);//第一列时将中间title写入
                    } else if (j > 1) {
                        Long issueItem = mqsIssueService.queryIssueCount(condition);
                        method.invoke(fttTable.get(j), String.valueOf(issueItem == null ? 0 : issueItem));
                    }
                } else {
                    Long issueItem = mqsIssueService.queryIssueCount(condition);
                    method.invoke(fttTable.get(j), String.valueOf(issueItem == null ? 0 : issueItem));
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }

        return result;
    }

    //设置最近一天，月，年的第一列
    private Map<String, Object> setNearTitle
    (Map<String, Object> condition, Map<String, Object> result, String skname) {
        List<FTTTableEntity> fttTable;
        //此时需要时间限制
        String endTime = (String) condition.get("endTime");
        endTime = endTime.equals("") ? DateUtils.formatT(new Date()) : endTime;
        //获得选中时间的早上8点，分别向前取一个天，一月，一年
        endTime = DateUtils.getTimeByDateAndHour(DateUtils.toDate(endTime), 8);
        Date dEndTime = DateUtils.toDate(endTime);

        switch (skname) {
            case "TOP10 ICCs-最近一天": {
                condition.put("datestart", DateUtils.toDate(DateUtils.getBackDayTime(DateUtils.toDate(endTime), 1)));
                condition.put("dateend", DateUtils.toDate(endTime));

                fttTable = (List<FTTTableEntity>) result.get("fttTableOneDay");
                break;
            }
            case "TOP10 ICCs-最近一月": {
                String startTime = DateUtils.getStartMonthTime(dEndTime);
                condition.put("datestart", DateUtils.toDate(startTime));
                condition.put("dateend", DateUtils.toDate(DateUtils.getBackMonthTime(DateUtils.toDate(startTime), -1)));

                fttTable = (List<FTTTableEntity>) result.get("fttTableOneMonth");
                break;
            }
            default: {
                String startTime = DateUtils.getStartYearTime(dEndTime);
                condition.put("datestart", DateUtils.toDate(startTime));
                condition.put("dateend", DateUtils.toDate(DateUtils.getBackYearTime(DateUtils.toDate(startTime), -1)));

                fttTable = (List<FTTTableEntity>) result.get("fttTableOneYear");
            }
        }

        condition.put("skname", null);
        //top10
        condition.put("topNum", 10);

        List<MqsIssueEntity> mqsIssueEntityList = mqsIssueService.queryIssue(condition);
        for (int i = 0; i < 10; i++) {
            FTTTableEntity fttTableEntity = new FTTTableEntity();
            fttTableEntity.setTitle(mqsIssueEntityList.size() <= i ? "-" : mqsIssueEntityList.get(i).getIcc());
            fttTable.add(fttTableEntity);
        }

        return result;
    }

    */
/**
     * 以上为查询ftt
     * <p>
     * 以下为生成ftt
     *//*


    public void runFttYearReport(Object obj) {
        System.out.println("obj->" + obj);
        MqsFttYearReport mqsFttYearReport = new MqsFttYearReport();
        Calendar calendar = Calendar.getInstance();
        //最早开始时间，查MQS_PRODUCTION表
        Date earliestDate = mqsIssueService.queryDateCreated();
        //采集点
        List<MqsStationEntity> stations = mqsIssueService.queryStation(new HashMap<>());

        calendar.setTime(earliestDate);

        int earliestYear = calendar.get(Calendar.YEAR);

        //当前时间信息
        calendar = Calendar.getInstance();
        int currentYear = calendar.get(Calendar.YEAR);
        int currentMonth = calendar.get(Calendar.MONTH) + 1;
        int currentDay = calendar.get(Calendar.DATE);
        int currentHour = calendar.get(Calendar.HOUR);

        if (currentDay == 1 && currentMonth == 1 && currentHour >= 0 && currentHour < 8) {
            //如果是一月一号的0-8点，将时间往前推一天
            calendar.setTime(DateUtils.toDate(DateUtils.getBackDayTime(calendar.getTime(), 1)));

            //重新获取
            currentYear = calendar.get(Calendar.YEAR);
        }

        //充当查询条件
        Map<String, Object> conditions = new HashMap<>();
        int currentYearTemp = currentYear;
        for (; currentYearTemp >= earliestYear; currentYearTemp--) {
            Date dateStart = DateUtils.toDate(DateUtils.getStartTimeByHour(currentYearTemp, 1, 1, RUN_AT_HOUR));
            Date dateEnd = DateUtils.toDate(DateUtils.getStartTimeByHour(currentYearTemp + 1, 1, 1, RUN_AT_HOUR));
            conditions.put("datestart", dateStart);
            conditions.put("dateend", dateEnd);
            conditions.put("isenable", 1);

            for (MqsStationEntity station : stations) {
                //conditions.put("productionDept", station.getProductiondeptname());
                //conditions.put("region", station.getRegionname());
                //conditions.put("plinename", station.getProductionlinename());
                conditions.put("stationName", station.getStationname());
                conditions.put("mesStationId", station.getMesStationid());
                conditions.put("pstation", station.getStationname());

                //当不是当前年的时候，检测之前年的固定数据是否存在，存在的话就不再计算，因为非当前年的数据是不会更改的
                int isHereFttYear = mqsFttReportService.queryFttYearReportByConditions(conditions);
                if (currentYearTemp != currentYear && isHereFttYear == 1) {
                    System.out.println("当前数据已存在，已退出本次循环，代号" + System.currentTimeMillis());
                    continue;
                }
                //当是当前年的时候，将已存在的数据删除重新计算
                else if (currentYearTemp == currentYear && isHereFttYear == 1) {
                    System.out.println("检测到存在当前年不完整数据，执行删除重写操作");
                    System.out.println(mqsFttReportService.deleteFttYearQuantity(conditions) == 0 ? "删除失败" : "删除成功！");
                }


                //
                //
                //Long total = mqsFttReportService.queryFttDayTotalByChinese(conditions);
                //total = total == null ? 0 : total;
                //Long issue = mqsFttReportService.queryFttDayIssueByChinese(conditions);
                //issue = issue == null ? 0 : issue;

                int total = mqsIssueService.queryQuantityByCondition(conditions);
                int issue = mqsIssueService.queryFttIssueByCondition(conditions);

                mqsFttYearReport.setYearftt((total == 0 || total < issue) ? 0.00 : (double) (total - issue) * 100 / (double) total);
                //创建时间
                mqsFttYearReport.setDatecreated(DateUtils.toDate(DateUtils.getTimeByDateAndHour(new Date(), RUN_AT_HOUR)));
                //开始时间
                mqsFttYearReport.setDatestart(dateStart);
                //结束时间
                mqsFttYearReport.setDateend(dateEnd);
                //station
                mqsFttYearReport.setPstation(station.getStationname());

                //mqsFttYearReport.setPregion(station.getRegionname());

                //mqsFttYearReport.setPlinename(station.getProductionlinename());

                //mqsFttYearReport.setPworkshop(station.getProductiondeptname());

                //是否查到数据
                mqsFttYearReport.setHavedata(total == 0 ? 0 : 1);

                mqsFttYearReport.setIssue(issue);

                mqsFttYearReport.setSample(total);
                System.out.println(this.mqsFttReportService.insertFttYearReport(mqsFttYearReport) == 0 ? "年FTT写入失败!" : "年FTT写入成功!");
                System.out.println("信息为：" + mqsFttYearReport);
            }
        }
    }

    public void runFttMonthReport(Object obj) {
        System.out.println("obj->" + obj);
        Calendar calendar;
        //最早开始时间，查MQS_PRODUCTION表
        Date earliestDate = mqsIssueService.queryDateCreated();
        //采集点
        List<MqsStationEntity> stations = mqsIssueService.queryStation(new HashMap<>());

        //当前时间信息
        calendar = Calendar.getInstance();
        int currentYear = calendar.get(Calendar.YEAR);
        int currentMonth = calendar.get(Calendar.MONTH) + 1;
        int currentDay = calendar.get(Calendar.DATE);
        int currentHour = calendar.get(Calendar.HOUR);

        if (currentDay == 1 && currentHour >= 0 && currentHour < 8) {
            //如果是一号的0-8点，将时间往前推一天
            calendar.setTime(DateUtils.toDate(DateUtils.getBackDayTime(calendar.getTime(), 1)));

            //重新获取
            currentYear = calendar.get(Calendar.YEAR);
            currentMonth = calendar.get(Calendar.MONTH);
        }

        //充当查询条件
        Map<String, Object> conditions = new HashMap<>();

        MqsFttMonthReport mqsFttMonthReport = new MqsFttMonthReport();

        //2017/12/28 08:00:00
        Date currentTimeForMonthFtt = DateUtils.toDate(DateUtils.getTimeByDateAndHour(calendar.getTime(), RUN_AT_HOUR));
        //2017/12/ 08:00:00
        Date beforeOneMonthForMonthFtt;
        calendar.setTime(currentTimeForMonthFtt);
        //2017
        int currentYearForFttMonth = calendar.get(Calendar.YEAR);
        //12
        int currentMonthForFttMonth = calendar.get(Calendar.MONTH) + 1;
        for (; currentTimeForMonthFtt.getTime() > earliestDate.getTime(); ) {
            //2017/12/1 08:00:00
            beforeOneMonthForMonthFtt = DateUtils.toDate(DateUtils.getStartTimeByHour(currentYearForFttMonth, currentMonthForFttMonth, 1, RUN_AT_HOUR));
            //设置结束时间，月份应比当前大一月，当月份为13时，写为1月，年份大一月，只加减，均不赋值覆盖当前值
            //只有在跨年时才会出现，也就是在12月份时
            if (currentMonthForFttMonth + 1 > 12) {
                currentTimeForMonthFtt = DateUtils.toDate(DateUtils.getStartTimeByHour(currentYearForFttMonth + 1, 1, 1, RUN_AT_HOUR));
            } else {
                currentTimeForMonthFtt = DateUtils.toDate(DateUtils.getStartTimeByHour(currentYearForFttMonth, currentMonthForFttMonth + 1, 1, RUN_AT_HOUR));
            }
            //结束日期判断并获取完成
            conditions.put("datestart", beforeOneMonthForMonthFtt);
            conditions.put("dateend", currentTimeForMonthFtt);
            conditions.put("isenable", 1);

            for (MqsStationEntity station : stations) {
                //conditions.put("productionDept", station.getProductiondeptname());
                //conditions.put("region", station.getRegionname());
                //conditions.put("plinename", station.getProductionlinename());
                conditions.put("stationName", station.getStationname());
                conditions.put("mesStationId", station.getMesStationid());
                conditions.put("pstation", station.getStationname());

                int isHereFttMonth = mqsFttReportService.queryFttMonthReportByConditions(conditions);
                //条件一：判断当前信息数据存在，条件二：当前月份是检测月份但年份不是，或者当前月份不是检测月份但年份是，或者都不是
                if (isHereFttMonth == 1 && !(currentMonth == currentMonthForFttMonth && currentYear == currentYearForFttMonth)) {
                    System.out.println("当前月数据已存在，已退出本次循环，时间：" + DateUtils.formatT(beforeOneMonthForMonthFtt));
                    continue;
                } else if (isHereFttMonth == 1 && (currentMonth == currentMonthForFttMonth && currentYear == currentYearForFttMonth)) {
                    System.out.println("检测到存在当前月不完整数据，执行删除重写操作");
                    System.out.println(mqsFttReportService.deleteFttMonthQuantity(conditions) == 0 ? "删除失败" : "删除成功！");
                }

*/
/*                Long total = mqsFttReportService.queryFttDayTotalByChinese(conditions);
                total = total == null ? 0 : total;
                Long issue = mqsFttReportService.queryFttDayIssueByChinese(conditions);
                issue = issue == null ? 0 : issue;*//*


                int total = mqsIssueService.queryQuantityByCondition(conditions);
                int issue = mqsIssueService.queryFttIssueByCondition(conditions);

                mqsFttMonthReport.setMonthftt((total == 0 || total < issue) ? 0.00 : (double) (total - issue) * 100 / (double) total);
                //创建时间
                mqsFttMonthReport.setDatecreated(DateUtils.toDate(DateUtils.getTimeByDateAndHour(new Date(), RUN_AT_HOUR)));
                //开始时间
                mqsFttMonthReport.setDatestart(beforeOneMonthForMonthFtt);
                //结束时间
                mqsFttMonthReport.setDateend(currentTimeForMonthFtt);

                mqsFttMonthReport.setPstation(station.getStationname());

                //mqsFttMonthReport.setPregion(station.getRegionname());

                //mqsFttMonthReport.setPlinename(station.getProductionlinename());

                //mqsFttMonthReport.setPworkshop(station.getProductiondeptname());


                mqsFttMonthReport.setHavedata(total == 0 ? 0 : 1);

                mqsFttMonthReport.setSample(total);

                mqsFttMonthReport.setIssue(issue);

                System.out.println(this.mqsFttReportService.insertFttMonthReport(mqsFttMonthReport) == 0 ? "月FTT写入失败!" : "月FTT写入成功!");
                System.out.println("信息为：" + mqsFttMonthReport);
            }
            //往回倒推1个月，并判断是否越界
            if (currentMonthForFttMonth - 1 < 1) {
                currentMonthForFttMonth = 12;
                currentYearForFttMonth--;
            } else {
                currentMonthForFttMonth--;
            }

            currentTimeForMonthFtt = beforeOneMonthForMonthFtt;
        }
    }

    public void runFttWeekReport(Object obj) {
        System.out.println("obj->" + obj);
        Calendar calendar;
        MqsFttWeekReport mqsFttWeekReport = new MqsFttWeekReport();
        //充当查询条件
        Map<String, Object> conditions = new HashMap<>();

        //最早开始时间，查MQS_PRODUCTION表
        Date earliestDate = mqsIssueService.queryDateCreated();
        //采集点
        List<MqsStationEntity> stations = mqsIssueService.queryStation(new HashMap<>());

        //当前时间信息
        calendar = Calendar.getInstance();
        int currentYear = calendar.get(Calendar.YEAR);
        int currentMonth = calendar.get(Calendar.MONTH) + 1;
        int currrntWeekDay = calendar.get(Calendar.DAY_OF_WEEK);
        int currentDay = calendar.get(Calendar.DATE);
        int currentHour = calendar.get(Calendar.HOUR);

        if (currentHour >= 0 && currentHour < 8) {
            calendar.setTime(DateUtils.toDate(DateUtils.getBackDayTime(calendar.getTime(), 1)));
            currentYear = calendar.get(Calendar.YEAR);
            currentMonth = calendar.get(Calendar.MONTH) + 1;
            currrntWeekDay = calendar.get(Calendar.DAY_OF_WEEK);
            currentDay = calendar.get(Calendar.DATE);
        }

        //获取周当前周几后，计算当前属于哪一周，并得到周五时间
        Date currentTimeForFttWeek = DateUtils.toDate(DateUtils.getTimeByDateAndHour(
                DateUtils.toDate(DateUtils.getBackDayTime(calendar.getTime(), currrntWeekDay < WEEK_LOCALTION ? 7 - WEEK_LOCALTION + currrntWeekDay : currrntWeekDay - WEEK_LOCALTION)), RUN_AT_HOUR));
        //当前日期置为当天结束日期，0点到24点的结束日期均为8点，2017/12/14 08:00:00
        Date beforeOneWeekForFttWeek = DateUtils.toDate(DateUtils.getBackWeekTime(currentTimeForFttWeek, 1));
        //前一天，也理解为开始时间，2017/12/7 08:00:00

        //重置calendar
        calendar = Calendar.getInstance();
        int currentYearForFttWeek = calendar.get(Calendar.YEAR);
        //2017
        int currentMonthForFttWeek = calendar.get(Calendar.MONTH);
        //12
        int currentDayForFttWeek = calendar.get(Calendar.DATE);
        //14
        for (; currentTimeForFttWeek.getTime() > earliestDate.getTime(); ) {
            conditions.put("datestart", beforeOneWeekForFttWeek);
            conditions.put("dateend", currentTimeForFttWeek);
            conditions.put("isenable", 1);

            for (MqsStationEntity station : stations) {
                //conditions.put("productionDept", station.getProductiondeptname());
                //conditions.put("region", station.getRegionname());
                //conditions.put("plinename", station.getProductionlinename());
                conditions.put("stationName", station.getStationname());
                conditions.put("mesStationId", station.getMesStationid());
                conditions.put("pstation", station.getStationname());

                //检测是否存在该信息
                int isHereFttWeek = mqsFttReportService.queryFttWeekReportByConditions(conditions);
                if (isHereFttWeek == 1 && !(currentYear == currentYearForFttWeek && currentMonth == currentMonthForFttWeek && currentDay == currentDayForFttWeek)) {
                    System.out.println("当前周数据已存在，已退出本次循环，时间：" + DateUtils.formatT(beforeOneWeekForFttWeek));
                    continue;
                } else if (isHereFttWeek == 1 && (currentYear == currentYearForFttWeek && currentMonth == currentMonthForFttWeek && currentDay == currentDayForFttWeek)) {
                    System.out.println("检测到存在当前周不完整数据，执行删除重写操作");
                    System.out.println(mqsFttReportService.deleteFttWeekQuantity(conditions) == 0 ? "删除失败" : "删除成功！");
                }

*/
/*                Long total = mqsFttReportService.queryFttDayTotalByChinese(conditions);
                total = total == null ? 0 : total;
                Long issue = mqsFttReportService.queryFttDayIssueByChinese(conditions);
                issue = issue == null ? 0 : issue;*//*


                int total = mqsIssueService.queryQuantityByCondition(conditions);
                int issue = mqsIssueService.queryFttIssueByCondition(conditions);

                mqsFttWeekReport.setWeekftt((total == 0 || total < issue) ? 0.00 : (double) (total - issue) * 100 / (double) total);
                //创建时间
                mqsFttWeekReport.setDatecreated(DateUtils.toDate(DateUtils.getTimeByDateAndHour(new Date(), RUN_AT_HOUR)));
                //开始时间
                mqsFttWeekReport.setDatestart(beforeOneWeekForFttWeek);
                //结束时间
                mqsFttWeekReport.setDateend(currentTimeForFttWeek);
                //采集点
                mqsFttWeekReport.setPstation(station.getStationname());

                //mqsFttWeekReport.setPregion(station.getRegionname());

                //mqsFttWeekReport.setPlinename(station.getProductionlinename());

                //mqsFttWeekReport.setPworkshop(station.getProductiondeptname());

                mqsFttWeekReport.setHavedata(total == 0 ? 0 : 1);

                mqsFttWeekReport.setSample(total);

                mqsFttWeekReport.setIssue(issue);

                System.out.println(this.mqsFttReportService.insertFttWeekReport(mqsFttWeekReport) == 0 ? "周FTT写入失败!" : "周FTT写入成功!");
                System.out.println("信息为：" + mqsFttWeekReport);
            }
            //倒推一周
            currentTimeForFttWeek = beforeOneWeekForFttWeek;
            beforeOneWeekForFttWeek = DateUtils.toDate(DateUtils.getBackWeekTime(currentTimeForFttWeek, 1));

            calendar.setTime(currentTimeForFttWeek);
            currentYearForFttWeek = calendar.get(Calendar.YEAR);
            //2017
            currentMonthForFttWeek = calendar.get(Calendar.MONTH);
            //12
            currentDayForFttWeek = calendar.get(Calendar.DATE);
            //7
        }
    }

    @SysLog("Ftt趋势删除并生成")
    @RequestMapping(value = "deleteAndGenerateFtt", method = RequestMethod.GET)
    public R deleteFttReport() {
        mqsFttReportService.deleteAllFtt();
        return this.runFttDayReport();
    }

    @SysLog("Ftt趋势手动生成")
    @RequestMapping(value = "generateFtt", method = RequestMethod.GET)
    public R runFttDayReport() {
        long startTime = System.currentTimeMillis();

        Calendar calendar;
        //充当查询条件
        Map<String, Object> conditions = new HashMap<>();
        MqsFttDayReport mqsFttDayReport = new MqsFttDayReport();

        //最早开始时间
        //updateTime：2018年7月19日08:59:26
        //最早开始时间根据需求修改为最近三个月时间
        ///Date earliestDate = mqsIssueService.queryDateCreated();
        Date earliestDate = DateUtils.toDate(DateUtils.getBackMonthTime(new Date(), 3).replaceAll("-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}", "-01 08:00:00"));

        //采集点
        List<MqsStationEntity> stations = mqsIssueService.queryStation(new HashMap<>());

        //当前时间信息
        calendar = Calendar.getInstance();
        int currentYear = calendar.get(Calendar.YEAR);
        int currentMonth = calendar.get(Calendar.MONTH) + 1;
        int currentDay = calendar.get(Calendar.DATE);
        int currentHour = calendar.get(Calendar.HOUR_OF_DAY);

        //判断是否在0到8点之间--问题点
        if (currentHour >= 0 && currentHour < 8) {
            //往回退一天
            calendar.setTime(DateUtils.toDate(DateUtils.getBackDayTime(calendar.getTime(), 1)));

            //重新获取正确时间
            currentYear = calendar.get(Calendar.YEAR);
            currentMonth = calendar.get(Calendar.MONTH) + 1;
            currentDay = calendar.get(Calendar.DATE);
        }

        //结果
        int total;
        int issue;

        //得到当天开始8点时间
        Date currentTimeForFttDay = DateUtils.toDate(DateUtils.getTimeByDateAndHour(calendar.getTime(), RUN_AT_HOUR));
        //今天早上8点，也理解为开始时间，2017/12/13 08:00:00
        Date beforeOneDayForFttDay = currentTimeForFttDay;
        //今天时间段为今天早点8点到明天早上8点，将currentTimeForFttDay置为明天早上8点，更新逻辑时间2018年5月10日15:52:48
        currentTimeForFttDay = DateUtils.toDate(DateUtils.getBackDayTime(beforeOneDayForFttDay, -1));

        int currentYearForFttDay = currentYear;
        //2017
        int currentMonthForFttDay = currentMonth;
        //12
        int currentDayForFttDay = currentDay;
        //14
        for (; currentTimeForFttDay.getTime() > earliestDate.getTime(); ) {
            //设置条件
            conditions.put("datestart", beforeOneDayForFttDay);
            conditions.put("dateend", currentTimeForFttDay);
            conditions.put("isenable", 1);

            //日没有开始时间和结束时间，创建时间即为定位
            conditions.put("datecreated", beforeOneDayForFttDay);
            for (MqsStationEntity station : stations) {
                //conditions.put("productionDept", station.getProductiondeptname());
                //conditions.put("region", station.getRegionname());
                //conditions.put("plinename", station.getProductionlinename());
                conditions.put("stationName", station.getStationname());
                conditions.put("mesStationId", station.getMesStationid());
                conditions.put("pstation", station.getStationname());

                //检测是否存在该信息
                int isHereFttDay = mqsFttReportService.queryFttDayReportByConditions(conditions);
                if (isHereFttDay == 1 && !(currentYear == currentYearForFttDay && currentMonth == currentMonthForFttDay && (currentDay == currentDayForFttDay || currentDay - 1 == currentDayForFttDay))) {
                    System.out.println("当前日数据已存在，已退出本次循环，时间：" + DateUtils.formatT(beforeOneDayForFttDay));

                    continue;
                } else if (isHereFttDay == 1 && (currentYear == currentYearForFttDay && currentMonth == currentMonthForFttDay && (currentDay == currentDayForFttDay || currentDay - 1 == currentDayForFttDay))) {
                    System.out.println("检测到存在当前日不完整数据，执行删除重写操作");
                    System.out.println(mqsFttReportService.deleteFttDayQuantity(conditions) == 0 ? "删除失败" : "删除成功！");
                }

                //计算
                total = mqsIssueService.queryQuantityByCondition(conditions);
                issue = mqsIssueService.queryFttIssueByCondition(conditions);

                if (total < issue) {
                    System.out.println("样本数不应该比问题数少！");

                    //mqsIssueService.updateIssueByMap(conditions);
                    //mqsIssueService.updateProductionByMap(conditions);
                }

                mqsFttDayReport.setDayftt((total == 0 || total < issue) ? 0.00 : (double) (total - issue) * 100 / (double) total);
                //创建时间
                mqsFttDayReport.setDatecreated(beforeOneDayForFttDay);
                //采集点
                mqsFttDayReport.setPstation(station.getStationname());

                //mqsFttDayReport.setPlinename(station.getProductionlinename());

                //mqsFttDayReport.setPregion(station.getRegionname());

                //mqsFttDayReport.setPworkshop(station.getProductiondeptname());

                mqsFttDayReport.setHavedata((total == 0 || total < issue) ? 0 : 1);

                mqsFttDayReport.setSample(total);

                mqsFttDayReport.setIssue(issue);

                System.out.println(this.mqsFttReportService.insertFttDayReport(mqsFttDayReport) == 0 ? "日FTT写入失败!" : "日FTT写入成功!");
                System.out.println("信息为：" + mqsFttDayReport);
            }
            //倒推一天
            currentTimeForFttDay = beforeOneDayForFttDay;
            beforeOneDayForFttDay = DateUtils.toDate(DateUtils.getBackDayTime(currentTimeForFttDay, 1));

            calendar.setTime(currentTimeForFttDay);

            currentYearForFttDay = calendar.get(Calendar.YEAR);
            //2017
            currentMonthForFttDay = calendar.get(Calendar.MONTH) + 1;
            //12
            currentDayForFttDay = calendar.get(Calendar.DATE);
            //13
        }

        long endTime = System.currentTimeMillis();
        float seconds = (endTime - startTime) / 1000F;
        String re = DateUtils.formatT(new Date()) + " 本次执行花费了：" + Float.toString(seconds) + "秒";

        this.runFttYearReport(new Object());
        this.runFttMonthReport(new Object());
        this.runFttWeekReport(new Object());

        System.out.println("\n" + re + "\n");

        return R.ok().put("re", re);
    }

    //健康表导出
    @SysLog("导出Ftt健康表")
    @RequestMapping("exportFttHealth")
    public void exportFttHealth(HttpServletRequest request, HttpServletResponse response) {
        //获取数据
        HttpSession session = request.getSession();
        Object object = session.getAttribute("fttHealth");
        List<FTTTableEntity> dataList;
        String[] dateList;
        if (object instanceof Map) {
            //获取时间列表
            dateList = (String[]) ((Map) object).get("dayList");
            //获取数据列表
            dataList = (List<FTTTableEntity>) ((Map) object).get("fttTable1");
        } else {
            //返回文本错误信息...m
            return;
        }

        //创建工作簿
        HSSFWorkbook workbook = new HSSFWorkbook();
        //创建工作表
        HSSFSheet sheet = workbook.createSheet("sheet1");
        //获取表头样式
        HSSFCellStyle columnHeadStyle = this.getHeadStyleForExcle(workbook);
        //设置第一行宽度
        sheet.setColumnWidth(1, 6000);

        //获取所有字段
        Field[] fs = FTTTableEntity.class.getDeclaredFields();
        Method[] methods = new Method[33];//存储字段的get方法
        for (int i = 0; i < methods.length; i++) {
            try {
                methods[i] = FTTTableEntity.class.getDeclaredMethod("get" + (
                        new StringBuilder()).append(Character.toUpperCase(fs[i].getName().charAt(0))).append(fs[i].getName().substring(1)).toString());
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            }
        }

        //将数据写入excle
        HSSFRow[] row = new HSSFRow[dataList.size() + 2];
        row[0] = sheet.createRow(1);
        row[0].setHeight((short) 500);

        //设置合并单元格
        CellRangeAddress cra1 = new CellRangeAddress(1, 2, 1, 1);
        CellRangeAddress cra2 = new CellRangeAddress(1, 1, 2, 3);
        CellRangeAddress cra3 = new CellRangeAddress(1, 1, 4, 6);
        CellRangeAddress cra4 = new CellRangeAddress(1, 1, 7, 12);
        CellRangeAddress cra5 = new CellRangeAddress(1, 1, 13, 33);

        //在sheet里增加合并单元格
        sheet.addMergedRegion(cra1);
        setBorderStyle(HSSFCellStyle.BORDER_THIN, cra1, sheet, workbook);

        sheet.addMergedRegion(cra2);
        setBorderStyle(HSSFCellStyle.BORDER_THIN, cra2, sheet, workbook);

        sheet.addMergedRegion(cra3);
        setBorderStyle(HSSFCellStyle.BORDER_THIN, cra3, sheet, workbook);

        sheet.addMergedRegion(cra4);
        setBorderStyle(HSSFCellStyle.BORDER_THIN, cra4, sheet, workbook);

        sheet.addMergedRegion(cra5);
        setBorderStyle(HSSFCellStyle.BORDER_THIN, cra5, sheet, workbook);

        String[] row1Title = new String[]{"", "Year", "Month", "Week", "Day"};
        int[] colLocation = {1, 2, 4, 7, 13};//标题的首个单元格位置
        //循环通过位置设置标题
        for (int i = 0; i < 5; i++) {
            HSSFCell cell = row[0].createCell(colLocation[i]);
            cell.setCellValue(new HSSFRichTextString(row1Title[i]));
            cell.setCellStyle(columnHeadStyle);
        }

        row[1] = sheet.createRow(2);
        row[1].setHeight((short) 500);
        HSSFCell[] headerCell1 = new HSSFCell[33];

        HSSFCell hssfCell = row[1].createCell(1);
        hssfCell.setCellStyle(columnHeadStyle);//设置第二个位置的边框
        //将时间写入表头
        for (int col = 1; col < 33; col++) {
            headerCell1[col] = row[1].createCell(col + 1);
            headerCell1[col].setCellValue(new HSSFRichTextString(dateList[col - 1]));
            headerCell1[col].setCellStyle(columnHeadStyle);
        }

        for (int dataRow = 0; dataRow < dataList.size(); dataRow++) {
            FTTTableEntity fttTableEntity = dataList.get(dataRow);

            //创建行
            row[dataRow + 2] = sheet.createRow(3 + dataRow);
            for (int col = 0; col < 33; col++) {
                try {
                    headerCell1[col] = row[dataRow + 2].createCell(col + 1);
                    //顺序执行get方法
                    headerCell1[col].setCellValue(new HSSFRichTextString((String) methods[col].invoke(fttTableEntity)));
                    headerCell1[col].setCellStyle(columnHeadStyle);
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                }
            }
        }

        sheet.setGridsPrinted(false);
        HSSFFooter footer = sheet.getFooter();
        footer.setRight("page" + HeaderFooter.page() + "of" + HeaderFooter.numPages());

        */
/**
         * 转换excle
         *//*

        BufferedOutputStream buff = null;
        ServletOutputStream outSTr = null;
        try {
            response.setContentType("text/plain");
            response.addHeader("Content-Disposition",
                    "attachment;filename=" + URLEncoder.encode("Ftt健康表_" + DateUtils.format(new Date(), "yyyy年MM月dd日 HH时mm分ss秒") + ".xls", "UTF-8").replaceAll("\\+", "%20"));
            outSTr = response.getOutputStream();
            buff = new BufferedOutputStream(outSTr);
            System.out.println(DateUtils.format(new Date(), "yyyy年MM月dd日 HH时mm分ss秒"));
            workbook.write(buff);
            buff.flush();
            buff.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                buff.close();
                outSTr.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    //ftt导出信息
    @SysLog("导出Ftt趋势")
    @RequestMapping("exportFtt")
    public void exportFtt(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        //获取session中保存的上次查询的ftt值
        Object[] objects = new Object[8];
        objects[0] = session.getAttribute("fttValue");
        objects[1] = session.getAttribute("SValue");
        objects[2] = session.getAttribute("AValue");
        objects[3] = session.getAttribute("BValue");
        objects[4] = session.getAttribute("CValue");
        objects[5] = session.getAttribute("dayValue");
        objects[6] = session.getAttribute("monthValue");
        objects[7] = session.getAttribute("yearValue");

        List[] tableArr = new ArrayList[8];

        for (int i = 0; i < 8; i++) {
            if (objects[i] instanceof Map) {
                tableArr[i] = (List) (((Map<String, Object>) objects[i]).get("fttTable1"));
            } else if (objects[i] instanceof List) {
                tableArr[i] = (List) objects[i];
            } else {
                //以流的形式返回错误信息
                return;
            }
        }

        String imageData = request.getParameter("imageData");

        String[] dayList = (String[]) ((Map<String, Object>) objects[0]).get("dayList");

        //获取所有字段
        Field[] fs = FTTTableEntity.class.getDeclaredFields();
        Method[] methods = new Method[33];//存储字段的get方法
        for (int i = 0; i < methods.length; i++) {
            try {
                methods[i] = FTTTableEntity.class.getDeclaredMethod("get" + (
                        new StringBuilder()).append(Character.toUpperCase(fs[i].getName().charAt(0))).append(fs[i].getName().substring(1)).toString());
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            }
        }

        */
/**
         * 开始处理数据
         *//*

        //创建工作簿
        HSSFWorkbook workbook = new HSSFWorkbook();
        //创建工作表
        HSSFSheet sheet = workbook.createSheet("sheet1");
        //获取表头样式
        HSSFCellStyle columnHeadStyle = this.getHeadStyleForExcle(workbook);
        //设置第一行宽度
        sheet.setColumnWidth(1, 8000);

        //解析图片
        BASE64Decoder decoder = new BASE64Decoder();
        String[] arr = imageData.split("base64,");//arr[0]：'base64,',arr[1]:'adsa12d12d...'图片数据
        byte[] buffer;//字符图片数据转字节

        try {
            buffer = decoder.decodeBuffer(arr[1]);
            //添加图片数据到workbook
            int pictureIndex = workbook.addPicture(buffer, HSSFWorkbook.PICTURE_TYPE_JPEG);

            //画图准备
            HSSFCreationHelper helper = workbook.getCreationHelper();
            HSSFPatriarch patriarch = workbook.getSheet("sheet1").createDrawingPatriarch();

            HSSFClientAnchor clientAnchor = helper.createClientAnchor();

            //设置位置
            clientAnchor.setCol1(1);
            clientAnchor.setRow1(1);

            HSSFPicture picture = patriarch.createPicture(clientAnchor, pictureIndex);
            picture.resize();

        } catch (IOException e) {
            e.printStackTrace();
        }


        //共8个表，循环执行8次
        //每个表格的行数
        int[] tableRowNum = new int[]{5, 9, 9, 9, 9, 12, 12, 12};
        //
        int[] firstRowNum = new int[]{27, 34, 45, 56, 67, 78, 92, 106};
        int[] lastRowNum = new int[]{28, 35, 46, 57, 68, 79, 93, 107};
        String[] tableTitles = new String[]{"", "S类", "A类", "B类", "C类", "TOP10 ICCs-最近一天", "TOP10 ICCs-最近一月", "TOP10 ICCs-最近一年"};
        for (int tableNum = 0; tableNum < 8; tableNum++) {
            HSSFRow[] row = new HSSFRow[tableRowNum[tableNum]];
            row[0] = sheet.createRow(firstRowNum[tableNum]);
            row[0].setHeight((short) 500);

            //设置合并单元格
            CellRangeAddress cra1 = new CellRangeAddress(firstRowNum[tableNum], lastRowNum[tableNum], 1, 1);
            CellRangeAddress cra2 = new CellRangeAddress(firstRowNum[tableNum], firstRowNum[tableNum], 2, 3);
            CellRangeAddress cra3 = new CellRangeAddress(firstRowNum[tableNum], firstRowNum[tableNum], 4, 6);
            CellRangeAddress cra4 = new CellRangeAddress(firstRowNum[tableNum], firstRowNum[tableNum], 7, 12);
            CellRangeAddress cra5 = new CellRangeAddress(firstRowNum[tableNum], firstRowNum[tableNum], 13, 33);

            //在sheet里增加合并单元格
            sheet.addMergedRegion(cra1);
            setBorderStyle(HSSFCellStyle.BORDER_THIN, cra1, sheet, workbook);

            sheet.addMergedRegion(cra2);
            setBorderStyle(HSSFCellStyle.BORDER_THIN, cra2, sheet, workbook);

            sheet.addMergedRegion(cra3);
            setBorderStyle(HSSFCellStyle.BORDER_THIN, cra3, sheet, workbook);

            sheet.addMergedRegion(cra4);
            setBorderStyle(HSSFCellStyle.BORDER_THIN, cra4, sheet, workbook);

            sheet.addMergedRegion(cra5);
            setBorderStyle(HSSFCellStyle.BORDER_THIN, cra5, sheet, workbook);

            String[] row1Title = new String[]{tableTitles[tableNum], "Year", "Month", "Week", "Day"};
            int[] colLocation = {1, 2, 4, 7, 13};//标题的首个单元格位置
            //循环通过位置设置标题
            for (int i = 0; i < 5; i++) {
                HSSFCell cell = row[0].createCell(colLocation[i]);
                cell.setCellValue(new HSSFRichTextString(row1Title[i]));
                cell.setCellStyle(columnHeadStyle);
            }

            row[1] = sheet.createRow(lastRowNum[tableNum]);
            row[1].setHeight((short) 500);
            HSSFCell[] headerCell1 = new HSSFCell[33];

            HSSFCell hssfCell = row[1].createCell(1);
            hssfCell.setCellStyle(columnHeadStyle);//设置第二个位置的边框
            //将时间写入表头
            for (int col = 1; col < 33; col++) {
                headerCell1[col] = row[1].createCell(col + 1);
                headerCell1[col].setCellValue(new HSSFRichTextString(dayList[col - 1]));
                headerCell1[col].setCellStyle(columnHeadStyle);
            }

            //将表数据写入
            //ftt表格---开始行28行（1开始的行），结束行32行（包含）
            for (int dataRow = 0; dataRow < tableArr[tableNum].size(); dataRow++) {
                FTTTableEntity fttTableEntity = (FTTTableEntity) tableArr[tableNum].get(dataRow);

                //创建行
                row[dataRow + 2] = sheet.createRow(firstRowNum[tableNum] + 2 + dataRow);
                for (int col = 0; col < 33; col++) {
                    try {
                        headerCell1[col] = row[dataRow + 2].createCell(col + 1);
                        //顺序执行get方法
                        headerCell1[col].setCellValue(new HSSFRichTextString((String) methods[col].invoke(fttTableEntity)));
                        headerCell1[col].setCellStyle(columnHeadStyle);
                    } catch (IllegalAccessException e) {
                        e.printStackTrace();
                    } catch (InvocationTargetException e) {
                        e.printStackTrace();
                    }
                }
            }
        }


        sheet.setGridsPrinted(false);
        HSSFFooter footer = sheet.getFooter();
        footer.setRight("page" + HeaderFooter.page() + "of" + HeaderFooter.numPages());

        */
/**
         * 转换excle
         *//*

        BufferedOutputStream buff = null;
        ServletOutputStream outSTr = null;
        try {
            response.setContentType("text/plain");
            response.addHeader("Content-Disposition",
                    "attachment;filename=" + URLEncoder.encode("Ftt趋势_" + DateUtils.format(new Date(), "yyyy年MM月dd日 HH时mm分ss秒") + ".xls", "UTF-8").replaceAll("\\+", "%20"));
            outSTr = response.getOutputStream();
            buff = new BufferedOutputStream(outSTr);
            workbook.write(buff);
            buff.flush();
            buff.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                buff.close();
                outSTr.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    //设置单元格边框样式
    public void setBorderStyle(int border, CellRangeAddress region, HSSFSheet sheet, HSSFWorkbook wb) {
        RegionUtil.setBorderBottom(border, region, sheet, wb);   //下边框
        RegionUtil.setBorderLeft(border, region, sheet, wb);     //左边框
        RegionUtil.setBorderRight(border, region, sheet, wb);    //右边框
        RegionUtil.setBorderTop(border, region, sheet, wb);      //上边框
    }

    //获取表头格式，C1000也需要使用该方法，但是不知道这类型的公共方法应该放在什么文件夹下，所以每个类里都有一个
    public HSSFCellStyle getHeadStyleForExcle(HSSFWorkbook workbook) {
        HSSFFont columnHeadFont = workbook.createFont();
        columnHeadFont.setFontName("微软雅黑");
        columnHeadFont.setFontHeightInPoints((short) 12);
        columnHeadFont.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
        // 列头的样式
        HSSFCellStyle columnHeadStyle = workbook.createCellStyle();
        columnHeadStyle.setFont(columnHeadFont);
        columnHeadStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 左右居中
        columnHeadStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 上下居中
        columnHeadStyle.setLocked(true);
        columnHeadStyle.setWrapText(true);
        columnHeadStyle.setTopBorderColor(HSSFColor.BLACK.index);
        columnHeadStyle.setBorderTop((short) 1);
        columnHeadStyle.setLeftBorderColor(HSSFColor.BLACK.index);// 左边框的颜色
        columnHeadStyle.setBorderLeft((short) 1);// 边框的大小
        columnHeadStyle.setRightBorderColor(HSSFColor.BLACK.index);// 右边框的颜色
        columnHeadStyle.setBorderRight((short) 1);// 边框的大小
        columnHeadStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN); // 设置单元格的边框为粗体
        columnHeadStyle.setBottomBorderColor(HSSFColor.BLACK.index); // 设置单元格的边框颜色

        // 背景色的设定
        columnHeadStyle.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
        columnHeadStyle.setFillBackgroundColor(HSSFColor.GREY_25_PERCENT.index);
        columnHeadStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);

        return columnHeadStyle;
    }

    //每小时的55分钟时刻执行一次0 55 * * * ?
    @Scheduled(cron = "0 55 * * * ? ")
    public void autoGenerateFtt() {
        logger.info("开始执行~");

        MqsFttLogEntity m = new MqsFttLogEntity();
        m.setLogId(UUID.randomUUID().toString());
        m.setCreatedBy("定时器0 55 * * * ? ");
        m.setCreatedTime(new Date());
        m.setLogContent("");
        m.setLogName("定时计算FTT");

        mqsFttLogService.save(m);
        this.runFttDayReport();
    }

    //内部类，临时使用
    class FTTTableEntity {
        String title;
        String year1;
        String year2;
        String month1;
        String month2;
        String month3;
        String week1;
        String week2;
        String week3;
        String week4;
        String week5;
        String week6;
        String days;
        String day1;
        String day2;
        String day3;
        String day4;
        String day5;
        String day6;
        String day7;
        String day8;
        String day9;
        String day10;
        String day11;
        String day12;
        String day13;
        String day14;
        String day15;
        String day16;
        String day17;
        String day18;
        String day19;
        String day20;

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getYear1() {
            return year1;
        }

        public void setYear1(String year) {
            this.year1 = year;
        }

        public String getYear2() {
            return year2;
        }

        public void setYear2(String year) {
            this.year2 = year;
        }

        public String getMonth1() {
            return month1;
        }

        public void setMonth1(String month1) {
            this.month1 = month1;
        }

        public String getMonth2() {
            return month2;
        }

        public void setMonth2(String month2) {
            this.month2 = month2;
        }

        public String getMonth3() {
            return month3;
        }

        public void setMonth3(String month3) {
            this.month3 = month3;
        }

        public String getWeek1() {
            return week1;
        }

        public void setWeek1(String week1) {
            this.week1 = week1;
        }

        public String getWeek2() {
            return week2;
        }

        public void setWeek2(String week2) {
            this.week2 = week2;
        }

        public String getWeek3() {
            return week3;
        }

        public void setWeek3(String week3) {
            this.week3 = week3;
        }

        public String getWeek4() {
            return week4;
        }

        public void setWeek4(String week4) {
            this.week4 = week4;
        }

        public String getWeek5() {
            return week5;
        }

        public void setWeek5(String week5) {
            this.week5 = week5;
        }

        public String getWeek6() {
            return week6;
        }

        public void setWeek6(String week6) {
            this.week6 = week6;
        }

        public String getDays() {
            return days;
        }

        public void setDays(String days) {
            this.days = days;
        }

        public String getDay1() {
            return day1;
        }

        public void setDay1(String day1) {
            this.day1 = day1;
        }

        public String getDay2() {
            return day2;
        }

        public void setDay2(String day2) {
            this.day2 = day2;
        }

        public String getDay3() {
            return day3;
        }

        public void setDay3(String day3) {
            this.day3 = day3;
        }

        public String getDay4() {
            return day4;
        }

        public void setDay4(String day4) {
            this.day4 = day4;
        }

        public String getDay5() {
            return day5;
        }

        public void setDay5(String day5) {
            this.day5 = day5;
        }

        public String getDay6() {
            return day6;
        }

        public void setDay6(String day6) {
            this.day6 = day6;
        }

        public String getDay7() {
            return day7;
        }

        public void setDay7(String day7) {
            this.day7 = day7;
        }

        public String getDay8() {
            return day8;
        }

        public void setDay8(String day8) {
            this.day8 = day8;
        }

        public String getDay9() {
            return day9;
        }

        public void setDay9(String day9) {
            this.day9 = day9;
        }

        public String getDay10() {
            return day10;
        }

        public void setDay10(String day10) {
            this.day10 = day10;
        }

        public String getDay11() {
            return day11;
        }

        public void setDay11(String day11) {
            this.day11 = day11;
        }

        public String getDay12() {
            return day12;
        }

        public void setDay12(String day12) {
            this.day12 = day12;
        }

        public String getDay13() {
            return day13;
        }

        public void setDay13(String day13) {
            this.day13 = day13;
        }

        public String getDay14() {
            return day14;
        }

        public void setDay14(String day14) {
            this.day14 = day14;
        }

        public String getDay15() {
            return day15;
        }

        public void setDay15(String day15) {
            this.day15 = day15;
        }

        public String getDay16() {
            return day16;
        }

        public void setDay16(String day16) {
            this.day16 = day16;
        }

        public String getDay17() {
            return day17;
        }

        public void setDay17(String day17) {
            this.day17 = day17;
        }

        public String getDay18() {
            return day18;
        }

        public void setDay18(String day18) {
            this.day18 = day18;
        }

        public String getDay19() {
            return day19;
        }

        public void setDay19(String day19) {
            this.day19 = day19;
        }

        public String getDay20() {
            return day20;
        }

        public void setDay20(String day20) {
            this.day20 = day20;
        }
    }
}
*/
