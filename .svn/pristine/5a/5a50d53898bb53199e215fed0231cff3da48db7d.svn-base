package io.jeasyframework.utils;

import org.junit.Test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期处理
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年12月21日 下午12:53:33
 */

/**
 * 更新内容
 * 1、获取指定年最开始时间
 * 2、获取指定年最后时间
 * 3、获取指定月开始时间
 * 4、获取指定月结束时间
 * 5、获取指定日开始时间
 * 6、获取指定日结束时间
 * 7、获取指定小时时间
 * 8、获取按数倒推第几周时间
 * 9、获取指定月指定周时间
 * 10、String转date
 * 11、date转String
 * 12、以“yyyy-MM-dd HH:mm:ss”格式化时间
 * <p>
 * 2017年12月18日16:08:06新增
 * 13、按月倒推时间
 * 14、按年倒推时间
 * 15、获取指定日期的某个小时
 * 16、获取指定月的天数
 *
 * @author zhoubangfu
 * @date 2017年12月18日 16:00:38
 * @email zbfcqtl@163.com
 */

public class DateUtils {
    public final static String FORMAT_DATE_DEFAULT = "yyyy-MM-dd";
    /**
     * 时间格式(yyyy-MM-dd)
     */
    public final static String DATE_PATTERN = "yyyy-MM-dd";
    /**
     * 时间格式(yyyy-MM-dd HH:mm:ss)
     */
    public final static String DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss";
    static Calendar c = Calendar.getInstance();

    /**
     * 旧版本开始
     */

    /**
     * 以yyyy-MM-dd格式格式化
     */
    public static String format(Date date) {
        return format(date, DATE_PATTERN);
    }

    /**
     * 以自己的格式格式化
     */
    public static String format(Date date, String pattern) {
        if (date != null) {
            SimpleDateFormat df = new SimpleDateFormat(pattern);
            return df.format(date);
        }
        return null;
    }

    /**
     * Returns current system date as formatted string value with default format
     * pattern.
     *
     * @return current system date.
     * @see #FORMAT_DATE_DEFAULT
     */
    public final static String getCurrentDateAsString() {
        return getCurrentDateAsString(FORMAT_DATE_DEFAULT);
    }

    /**
     * Returns current system date as formatted string value with given format
     * pattern.
     *
     * @param formatPattern format pattern.
     * @return current system date.
     */
    public final static String getCurrentDateAsString(String formatPattern) {
        Date date = getCurrentDate();
        return format(date, formatPattern);
    }

    public final static Date getCurrentDate() {
        return Calendar.getInstance().getTime();
    }
    /**
     * 旧版本结束
     */

    /**
     * 以yyyy-MM-dd HH:mm:ss格式格式化
     */
    public static String formatT(Date date) {
        return format(date, DATE_TIME_PATTERN);
    }

    /**
     * 将String转换成date
     */
    public static Date toDate(String stringDate) {
        try {
            return new SimpleDateFormat(DATE_TIME_PATTERN).parse(stringDate);
        } catch (ParseException e) {
            System.out.println("字符串转换时间出错！2222");
            e.printStackTrace();
        }
        return null;
    }


    /**
     * 将String转换成date  yyyy_MM_dd
     */
    public static Date toDateymd(String stringDate) {
        try {
            return new SimpleDateFormat(DATE_PATTERN).parse(stringDate);
        } catch (ParseException e) {
            System.out.println("字符串转换时间出错！2222");
            e.printStackTrace();
        }
        return null;
    }


    /**
     * 获取指定年开始时间
     */
    public static String getStartTimeByYear(int year) {
        c.clear();
        c.set(Calendar.YEAR, year);
        return formatT(c.getTime());
    }

    /**
     * 获取指定年结束时间
     */
    public static String getEndTimeByYear(int year) {
        //清空Calendar时间
        c.clear();
        //设置时间为下一年的开始
        c.set(Calendar.YEAR, year + 1);
        //倒推一秒
        c.setTimeInMillis(c.getTimeInMillis() - 1);
        return formatT(c.getTime());
    }

    /**
     * 获取指定月开始时间
     * 参数year：2017->2017年
     * 参数month：8->8月份
     */
    public static String getStartTimeByMonth(int year, int month) {
        c.clear();
        c.set(Calendar.YEAR, year);
        c.set(Calendar.MONTH, month - 1);
        return formatT(c.getTime());
    }

    /**
     * 获取指定月结束时间
     * 参数year：2017->2017年
     * 参数month：8->8月份
     */

    public static String getEndTimeByMonth(int year, int month) {
        c.clear();
        c.set(Calendar.YEAR, year);
        c.set(Calendar.MONTH, month);
        c.setTimeInMillis(c.getTimeInMillis() - 1);
        return formatT(c.getTime());
    }

    /**
     * 获取指定日开始时间
     * 参数year：2017->2017年
     * 参数month：8->8月份
     * 参数day：23->23号
     */
    public static String getStartTimeByDay(int year, int month, int day) {
        c.clear();
        c.set(Calendar.YEAR, year);
        c.set(Calendar.MONTH, month - 1);
        c.set(Calendar.DATE, day);
        return formatT(c.getTime());
    }

    /**
     * 获取指定日结束时间
     * 参数year：2017->2017年
     * 参数month：8->8月份
     * 参数day：23->23号
     */
    public static String getEndTimeByDay(int year, int month, int day) {
        c.clear();
        c.setTimeInMillis(toDate(getStartTimeByDay(year, month, day + 1)).getTime() - 1);
        return formatT(c.getTime());
    }

    /**
     * 获取指定小时
     * 参数year：2017->2017年
     * 参数month：8->8月份
     * 参数day：23->23号
     * 参数hour：7->7点
     */
    public static String getStartTimeByHour(int year, int month, int day, int hour) {
        c.clear();
        c.set(Calendar.YEAR, year);
        c.set(Calendar.MONTH, month - 1);
        c.set(Calendar.DATE, day);
        c.set(Calendar.HOUR, hour);
        return formatT(c.getTime());
    }

    /**
     * 按年倒推时间
     * 参数date:
     * 参数：backNumber：倒推年个数，4->倒推4年
     */
    public static String getBackYearTime(Date date, int backNumber) {
        c.setTime(date);
        c.set(Calendar.YEAR, c.get(Calendar.YEAR) - backNumber);
        return formatT(c.getTime());
    }

    /**
     * 按月倒推时间
     * 参数date:
     * 参数：backNumber：倒推月个数，4->倒推4个月
     * <p>
     * 更新时间：2018年1月31日11:39:23
     * 更新人：周帮福
     * 更新内容：修复当当前时间为31号，目标月小于31等情况的bug
     */
    public static String getBackMonthTime(Date date, int backNumber) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        int targetMonthDays = getDayNumByMonth(c.get(Calendar.YEAR), c.get(Calendar.MONTH) - backNumber);
        if (c.get(Calendar.DATE) > targetMonthDays)
            c.set(Calendar.DATE, targetMonthDays);

        c.set(Calendar.MONTH, c.get(Calendar.MONTH) - backNumber);
        return formatT(c.getTime());
    }


    /**
     * 按月倒推时间
     * 参数date:
     * 参数：backNumber：倒推月个数，4->倒推4个月
     */
    public static Calendar getBackMonthTimeRC(Date date, int backNumber) {
        c.setTime(date);
        c.set(Calendar.MONTH, c.get(Calendar.MONTH) - backNumber);
        return c;

    }


    /**
     * 按周倒推时间
     * 参数backNumber：倒推周数 0-不动，负数正退，7天为一周
     */
    public static String getBackWeekTime(Date date, int backNumber) {
        c.setTime(date);
        c.set(Calendar.DATE, c.get(Calendar.DATE) - 7 * backNumber);
        return formatT(c.getTime());
    }

    /**
     * 获取指定月的指定周开始时间
     * 参数year：2017->2017年，类推
     * 参数month：1->1月，类推
     * 参数targetWeek：1->第一周，类推
     */
    public static String getMonthTargetWeekStartTime(int year, int month, int targetWeek) {
        c.clear();
        c.set(Calendar.YEAR, year);
        c.set(Calendar.MONTH, month - 1);
        c.set(Calendar.DATE, 1 + (targetWeek - 1) * 7);
        return formatT(c.getTime());
    }

    /**
     * 按日倒推时间
     * 参数backNumber：倒推日数 0-不动
     */
    public static String getBackDayTime(Date date, int backNumber) {
        c.setTime(date);
        c.set(Calendar.DATE, c.get(Calendar.DATE) - backNumber);
        return formatT(c.getTime());
    }

    /**
     * 按日倒推时间
     * 参数backNumber：倒推日数 0-不动
     */
    public static String getBackDayymdTime(String strdate, int backNumber) {
        Date date = toDateymd(strdate);
        c.setTime(date);
        c.set(Calendar.DATE, c.get(Calendar.DATE) - backNumber);
        return format(c.getTime());
    }

    /**
     * 向前推几天月加日期
     */
    public static String getBackDayTimeMD(Date date, int backday) {
        String aa = DateUtils.getBackDayTime(date, backday);

        int month = Integer.parseInt(aa.substring(aa.indexOf("-") + 1, aa.indexOf("-") + 3));
        int day = Integer.parseInt(aa.substring(aa.indexOf("-") + 4, aa.indexOf("-") + 6));
        return month + "/" + day;
    }

    /**
     * 按日倒推时间
     * 参数backNumber：倒推日数 0-不动
     */
    public static Calendar getBackDayTimeRC(Date date, int backNumber) {
        c.setTime(date);
        c.set(Calendar.DATE, c.get(Calendar.DATE) - backNumber);
        return c;
    }

    /**
     * 获取指定日期的某个小时
     */
    public static String getTimeByDateAndHour(Date date, int hour) {
        try {
            c.setTime(new SimpleDateFormat(DATE_PATTERN).parse(DateUtils.format(date)));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        c.set(Calendar.HOUR, hour);
        return formatT(c.getTime());
    }

    /**
     * 获取指定月的天数
     */
    public static int getDayNumByMonth(int year, int month) {
        c.clear();
        c.set(Calendar.YEAR, year);
        c.set(Calendar.MONTH, month + 1);
        c.setTimeInMillis(c.getTimeInMillis() - 1);

        return c.get(Calendar.DATE);
    }

    /**
     * 获取某年第一天日期
     *
     * @param
     * @return Date
     */
    public static String beforeDay(Date date, int before) {
        c.setTime(date);
        c.set(Calendar.DATE, c.get(Calendar.DATE) - before);
        return format(c.getTime(), "MM/dd");
    }

    /*
     *得到当前的向前推的月数（只有月：03）
     */
    public static String beforeMonth(Date date, int before) {
        c.setTime(date);
        c.set(Calendar.MONTH, c.get(Calendar.MONTH) - before);
        return format(c.getTime(), "MM");
    }

    public static Date getYearFirst(int year) {
        c.clear();
        c.set(Calendar.YEAR, year);
        Date currYearFirst = c.getTime();
        return currYearFirst;
    }

    /**
     * 获取某年最后一天日期
     *
     * @param year 年份
     * @return Date
     */
    public static Date getYearLast(int year) {
        c.clear();
        c.set(Calendar.YEAR, year);
        c.roll(Calendar.DAY_OF_YEAR, -1);
        Date currYearLast = c.getTime();

        return currYearLast;
    }


    /**
     * 获取传入时间的年
     *
     * @param date string类型yyyy-mm-dd hh-mi-ss格式的字符串
     * @return int类型year 传入时间的年份
     */
    public static Integer getYear(String date) {
        int year = Integer.parseInt(date.substring(0, date.indexOf("-")));
        return year;
    }

    /**
     * 获取传入时间的月
     *
     * @param date string类型yyyy-mm-dd hh-mi-ss格式的字符串
     * @return int类型month 传入时间的月份
     */
    public static Integer getMonth(String date) {
        int month = Integer.parseInt(date.substring(date.indexOf("-") + 1, date.indexOf("-") + 3));
        return month;
    }

    /**
     * 获取传入时间的日期
     *
     * @param date string类型yyyy-mm-dd hh-mi-ss格式的字符串
     * @return int类型day 传入时间的日期
     */
    public static Integer getDay(String date) {
        int day = Integer.parseInt(date.substring(date.indexOf("-") + 4, date.indexOf("-") + 6));
        return day;
    }

    /**
     * 向前推几周的上周五的月加日期
     */
    public static String getMonthAndDay(Date date, int week) {
        String date1 = DateUtils.formatT(DateUtils.lastFirday(DateUtils.toDate(DateUtils.getBackWeekTime(date, week))));
        int month = Integer.parseInt(date1.substring(date1.indexOf("-") + 1, date1.indexOf("-") + 3));
        int day = Integer.parseInt(date1.substring(date1.indexOf("-") + 4, date1.indexOf("-") + 6));
        return month + "/" + day;
    }

    /**
     * 向前推几年的年份
     */
    public static Integer getBackYear(Date date, int year) {
        int backyear = DateUtils.getYear(DateUtils.getBackYearTime(date, year));
        return backyear;
    }

    /**
     * 向前推几个月的月份
     */
    public static Integer getBackMonth(Date date, int month) {
        int backmonth = DateUtils.getMonth(DateUtils.getBackMonthTime(date, month));
        return backmonth;
    }

    /**
     * 获取上周五的时间
     */
    public static Date lastFirday(Date date) {
        c.setTime(date);
        //作用防止周日得到本周日期
        while (c.get(Calendar.DAY_OF_WEEK) != Calendar.MONDAY) {
            c.add(Calendar.DAY_OF_WEEK, -1);
        }
        int dayOfWeek = c.get(Calendar.DAY_OF_WEEK) - 1;
        int offset = 7 - dayOfWeek;
        c.add(Calendar.DATE, offset - 9);

        return DateUtils.getFirstDayOfWeek(c.getTime(), 6);//这是从上周日开始数的到本周五为6

    }

    /**
     * 得到某一天的该星期的第一日 00:00:00
     *
     * @param date
     * @param firstDayOfWeek 一个星期的第一天为星期几
     * @return
     */
    public static Date getFirstDayOfWeek(Date date, int firstDayOfWeek) {
        if (date != null)
            c.setTime(date);
        c.setFirstDayOfWeek(firstDayOfWeek);//设置一星期的第一天是哪一天
        c.set(Calendar.DAY_OF_WEEK, firstDayOfWeek);//指示一个星期中的某天
        c.set(Calendar.HOUR_OF_DAY, 0);//指示一天中的小时。HOUR_OF_DAY 用于 24 小时制时钟。例如，在 10:04:15.250 PM 这一时刻，HOUR_OF_DAY 为 22。
        c.set(Calendar.MINUTE, 0);//指示一小时中的分钟。例如，在 10:04:15.250 PM 这一时刻，MINUTE 为 4。
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
        return c.getTime();
    }

    /**
     * 获取某一天向前推一秒
     */
    public static String getLastDay(Date date) {
        c.setTime(date);
        c.setTimeInMillis(c.getTimeInMillis() - 1);
        return formatT(c.getTime());
    }


    /**
     * 获取当前时间向前推几个月的月份的第一天
     */
    public static String getFirstMonthDay(Date date, int month) {
        String monthfirstday = DateUtils.getStartTimeByMonth(DateUtils.getYear(DateUtils.getBackMonthTime(date, month)), DateUtils.getMonth(DateUtils.getBackMonthTime(date, month)));
        return monthfirstday;
    }


    /**
     * 获取当前时间向前推几个月的月份
     */
    public static String getMonth(Date date, int month) {
        String monthendday = DateUtils.getEndTimeByMonth(DateUtils.getYear(DateUtils.getBackMonthTime(date, month)), DateUtils.getMonth(DateUtils.getBackMonthTime(date, month)));
        return monthendday;
    }


    /**
     * 获取当前时间向前推几个月的月份的最后一天
     */
    public static String getEndMonthDay(Date date, int month) {
        String monthendday = DateUtils.getEndTimeByMonth(DateUtils.getYear(DateUtils.getBackMonthTime(date, month)), DateUtils.getMonth(DateUtils.getBackMonthTime(date, month)));
        return monthendday;
    }

    /**
     * 获取当前时间向前推几年的年份的第一天
     */
    public static String getFirstYearDay(Date date, int year) {
        String yearfirstday = DateUtils.getStartTimeByYear(DateUtils.getYear(DateUtils.getBackYearTime(date, year)));
        return yearfirstday;
    }

    /**
     * 获取当前时间向前推几年的年份的最后一天
     */
    public static String getEndYearDay(Date date, int year) {
        String yearendday = DateUtils.getEndTimeByYear(DateUtils.getYear(DateUtils.getBackYearTime(date, year)));
        return yearendday;
    }

    /*
     * 获取n年前年份的第一天
     * */
    public static String getStringYearBegin(String dateStr, int n) {

        try {
            Date date = new SimpleDateFormat(DATE_PATTERN).parse(dateStr);
            Integer year = new Integer(format(date, "yyyy"));
            String yearbegin = format(getYearFirst(year - n), "yyyy-MM-dd");
            return yearbegin;
        } catch (ParseException e) {
            System.out.println("字符串转换时间出错！2222");
            e.printStackTrace();
        }
        return null;
    }

    /*
     * 获取n年后的最后一天
     * */
    public static String getStringYearEnd(String strdate, int n) {
        try {
            Date date = new SimpleDateFormat(DATE_PATTERN).parse(strdate);
            Integer year = new Integer(format(date, "yyyy"));
            String yearend = format(getYearLast(year + n), "yyyy-MM-dd");
            return yearend;
        } catch (ParseException e) {
            System.out.println("字符串转换时间出错！111");
            e.printStackTrace();
        }
        return null;
    }

    /*获得前n个月的初试时间 格式yyyy-MM-dd*/
    public static String getBeforeMonth(String date, int num) {
        try {
            c.setTime(new SimpleDateFormat(DATE_PATTERN).parse(date));
            int beforeMonth = 1;
            int year = c.get(c.YEAR);
            int month = c.get(c.MONTH) + 1;
            if (month < num) {
                beforeMonth = 12 + month - num;
                year -= 1;
            } else {
                beforeMonth = month - num;
            }
            c.clear();
            c.set(Calendar.YEAR, year);
            c.set(Calendar.MONTH, beforeMonth - 1);
            return format(c.getTime());
        } catch (ParseException e) {
            System.out.println("字符串转换时间出错！111");
            e.printStackTrace();
        }
        return null;
    }

    /*获得后num个月的结束时间 格式yyyy-MM-dd*/
    public static String getAfterMonth(String date, int num) {
        try {
            c.setTime(new SimpleDateFormat(DATE_PATTERN).parse(date));
            int afterMonth = 12;
            int year = c.get(c.YEAR);
            int month = c.get(c.MONTH) + 1;
            if ((month + num) > 12) {
                afterMonth = month + num - 12;
                year += 1;
            } else {
                afterMonth = month + num;
            }
            c.clear();
            c.set(Calendar.YEAR, year);
            c.set(Calendar.MONTH, afterMonth);
            c.setTimeInMillis(c.getTimeInMillis() - 1);
            return format(c.getTime());
        } catch (ParseException e) {
            System.out.println("字符串转换时间出错！111");
            e.printStackTrace();
        }
        return null;
    }

    /*获取时间的月份值 格式yyyy-MM-dd*/
    public static Integer getMonthByString(String str) {
        try {
            c.setTime(new SimpleDateFormat(DATE_PATTERN).parse(str));
            int month = c.get(Calendar.MONTH) + 1;
            return month;
        } catch (ParseException e) {
            System.out.println("字符串转换时间出错！111");
            e.printStackTrace();
        }
        return null;

    }

    /*获取两个时间段的中间月数*/
    public static Integer getBetweenMonth(String begin, String end) {
        try {
            c.setTime(new SimpleDateFormat(DATE_PATTERN).parse(begin));
            int ybegin = c.get(Calendar.YEAR);
            int mbegin = c.get(c.MONTH);
            c.setTime(new SimpleDateFormat(DATE_PATTERN).parse(end));
            int yend = c.get(Calendar.YEAR);
            int mend = c.get(c.MONTH);
            return (yend - ybegin) * 12 + (mend - mbegin) + 1;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;

    }

    //倒推年个数，4->往后推4年  格式yyyy-MM-dd
    public static String getBackYearTime2(String strdate, int backNumber) {
        try {
            Date date = new SimpleDateFormat(DATE_PATTERN).parse(strdate);
            c.setTime(date);
            c.set(Calendar.YEAR, c.get(Calendar.YEAR) + backNumber);
            return format(c.getTime());
        } catch (ParseException e) {
            System.out.println("字符串转换时间出错！2222");
            e.printStackTrace();
        }
        return null;
    }


    /**
     * 获取向前推几周的周五的结束时间
     * week为0 时取得是上周五的,为1时取得是上上周五的,以此类推
     */
    public static String getFridayEndTime(Date date, int week) {
        Date friday = DateUtils.lastFirday(DateUtils.toDate(DateUtils.getBackWeekTime(date, week)));
        Date sat = DateUtils.toDate(DateUtils.getBackDayTime(friday, -1));
        String fridayendtime = DateUtils.getLastDay(sat);
        return fridayendtime;
    }

    /**
     * 获取向前推几周的周五的结束时间
     * week为0 时取得是上周五的,为1时取得是上上周五的,以此类推
     */
    public static String getSatStartTime(Date date, int week) {
        Date friday = DateUtils.lastFirday(DateUtils.toDate(DateUtils.getBackWeekTime(date, week)));
        String satstarttime = DateUtils.getBackDayTime(friday, -1);
        return satstarttime;
    }

    /**
     * 判断当前时间是否为周末
     */
    public static Boolean isWeekend(Date date) {
        c.setTime(date);
        if (c.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY || c.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY || c.get(Calendar.DAY_OF_WEEK) == Calendar.FRIDAY) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 将时间重置为当月1号
     *
     * @param dEndTime
     * @return
     */
    public static String getStartMonthTime(Date dEndTime) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(dEndTime);

        calendar.set(Calendar.DATE, 1);

        return DateUtils.formatT(calendar.getTime());
    }

    public static String getStartYearTime(Date dEndTime) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(dEndTime);

        calendar.set(Calendar.MONTH, 0);
        calendar.set(Calendar.DATE, 1);

        return DateUtils.formatT(calendar.getTime());
    }

    /**
     * 月总周数
     *
     * @param date
     * @return
     */
    public static int getWeekCount(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.setFirstDayOfWeek(Calendar.MONDAY);

        return calendar.getActualMaximum(Calendar.WEEK_OF_MONTH);
    }

    /**
     * 月总天数
     *
     * @param date
     * @return
     */
    public static int getDayCount(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        return calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
    }

    /**
     * 向前推月
     */
    public static Date getBackMonthDate(Date date, int month) {
        c.setTime(date);
        c.add(Calendar.MONTH,-month);
        return c.getTime();
    }


    @Test
    public void asdas() {
        System.out.println(DateUtils.getStartYearTime(new Date()));
    }


}
