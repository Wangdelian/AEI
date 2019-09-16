package io.jeasyframework.utils;

import io.jeasyframework.entity.DateCountEntity;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.util.CellRangeAddress;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * 创建人：周帮福
 * 时间：2018-1-18 11:36:58
 * email：zbfcqtl@163.com
 * 描述：导出excel表修改版，新增选择字段导出
 * 更新时间：2018-1-18 17:20:11
 * 版本：2018118003
 * 更新说明：
 * 2018118003，paramItemsName=null时，默认导出全部数据，此时excelHead标题写全
 * 测试代码：
 *
 * @RequestMapping("test") public void asdasd(HttpServletResponse response) {
 * SFUser sfUser = new SFUser();
 * <p>
 * sfUser.setUserEmail("zbfcqtl@163.com");
 * sfUser.setUserId(123l);
 * <p>
 * List<String> excelHead = new ArrayList<>();
 * excelHead.add("userId");
 * excelHead.add("userEmail");
 * <p>
 * List<SFUser> sfUsers = new ArrayList<>();
 * sfUsers.add(sfUser);
 * sfUsers.add(sfUser);
 * sfUsers.add(sfUser);
 * sfUsers.add(sfUser);
 * <p>
 * List<String> paramItemsName = new ArrayList<>();
 * paramItemsName.add("userId");
 * paramItemsName.add("userEmail");
 * <p>
 * List<Integer> excelWidth = new ArrayList<>();
 * excelWidth.add(4000);
 * excelWidth.add(8000);
 * <p>
 * HSSFWorkbook hssfWorkbook = export("测试", excelHead, excelWidth, paramItemsName, sfUsers, SFUser.class);
 * BufferedOutputStream buff = null;
 * ServletOutputStream outSTr = null;
 * <p>
 * try {
 * response.setContentType("text/plain");
 * response.addHeader("Content-Disposition",
 * "attachment;filename=" + URLEncoder.encode("兆欧表设备-.xls", "UTF-8"));
 * StringBuffer write = new StringBuffer();
 * <p>
 * outSTr = response.getOutputStream();// 建立
 * buff = new BufferedOutputStream(outSTr);
 * buff.write(write.toString().getBytes("UTF-8"));
 * hssfWorkbook.write(buff);
 * buff.flush();
 * buff.close();
 * } catch (Exception e) {
 * e.printStackTrace();
 * } finally {
 * try {
 * buff.close();
 * outSTr.close();
 * } catch (Exception e) {
 * e.printStackTrace();
 * }
 * }
 * }
 */

public class ExportExcel {
    /**
     * @param excelTitle     表格大标题
     * @param excelHead      表格的表头，与entity字段顺序相同
     * @param excelWidth     单元格宽度
     *                       定义每一个单元格宽度，存在list里
     *                       <p>
     *                       4000的宽度大概为'           '这么长
     *                       <p>
     * @param paramItemsName 需要导出的字段，与entity里的对应，如果为null，则导出全部字段信息（此时excelHead必须有全部字段的标题，否者会出现有些数据没有标题）
     * @param excelData      表格数据，List存的每一个entity数据
     * @param dataType       entity的class
     * @return
     */
    public static HSSFWorkbook export(String excelTitle, List excelHead, List<Integer> excelWidth, List<String> paramItemsName, List excelData, Class dataType) {
        if (excelTitle == null || excelHead == null || dataType == null)
            return null;

        if (excelHead.size() == 0)
            return null;

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet1 = workbook.createSheet("sheet1");

        //设置单元格宽度
        for (int i = 0; i < excelHead.size(); i++) {
            sheet1.setColumnWidth(i, excelWidth.get(i));
        }

        //处理数据开始
        /**
         * 处理表头及标题
         **/
        HSSFFont columnHeadFont = workbook.createFont();
        columnHeadFont.setFontName("宋体");
        columnHeadFont.setFontHeightInPoints((short) 10);
        columnHeadFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
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

        HSSFRow[] row = new HSSFRow[2];
        row[0] = sheet1.createRow(0);
        row[0].setHeight((short) 500);

        CellRangeAddress cra = new CellRangeAddress(0, 0, 0, excelHead.size() - 1);
        //在sheet里增加合并单元格
        sheet1.addMergedRegion(cra);
        HSSFCell cell = row[0].createCell(0);
        cell.setCellValue(new HSSFRichTextString(excelTitle));
        cell.setCellStyle(columnHeadStyle);


        row[1] = sheet1.createRow(1);
        row[1].setHeight((short) 500);
        HSSFCell[] headerCell1 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell1[col] = row[1].createCell(col);
            headerCell1[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead.get(col))));
            headerCell1[col].setCellStyle(columnHeadStyle);
        }

        sheet1.setGridsPrinted(false);
        HSSFFooter footer = sheet1.getFooter();
        footer.setRight("page" + HeaderFooter.page() + "of" + HeaderFooter.numPages());
        /**
         * 处理表头及标题结束
         **/

        /**
         * 处理表数据
         **/
        List<List> data = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelData.size(); i++) {
                Object objectEntity = excelData.get(i);
                List<Object> objectEntityValues = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName == null || paramItemsName.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        if(o instanceof Date){
                                            objectEntityValues.add(DateUtils.formatT((Date) o));
                                        }else{
                                            objectEntityValues.add(o.toString());
                                        }
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data.add(objectEntityValues);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }

        columnHeadFont = workbook.createFont();
        columnHeadFont.setFontName("Arial");
        columnHeadFont.setFontHeightInPoints((short) 10);
        columnHeadFont.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
        // 列头的样式
        columnHeadStyle = workbook.createCellStyle();
        columnHeadStyle.setFont(columnHeadFont);

        HSSFRow[] dataRow = null;
        HSSFCell[] dataCell = null;
        if (data.size() != 0) {
            dataRow = new HSSFRow[data.size() + 1];
            dataCell = new HSSFCell[data.get(0).size()];
        }
        for (int i = 0; i < data.size(); i++) {
            dataRow[i + 1] = sheet1.createRow(i + 2);
            for (int j = 0; j < data.get(i).size(); j++) {
                dataCell[j] = dataRow[i + 1].createCell(j);
                dataCell[j].setCellValue(new HSSFRichTextString(String.valueOf(data.get(i).get(j))));
                dataCell[j].setCellStyle(columnHeadStyle);
            }
        }
        /**
         * 处理表数据结束
         **/
        return workbook;
    }

    public static HSSFWorkbook export2(String excelTitle, List excelHead, List<Integer> excelWidth, List<String> paramItemsName, List excelData, Class dataType) {
        if (excelTitle == null || excelHead == null || dataType == null)
            return null;

        if (excelHead.size() == 0)
            return null;

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet1 = workbook.createSheet("sheet1");

        //设置单元格宽度
        for (int i = 0; i < excelHead.size(); i++) {
            sheet1.setColumnWidth(i, excelWidth.get(i));
        }

        //处理数据开始
        /**
         * 处理表头及标题
         **/
        HSSFFont columnHeadFont = workbook.createFont();
        columnHeadFont.setFontName("宋体");
        columnHeadFont.setFontHeightInPoints((short) 10);
        columnHeadFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
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

        HSSFRow[] row = new HSSFRow[2];
        row[0] = sheet1.createRow(0);
        row[0].setHeight((short) 500);

        CellRangeAddress cra = new CellRangeAddress(0, 0, 0, excelHead.size() - 1);
        //在sheet里增加合并单元格
        sheet1.addMergedRegion(cra);
        HSSFCell cell = row[0].createCell(0);
        cell.setCellValue(new HSSFRichTextString(excelTitle));
        cell.setCellStyle(columnHeadStyle);


        row[1] = sheet1.createRow(1);
        row[1].setHeight((short) 500);
        HSSFCell[] headerCell1 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell1[col] = row[1].createCell(col);
            headerCell1[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead.get(col))));
            headerCell1[col].setCellStyle(columnHeadStyle);
        }

        sheet1.setGridsPrinted(false);
        HSSFFooter footer = sheet1.getFooter();
        footer.setRight("page" + HeaderFooter.page() + "of" + HeaderFooter.numPages());
        /**
         * 处理表头及标题结束
         **/

        /**
         * 处理表数据
         **/
        List<List> data = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelData.size(); i++) {
                Object objectEntity = excelData.get(i);
                List<Object> objectEntityValues = new ArrayList<>();
                for (int j = 0; j < paramItemsName.size(); j++) {
                    for (Field field : fs) {
                        //if (paramItemsName == null || paramItemsName.contains(field.getName()))
                        if (paramItemsName.get(j).equals(field.getName()))
                            for (Method m : method) {
                                if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                    Object o = m.invoke(objectEntity);
                                    if (o == null || "".equals(o.toString())) {
                                        objectEntityValues.add("");
                                    } else {
                                        if (o instanceof List == false) {
                                            if(o instanceof Date){
                                                objectEntityValues.add(DateUtils.formatT((Date) o));
                                            }else{
                                                objectEntityValues.add(o.toString());
                                            }
                                        } else if (o instanceof List) {
                                            for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                                objectEntityValues.add(oo.getDatecount());
                                            }
                                        }
                                    }
                                }
                            }
                    }
                }
                data.add(objectEntityValues);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }

        columnHeadFont = workbook.createFont();
        columnHeadFont.setFontName("Arial");
        columnHeadFont.setFontHeightInPoints((short) 10);
        columnHeadFont.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
        // 列头的样式
        columnHeadStyle = workbook.createCellStyle();
        columnHeadStyle.setFont(columnHeadFont);

        HSSFRow[] dataRow = null;
        HSSFCell[] dataCell = null;
        if (data.size() != 0) {
            dataRow = new HSSFRow[data.size() + 1];
            dataCell = new HSSFCell[data.get(0).size()];
        }


        for (int i = 0; i < data.size(); i++) {
            dataRow[i + 1] = sheet1.createRow(i + 2);
            for (int j = 0; j < data.get(i).size(); j++) {
                dataCell[j] = dataRow[i + 1].createCell(j);
                dataCell[j].setCellValue(new HSSFRichTextString(String.valueOf(data.get(i).get(j))));
                dataCell[j].setCellStyle(columnHeadStyle);
            }
        }
        /**
         * 处理表数据结束
         **/
        return workbook;
    }


    /**
     * PPM健康表复杂表头
     */
    public static HSSFWorkbook exportZerokmissue(String excelTitle, List excelHead, List excelHead2, List<Integer> excelWidth, List<String> paramItemsName, List excelData, Class dataType) {
        if (excelTitle == null || excelHead == null || dataType == null)
            return null;

        if (excelHead.size() == 0)
            return null;

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet1 = workbook.createSheet("sheet1");

        //设置单元格宽度
        for (int i = 0; i < excelHead.size(); i++) {
            sheet1.setColumnWidth(i, excelWidth.get(i));
        }

        //处理数据开始
        /**
         * 处理表头及标题
         **/
        HSSFFont columnHeadFont = workbook.createFont();
        columnHeadFont.setFontName("宋体");
        columnHeadFont.setFontHeightInPoints((short) 10);
        columnHeadFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
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

        HSSFRow[] row = new HSSFRow[3];
        row[0] = sheet1.createRow(0);
        row[0].setHeight((short) 500);

        CellRangeAddress cra = new CellRangeAddress(0, 0, 0, excelHead.size() - 1);
        //在sheet里增加合并单元格
        sheet1.addMergedRegion(cra);
        HSSFCell cell = row[0].createCell(0);
        cell.setCellValue(new HSSFRichTextString(excelTitle));
        cell.setCellStyle(columnHeadStyle);


        row[1] = sheet1.createRow(1);
        row[1].setHeight((short) 500);


        HSSFCell[] headerCell2 = new HSSFCell[excelHead.size()];
        for (int col2 = 0; col2 < excelHead.size(); col2++) {
            headerCell2[col2] = row[1].createCell(col2);
            headerCell2[col2].setCellStyle(columnHeadStyle);
            if (col2 == 2 || col2 == 3) {
                headerCell2[col2].setCellValue(String.valueOf(excelHead2.get(0)));
            } else if (col2 == 4 || col2 == 5 || col2 == 6 || col2 == 7) {
                headerCell2[col2].setCellValue(String.valueOf(excelHead2.get(1)));
            } else if (col2 == 8 || col2 == 9 || col2 == 10 || col2 == 11) {
                headerCell2[col2].setCellValue(String.valueOf(excelHead2.get(2)));
            } else if (col2 == 0) {
                headerCell2[col2].setCellValue(String.valueOf(excelHead.get(0)));
            } else {
                headerCell2[col2].setCellValue(String.valueOf(excelHead.get(1)));
            }

        }

        CellRangeAddress cra3 = new CellRangeAddress(1, 1, 2, 3);
        sheet1.addMergedRegion(cra3);
        CellRangeAddress cra4 = new CellRangeAddress(1, 1, 4, 7);
        sheet1.addMergedRegion(cra4);
        CellRangeAddress cra5 = new CellRangeAddress(1, 1, 8, 11);
        sheet1.addMergedRegion(cra5);


        row[2] = sheet1.createRow(2);
        row[2].setHeight((short) 500);
        HSSFCell[] headerCell1 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell1[col] = row[2].createCell(col);
            headerCell1[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead.get(col))));
            headerCell1[col].setCellStyle(columnHeadStyle);
        }

        CellRangeAddress cra6 = new CellRangeAddress(1, 2, 0, 0);
        sheet1.addMergedRegion(cra6);
        CellRangeAddress cra7 = new CellRangeAddress(1, 2, 1, 1);
        sheet1.addMergedRegion(cra7);
        sheet1.setGridsPrinted(false);
        HSSFFooter footer = sheet1.getFooter();
        footer.setRight("page" + HeaderFooter.page() + "of" + HeaderFooter.numPages());
        /**
         * 处理表头及标题结束
         **/

        /**
         * 处理表数据
         **/
        List<List> data = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelData.size(); i++) {
                Object objectEntity = excelData.get(i);
                List<Object> objectEntityValues = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName == null || paramItemsName.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        objectEntityValues.add(o.toString());
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data.add(objectEntityValues);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }

        columnHeadFont = workbook.createFont();
        columnHeadFont.setFontName("Arial");
        columnHeadFont.setFontHeightInPoints((short) 10);
        columnHeadFont.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
        // 列头的样式
        columnHeadStyle = workbook.createCellStyle();
        columnHeadStyle.setFont(columnHeadFont);

        HSSFRow[] dataRow = null;
        HSSFCell[] dataCell = null;
        if (data.size() != 0) {
            dataRow = new HSSFRow[data.size() + 1];
            dataCell = new HSSFCell[data.get(0).size()];
        }

        for (int i = 0; i < data.size(); i++) {
            dataRow[i + 1] = sheet1.createRow(i + 3);
            for (int j = 0; j < data.get(i).size(); j++) {
                dataCell[j] = dataRow[i + 1].createCell(j);
                dataCell[j].setCellValue(new HSSFRichTextString(String.valueOf(data.get(i).get(j))));
                dataCell[j].setCellStyle(columnHeadStyle);
            }
        }
        /**
         * 处理表数据结束
         **/
        return workbook;
    }

    /*public void getTitleRowFirst(int rowposition, int rownum){

        row[rowposition] = sheet1.createRow(rownum);
        row[rowposition].setHeight((short) 500);
        HSSFCell[] headerCell1 = new HSSFCell[excelHead.size()];
        for (int col2 = 0; col2 < excelHead.size(); col2++) {
            headerCell1[col2] = row[rowposition].createCell(col2);
            headerCell1[col2].setCellStyle(columnHeadStyle);
            if(col2==1){
                headerCell1[col2].setCellValue(String.valueOf(excelHeadFirst.get(0)));
            }else if(col2==2||col2==3||col2==4||col2==5){
                headerCell1[col2].setCellValue(String.valueOf(excelHeadFirst.get(1)));
            }else if(col2==6||col2==7||col2==8||col2==9||col2==10){
                headerCell1[col2].setCellValue(String.valueOf(excelHeadFirst.get(2)));
            }else{
                headerCell1[col2].setCellValue(" ");
            }
        }

    }*/

    /*
   * 导出测功数据分析表
   * */
    public static HSSFWorkbook exportAnalysis(String excelTitle, List excelHead, List<Integer> excelWidth, List<String> paramItemsName, List excelData, List paramItemsName2, List datalist2, Class dataType, Class dataType2) {
        if (excelTitle == null || excelHead == null || excelData == null || dataType == null)
            return null;
        if (excelHead.size() == 0 || excelData.size() == 0)
            return null;
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet1 = workbook.createSheet("sheet1");
        //设置单元格宽度
        for (int i = 0; i < excelHead.size(); i++) {
            sheet1.setColumnWidth(i, excelWidth.get(i));
        }

        //处理数据开始
        /**
         * 处理表头及标题
         **/
        HSSFFont columnHeadFont = workbook.createFont();
        columnHeadFont.setFontName("宋体");
        columnHeadFont.setFontHeightInPoints((short) 10);
        columnHeadFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
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

        HSSFRow[] row = new HSSFRow[11];
        row[0] = sheet1.createRow(25);
        row[0].setHeight((short) 500);

        CellRangeAddress cra = new CellRangeAddress(25, 25, 0, excelHead.size() - 1);
        //在sheet里增加合并单元格
        //设置标题
        sheet1.addMergedRegion(cra);
        HSSFCell cell = row[0].createCell(0);
        cell.setCellValue(new HSSFRichTextString(excelTitle));
        cell.setCellStyle(columnHeadStyle);

        row[1] = sheet1.createRow(26);
        row[1].setHeight((short) 500);
        HSSFCell[] headerCell1 = new HSSFCell[excelHead.size()];
        for (int col2 = 0; col2 < excelHead.size(); col2++) {
            headerCell1[col2] = row[1].createCell(col2);
            headerCell1[col2].setCellStyle(columnHeadStyle);
            if (col2 == 1) {
                headerCell1[col2].setCellValue(String.valueOf("CY"));
            } else if (col2 == 2 || col2 == 3 || col2 == 4) {
                headerCell1[col2].setCellValue(String.valueOf("Month"));
            } else if (col2 == 5 || col2 == 6 || col2 == 7 || col2 == 8 || col2 == 9 || col2 == 10) {
                headerCell1[col2].setCellValue(String.valueOf("Week Starting"));
            } else {
                headerCell1[col2].setCellValue("测试机型");
            }
        }
        row[2] = sheet1.createRow(27);
        row[2].setHeight((short) 500);
        HSSFCell[] headerCell2 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell2[col] = row[2].createCell(col);
            headerCell2[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead.get(col))));
            headerCell2[col].setCellStyle(columnHeadStyle);
        }
        CellRangeAddress cra3 = new CellRangeAddress(26, 27, 0, 0);
        sheet1.addMergedRegion(cra3);
        CellRangeAddress cra4 = new CellRangeAddress(26, 26, 2, 4);
        sheet1.addMergedRegion(cra4);
        CellRangeAddress cra5 = new CellRangeAddress(26, 26, 5, 10);
        sheet1.addMergedRegion(cra5);

        sheet1.setGridsPrinted(false);
        HSSFFooter footer = sheet1.getFooter();
        footer.setRight("page" + HeaderFooter.page() + "of" + HeaderFooter.numPages());

        /**
         * 处理表头及标题结束
         **/

        /**
         * 处理表数据
         **/
        List<List> data = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelData.size(); i++) {
                Object objectEntity = excelData.get(i);
                List<Object> objectEntityValues = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName == null || paramItemsName.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        objectEntityValues.add(o.toString());
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data.add(objectEntityValues);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }

        HSSFRow[] dataRow = new HSSFRow[data.size() + 1];
        HSSFCell[] dataCell = new HSSFCell[data.get(0).size()];
        for (int i = 0; i < data.size(); i++) {
            dataRow[i + 1] = sheet1.createRow(i + 28);
            for (int j = 0; j < data.get(i).size(); j++) {
                dataCell[j] = dataRow[i + 1].createCell(j);
                dataCell[j].setCellValue(new HSSFRichTextString(String.valueOf(data.get(i).get(j))));
            }
        }


        //第二个报表开始了 ----表头
        row[3] = sheet1.createRow(59 + excelData.size());
        row[3].setHeight((short) 500);
        HSSFCell[] headerCell3 = new HSSFCell[paramItemsName2.size()];
        for (int col = 0; col < paramItemsName2.size(); col++) {
            headerCell3[col] = row[3].createCell(col);
            headerCell3[col].setCellStyle(columnHeadStyle);
            if (col == 0) {
                headerCell3[col].setCellValue(new HSSFRichTextString("测试机型"));
            } else {
                headerCell3[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead.get(4))));
            }
        }

        /**
         * 处理表数据
         **/
        List<List> data2 = new ArrayList<>();
        try {
            Method[] method = dataType2.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType2.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < datalist2.size(); i++) {
                Object objectEntity = datalist2.get(i);
                List<Object> objectEntityValues = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName2 == null || paramItemsName2.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        objectEntityValues.add(o.toString());
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data2.add(objectEntityValues);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }

        HSSFRow[] dataRow3 = new HSSFRow[data.size() + 1];
        HSSFCell[] dataCell3 = new HSSFCell[data.get(0).size()];
        for (int i = 0; i < data2.size(); i++) {
            dataRow3[i + 1] = sheet1.createRow(i + 60 + excelData.size());
            for (int j = 0; j < data2.get(i).size(); j++) {
                dataCell3[j] = dataRow3[i + 1].createCell(j);
                dataCell3[j].setCellValue(new HSSFRichTextString(String.valueOf(data2.get(i).get(j))));
            }
        }

        return workbook;
    }

    /**
     * 导出健康表三个列表的Excel
     */
    public static HSSFWorkbook exportAuditHealth(String excelTitle, List excelHead, List excelHead2, List excelHead3, List excelHeadFirst, List<Integer> excelWidth, List<String> paramItemsName, List<String> paramItemsName2, List<String> paramItemsName3, List excelData, List excelData2, List excelData3, Class dataType) {
        if (excelTitle == null || excelHead == null || excelData == null || dataType == null)
            return null;

        if (excelHead.size() == 0 || excelData.size() == 0)
            return null;

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet1 = workbook.createSheet("sheet1");

        //设置单元格宽度
        for (int i = 0; i < excelHead.size(); i++) {
            sheet1.setColumnWidth(i, excelWidth.get(i));
        }

        //处理数据开始
        /**
         * 处理表头及标题
         **/
        HSSFFont columnHeadFont = workbook.createFont();
        columnHeadFont.setFontName("宋体");
        columnHeadFont.setFontHeightInPoints((short) 10);
        columnHeadFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
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

        HSSFRow[] row = new HSSFRow[7];
        row[0] = sheet1.createRow(0);
        row[0].setHeight((short) 500);

        CellRangeAddress cra = new CellRangeAddress(0, 0, 0, excelHead.size() - 1);
        //在sheet里增加合并单元格
        //设置标题
        sheet1.addMergedRegion(cra);
        HSSFCell cell = row[0].createCell(0);
        cell.setCellValue(new HSSFRichTextString(excelTitle));
        cell.setCellStyle(columnHeadStyle);


        row[1] = sheet1.createRow(1);
        row[1].setHeight((short) 500);
        HSSFCell[] headerCell1 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell1[col] = row[1].createCell(col);
            headerCell1[col].setCellStyle(columnHeadStyle);
            if (col == 0) {
                headerCell1[col].setCellValue("生产单位");
            } else if (col == 1 || col == 2) {
                headerCell1[col].setCellValue(String.valueOf(excelHeadFirst.get(0)));
            } else if (col == 3 || col == 4 || col == 5 || col == 6) {
                headerCell1[col].setCellValue(String.valueOf(excelHeadFirst.get(1)));
            } else if (col == 7 || col == 8 || col == 9 || col == 10 || col == 11 || col == 12) {
                headerCell1[col].setCellValue(String.valueOf(excelHeadFirst.get(2)));
            }
        }

        row[2] = sheet1.createRow(2);
        row[2].setHeight((short) 500);

        HSSFCell[] headerCell2 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell2[col] = row[2].createCell(col);
            headerCell2[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead.get(col))));
            headerCell2[col].setCellStyle(columnHeadStyle);
        }

        CellRangeAddress cra1 = new CellRangeAddress(1, 2, 0, 0);
        sheet1.addMergedRegion(cra1);
        CellRangeAddress cra2 = new CellRangeAddress(1, 1, 1, 2);
        sheet1.addMergedRegion(cra2);
        CellRangeAddress cra3 = new CellRangeAddress(1, 1, 3, 6);
        sheet1.addMergedRegion(cra3);
        CellRangeAddress cra4 = new CellRangeAddress(1, 1, 7, 12);
        sheet1.addMergedRegion(cra4);

        sheet1.setGridsPrinted(false);
        HSSFFooter footer = sheet1.getFooter();
        footer.setRight("page" + HeaderFooter.page() + "of" + HeaderFooter.numPages());
        /**
         * 处理表头及标题结束
         **/

        /**
         * 处理表数据
         **/
        List<List> data = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelData.size(); i++) {
                Object objectEntity = excelData.get(i);
                List<Object> objectEntityValues = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName == null || paramItemsName.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        objectEntityValues.add(o.toString());
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data.add(objectEntityValues);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }


        HSSFRow[] dataRow = new HSSFRow[data.size() + 1];
        HSSFCell[] dataCell = new HSSFCell[data.get(0).size()];
        for (int i = 0; i < data.size(); i++) {
            dataRow[i + 1] = sheet1.createRow(i + 3);
            for (int j = 0; j < data.get(i).size(); j++) {
                dataCell[j] = dataRow[i + 1].createCell(j);
                dataCell[j].setCellValue(new HSSFRichTextString(String.valueOf(data.get(i).get(j))));
            }
        }

        row[3] = sheet1.createRow(data.size() + 5);
        row[3].setHeight((short) 500);
        HSSFCell[] headerCell3 = new HSSFCell[excelHead2.size()];
        for (int col = 0; col < excelHead2.size(); col++) {
            headerCell3[col] = row[3].createCell(col);
            headerCell3[col].setCellStyle(columnHeadStyle);
            if (col == 0) {
                headerCell3[col].setCellValue("生产线");
            } else if (col == 1 || col == 2) {
                headerCell3[col].setCellValue(String.valueOf(excelHeadFirst.get(0)));
            } else if (col == 3 || col == 4 || col == 5 || col == 6) {
                headerCell3[col].setCellValue(String.valueOf(excelHeadFirst.get(1)));
            } else if (col == 7 || col == 8 || col == 9 || col == 10 || col == 11 || col == 12) {
                headerCell3[col].setCellValue(String.valueOf(excelHeadFirst.get(2)));
            }
        }

        row[4] = sheet1.createRow(data.size() + 6);
        row[4].setHeight((short) 500);
        HSSFCell[] headerCell4 = new HSSFCell[excelHead2.size()];
        for (int col = 0; col < excelHead2.size(); col++) {
            headerCell4[col] = row[4].createCell(col);
            headerCell4[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead2.get(col))));
            headerCell4[col].setCellStyle(columnHeadStyle);
        }

        CellRangeAddress cra5 = new CellRangeAddress(data.size() + 5, data.size() + 6, 0, 0);
        sheet1.addMergedRegion(cra5);
        CellRangeAddress cra6 = new CellRangeAddress(data.size() + 5, data.size() + 5, 1, 2);
        sheet1.addMergedRegion(cra6);
        CellRangeAddress cra7 = new CellRangeAddress(data.size() + 5, data.size() + 5, 3, 6);
        sheet1.addMergedRegion(cra7);
        CellRangeAddress cra8 = new CellRangeAddress(data.size() + 5, data.size() + 5, 7, 12);
        sheet1.addMergedRegion(cra8);

        List<List> data2 = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelData2.size(); i++) {
                Object objectEntity2 = excelData2.get(i);
                List<Object> objectEntityValues2 = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName2 == null || paramItemsName2.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity2);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues2.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        objectEntityValues2.add(o.toString());
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues2.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data2.add(objectEntityValues2);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }


        HSSFRow[] dataRow2 = new HSSFRow[data2.size() + 1];
        HSSFCell[] dataCell2 = new HSSFCell[data2.get(0).size()];

        for (int i = 0; i < data2.size(); i++) {
            dataRow2[i + 1] = sheet1.createRow(i + data.size() + 7);
            for (int j = 0; j < data2.get(i).size(); j++) {
                dataCell2[j] = dataRow2[i + 1].createCell(j);
                dataCell2[j].setCellValue(new HSSFRichTextString(String.valueOf(data2.get(i).get(j))));
            }
        }

        row[5] = sheet1.createRow(data.size() + data2.size() + 9);
        row[5].setHeight((short) 500);
        HSSFCell[] headerCell5 = new HSSFCell[excelHead3.size()];
        for (int col = 0; col < excelHead3.size(); col++) {
            headerCell5[col] = row[5].createCell(col);
            headerCell5[col].setCellStyle(columnHeadStyle);
            if (col == 0) {
                headerCell5[col].setCellValue("系列");
            } else if (col == 1 || col == 2) {
                headerCell5[col].setCellValue(String.valueOf(excelHeadFirst.get(0)));
            } else if (col == 3 || col == 4 || col == 5 || col == 6) {
                headerCell5[col].setCellValue(String.valueOf(excelHeadFirst.get(1)));
            } else if (col == 7 || col == 8 || col == 9 || col == 10 || col == 11 || col == 12) {
                headerCell5[col].setCellValue(String.valueOf(excelHeadFirst.get(2)));
            }
        }


        row[6] = sheet1.createRow(data.size() + data2.size() + 10);
        row[6].setHeight((short) 500);
        HSSFCell[] headerCell6 = new HSSFCell[excelHead3.size()];
        for (int col = 0; col < excelHead3.size(); col++) {
            headerCell6[col] = row[6].createCell(col);
            headerCell6[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead3.get(col))));
            headerCell6[col].setCellStyle(columnHeadStyle);
        }

        CellRangeAddress cra9 = new CellRangeAddress(data.size() + data2.size() + 9, data.size() + data2.size() + 10, 0, 0);
        sheet1.addMergedRegion(cra9);
        CellRangeAddress cra10 = new CellRangeAddress(data.size() + data2.size() + 9, data.size() + data2.size() + 9, 1, 2);
        sheet1.addMergedRegion(cra10);
        CellRangeAddress cra11 = new CellRangeAddress(data.size() + data2.size() + 9, data.size() + data2.size() + 9, 3, 6);
        sheet1.addMergedRegion(cra11);
        CellRangeAddress cra12 = new CellRangeAddress(data.size() + data2.size() + 9, data.size() + data2.size() + 9, 7, 12);
        sheet1.addMergedRegion(cra12);

        List<List> data3 = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelData3.size(); i++) {
                Object objectEntity3 = excelData3.get(i);
                List<Object> objectEntityValues3 = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName3 == null || paramItemsName3.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity3);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues3.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        objectEntityValues3.add(o.toString());
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues3.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data3.add(objectEntityValues3);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }


        HSSFRow[] dataRow3 = new HSSFRow[data3.size() + 1];
        HSSFCell[] dataCell3 = new HSSFCell[data3.get(0).size()];

        for (int i = 0; i < data3.size(); i++) {
            dataRow3[i + 1] = sheet1.createRow(i + data.size() + data2.size() + 11);
            for (int j = 0; j < data3.get(i).size(); j++) {
                dataCell3[j] = dataRow3[i + 1].createCell(j);
                dataCell3[j].setCellValue(new HSSFRichTextString(String.valueOf(data3.get(i).get(j))));
            }
        }


        /**
         * 处理表数据结束
         **/
        return workbook;
    }

    /**
     * 导出audit趋势列表的Excel
     */
    public static HSSFWorkbook exportAuditTendency(String excelTitle, List excelHead, List excelHead1, List excelHead2, List excelHead3, List excelHead4, List excelHead5, List excelHead6, List excelHead7, List excelHeadFirst, List<Integer> excelWidth, List<String> paramItemsName, List excelData1, List excelDataS, List excelDataA, List excelDataB, List excelDataC, List excelDataWeek, List excelDataMonth, List excelDataYear, Class dataType) {
        if (excelTitle == null || excelHead == null || excelData1 == null || dataType == null)
            return null;

        if (excelHead.size() == 0 || excelData1.size() == 0)
            return null;

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet1 = workbook.createSheet("sheet1");

        //设置单元格宽度
        for (int i = 0; i < excelHead.size(); i++) {
            sheet1.setColumnWidth(i, excelWidth.get(i));
        }

        //处理数据开始
        /**
         * 处理表头及标题
         **/
        HSSFFont columnHeadFont = workbook.createFont();
        columnHeadFont.setFontName("宋体");
        columnHeadFont.setFontHeightInPoints((short) 10);
        columnHeadFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
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

        HSSFRow[] row = new HSSFRow[17];
        row[0] = sheet1.createRow(25);
        row[0].setHeight((short) 500);

        CellRangeAddress cra = new CellRangeAddress(25, 25, 0, excelHead.size() - 1);
        //在sheet里增加合并单元格
        //设置标题
        sheet1.addMergedRegion(cra);
        HSSFCell cell = row[0].createCell(0);
        cell.setCellValue(new HSSFRichTextString(excelTitle));
        cell.setCellStyle(columnHeadStyle);

        /**
         * 第1个表格
         */
        row[1] = sheet1.createRow(26);
        row[1].setHeight((short) 500);
        HSSFCell[] headerCell1 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell1[col] = row[1].createCell(col);
            headerCell1[col].setCellStyle(columnHeadStyle);
            if (col == 0) {
                headerCell1[col].setCellValue(String.valueOf(""));
            } else if (col == 1) {
                headerCell1[col].setCellValue(String.valueOf(excelHeadFirst.get(0)));
            } else if (col == 2 || col == 3 || col == 4) {
                headerCell1[col].setCellValue(String.valueOf(excelHeadFirst.get(1)));
            } else if (col == 5 || col == 6 || col == 7 || col == 8 || col == 9 || col == 10) {
                headerCell1[col].setCellValue(String.valueOf(excelHeadFirst.get(2)));
            } else {
                headerCell1[col].setCellValue(String.valueOf(excelHeadFirst.get(3)));
            }
        }

        row[2] = sheet1.createRow(27);
        row[2].setHeight((short) 500);
        HSSFCell[] headerCell2 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell2[col] = row[2].createCell(col);
            headerCell2[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead.get(col))));
            headerCell2[col].setCellStyle(columnHeadStyle);
        }
        CellRangeAddress cra2 = new CellRangeAddress(26, 27, 0, 0);
        sheet1.addMergedRegion(cra2);
        CellRangeAddress cra3 = new CellRangeAddress(26, 26, 2, 4);
        sheet1.addMergedRegion(cra3);
        CellRangeAddress cra4 = new CellRangeAddress(26, 26, 5, 10);
        sheet1.addMergedRegion(cra4);
        CellRangeAddress cra5 = new CellRangeAddress(26, 26, 11, 31);
        sheet1.addMergedRegion(cra5);

        sheet1.setGridsPrinted(false);
        HSSFFooter footer = sheet1.getFooter();
        footer.setRight("page" + HeaderFooter.page() + "of" + HeaderFooter.numPages());


        /**
         * 处理表头及标题结束
         **/


        /**
         * 处理表数据
         **/
        List<List> data = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelData1.size(); i++) {
                Object objectEntity = excelData1.get(i);
                List<Object> objectEntityValues = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName == null || paramItemsName.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        objectEntityValues.add(o.toString());
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data.add(objectEntityValues);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }


        HSSFRow[] dataRow = new HSSFRow[data.size() + 1];
        HSSFCell[] dataCell = new HSSFCell[data.get(0).size()];
        for (int i = 0; i < data.size(); i++) {
            dataRow[i + 1] = sheet1.createRow(i + 28);
            for (int j = 0; j < data.get(i).size(); j++) {
                dataCell[j] = dataRow[i + 1].createCell(j);
                dataCell[j].setCellValue(new HSSFRichTextString(String.valueOf(data.get(i).get(j))));
            }
        }

        /**
         * 第2个表格S
         */
        row[3] = sheet1.createRow(data.size() + 30);
        row[3].setHeight((short) 500);
        HSSFCell[] headerCell3 = new HSSFCell[excelHead1.size()];
        for (int col = 0; col < excelHead1.size(); col++) {
            headerCell3[col] = row[3].createCell(col);
            headerCell3[col].setCellStyle(columnHeadStyle);
            if (col == 0) {
                headerCell3[col].setCellValue(String.valueOf("S类"));
            } else if (col == 1) {
                headerCell3[col].setCellValue(String.valueOf(excelHeadFirst.get(0)));
            } else if (col == 2 || col == 3 || col == 4) {
                headerCell3[col].setCellValue(String.valueOf(excelHeadFirst.get(1)));
            } else if (col == 5 || col == 6 || col == 7 || col == 8 || col == 9 || col == 10) {
                headerCell3[col].setCellValue(String.valueOf(excelHeadFirst.get(2)));
            } else {
                headerCell3[col].setCellValue(String.valueOf(excelHeadFirst.get(3)));
            }
        }

        row[4] = sheet1.createRow(data.size() + 31);
        row[4].setHeight((short) 500);
        HSSFCell[] headerCell4 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell4[col] = row[4].createCell(col);
            headerCell4[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead.get(col))));
            headerCell4[col].setCellStyle(columnHeadStyle);
        }
        CellRangeAddress cra6 = new CellRangeAddress(data.size() + 30, data.size() + 31, 0, 0);
        sheet1.addMergedRegion(cra6);
        CellRangeAddress cra7 = new CellRangeAddress(data.size() + 30, data.size() + 30, 2, 4);
        sheet1.addMergedRegion(cra7);
        CellRangeAddress cra8 = new CellRangeAddress(data.size() + 30, data.size() + 30, 5, 10);
        sheet1.addMergedRegion(cra8);
        CellRangeAddress cra9 = new CellRangeAddress(data.size() + 30, data.size() + 30, 11, 31);
        sheet1.addMergedRegion(cra9);

        List<List> data2 = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelDataS.size(); i++) {
                Object objectEntity2 = excelDataS.get(i);
                List<Object> objectEntityValues2 = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName == null || paramItemsName.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity2);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues2.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        objectEntityValues2.add(o.toString());
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues2.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data2.add(objectEntityValues2);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }


        HSSFRow[] dataRow2 = new HSSFRow[data2.size() + 1];
        HSSFCell[] dataCell2 = new HSSFCell[data2.get(0).size()];

        for (int i = 0; i < data2.size(); i++) {
            dataRow2[i + 1] = sheet1.createRow(i + data.size() + 32);
            for (int j = 0; j < data2.get(i).size(); j++) {
                dataCell2[j] = dataRow2[i + 1].createCell(j);
                dataCell2[j].setCellValue(new HSSFRichTextString(String.valueOf(data2.get(i).get(j))));
            }
        }

        /**
         * 第3个表格A
         */
        row[5] = sheet1.createRow(data.size() + data2.size() + 34);
        row[5].setHeight((short) 500);
        HSSFCell[] headerCell5 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell5[col] = row[5].createCell(col);
            headerCell5[col].setCellStyle(columnHeadStyle);
            if (col == 0) {
                headerCell5[col].setCellValue(String.valueOf("A类"));
            } else if (col == 1) {
                headerCell5[col].setCellValue(String.valueOf(excelHeadFirst.get(0)));
            } else if (col == 2 || col == 3 || col == 4) {
                headerCell5[col].setCellValue(String.valueOf(excelHeadFirst.get(1)));
            } else if (col == 5 || col == 6 || col == 7 || col == 8 || col == 9 || col == 10) {
                headerCell5[col].setCellValue(String.valueOf(excelHeadFirst.get(2)));
            } else {
                headerCell5[col].setCellValue(String.valueOf(excelHeadFirst.get(3)));
            }
        }

        row[6] = sheet1.createRow(data.size() + data2.size() + 35);
        row[6].setHeight((short) 500);
        HSSFCell[] headerCell6 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell6[col] = row[6].createCell(col);
            headerCell6[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead.get(col))));
            headerCell6[col].setCellStyle(columnHeadStyle);
        }
        CellRangeAddress cra10 = new CellRangeAddress(data.size() + data2.size() + 34, data.size() + data2.size() + 35, 0, 0);
        sheet1.addMergedRegion(cra10);
        CellRangeAddress cra11 = new CellRangeAddress(data.size() + data2.size() + 34, data.size() + data2.size() + 34, 2, 4);
        sheet1.addMergedRegion(cra11);
        CellRangeAddress cra12 = new CellRangeAddress(data.size() + data2.size() + 34, data.size() + data2.size() + 34, 5, 10);
        sheet1.addMergedRegion(cra12);
        CellRangeAddress cra13 = new CellRangeAddress(data.size() + data2.size() + 34, data.size() + data2.size() + 34, 11, 31);
        sheet1.addMergedRegion(cra13);

        List<List> data3 = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelDataA.size(); i++) {
                Object objectEntity3 = excelDataA.get(i);
                List<Object> objectEntityValues3 = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName == null || paramItemsName.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity3);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues3.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        objectEntityValues3.add(o.toString());
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues3.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data3.add(objectEntityValues3);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }


        HSSFRow[] dataRow3 = new HSSFRow[data3.size() + 1];
        HSSFCell[] dataCell3 = new HSSFCell[data3.get(0).size()];

        for (int i = 0; i < data3.size(); i++) {
            dataRow3[i + 1] = sheet1.createRow(i + data.size() + data2.size() + 36);
            for (int j = 0; j < data3.get(i).size(); j++) {
                dataCell3[j] = dataRow3[i + 1].createCell(j);
                dataCell3[j].setCellValue(new HSSFRichTextString(String.valueOf(data3.get(i).get(j))));
            }
        }

        /**
         * 第4个表格B
         */
        row[7] = sheet1.createRow(data.size() + data2.size() + data3.size() + 38);
        row[7].setHeight((short) 500);
        HSSFCell[] headerCell7 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell7[col] = row[7].createCell(col);
            headerCell7[col].setCellStyle(columnHeadStyle);
            if (col == 0) {
                headerCell7[col].setCellValue(String.valueOf("B类"));
            } else if (col == 1) {
                headerCell7[col].setCellValue(String.valueOf(excelHeadFirst.get(0)));
            } else if (col == 2 || col == 3 || col == 4) {
                headerCell7[col].setCellValue(String.valueOf(excelHeadFirst.get(1)));
            } else if (col == 5 || col == 6 || col == 7 || col == 8 || col == 9 || col == 10) {
                headerCell7[col].setCellValue(String.valueOf(excelHeadFirst.get(2)));
            } else {
                headerCell7[col].setCellValue(String.valueOf(excelHeadFirst.get(3)));
            }
        }

        row[8] = sheet1.createRow(data.size() + data2.size() + data3.size() + 39);
        row[8].setHeight((short) 500);
        HSSFCell[] headerCell8 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell8[col] = row[8].createCell(col);
            headerCell8[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead.get(col))));
            headerCell8[col].setCellStyle(columnHeadStyle);
        }
        CellRangeAddress cra14 = new CellRangeAddress(data.size() + data2.size() + data3.size() + 38, data.size() + data2.size() + data3.size() + 39, 0, 0);
        sheet1.addMergedRegion(cra14);
        CellRangeAddress cra15 = new CellRangeAddress(data.size() + data2.size() + data3.size() + 38, data.size() + data2.size() + data3.size() + 38, 2, 4);
        sheet1.addMergedRegion(cra15);
        CellRangeAddress cra16 = new CellRangeAddress(data.size() + data2.size() + data3.size() + 38, data.size() + data2.size() + data3.size() + 38, 5, 10);
        sheet1.addMergedRegion(cra16);
        CellRangeAddress cra17 = new CellRangeAddress(data.size() + data2.size() + data3.size() + 38, data.size() + data2.size() + data3.size() + 38, 11, 31);
        sheet1.addMergedRegion(cra17);

        List<List> data4 = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelDataB.size(); i++) {
                Object objectEntity4 = excelDataB.get(i);
                List<Object> objectEntityValues4 = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName == null || paramItemsName.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity4);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues4.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        objectEntityValues4.add(o.toString());
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues4.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data4.add(objectEntityValues4);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }


        HSSFRow[] dataRow4 = new HSSFRow[data4.size() + 1];
        HSSFCell[] dataCell4 = new HSSFCell[data4.get(0).size()];

        for (int i = 0; i < data4.size(); i++) {
            dataRow4[i + 1] = sheet1.createRow(i + data.size() + data2.size() + data3.size() + 40);
            for (int j = 0; j < data4.get(i).size(); j++) {
                dataCell4[j] = dataRow4[i + 1].createCell(j);
                dataCell4[j].setCellValue(new HSSFRichTextString(String.valueOf(data4.get(i).get(j))));
            }
        }

        /**
         * 第5个表格c
         */
        row[9] = sheet1.createRow(data.size() + data2.size() + data3.size() + data4.size() + 42);
        row[9].setHeight((short) 500);
        HSSFCell[] headerCell9 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell9[col] = row[9].createCell(col);
            headerCell9[col].setCellStyle(columnHeadStyle);
            if (col == 0) {
                headerCell9[col].setCellValue(String.valueOf("C类"));
            } else if (col == 1) {
                headerCell9[col].setCellValue(String.valueOf(excelHeadFirst.get(0)));
            } else if (col == 2 || col == 3 || col == 4) {
                headerCell9[col].setCellValue(String.valueOf(excelHeadFirst.get(1)));
            } else if (col == 5 || col == 6 || col == 7 || col == 8 || col == 9 || col == 10) {
                headerCell9[col].setCellValue(String.valueOf(excelHeadFirst.get(2)));
            } else {
                headerCell9[col].setCellValue(String.valueOf(excelHeadFirst.get(3)));
            }
        }

        row[10] = sheet1.createRow(data.size() + data2.size() + data3.size() + data4.size() + 43);
        row[10].setHeight((short) 500);
        HSSFCell[] headerCell10 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell10[col] = row[10].createCell(col);
            headerCell10[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead.get(col))));
            headerCell10[col].setCellStyle(columnHeadStyle);
        }
        CellRangeAddress cra18 = new CellRangeAddress(data.size() + data2.size() + data3.size() + data4.size() + 42, data.size() + data2.size() + data3.size() + data4.size() + 43, 0, 0);
        sheet1.addMergedRegion(cra18);
        CellRangeAddress cra19 = new CellRangeAddress(data.size() + data2.size() + data3.size() + data4.size() + 42, data.size() + data2.size() + data3.size() + data4.size() + 42, 2, 4);
        sheet1.addMergedRegion(cra19);
        CellRangeAddress cra20 = new CellRangeAddress(data.size() + data2.size() + data3.size() + data4.size() + 42, data.size() + data2.size() + data3.size() + data4.size() + 42, 5, 10);
        sheet1.addMergedRegion(cra20);
        CellRangeAddress cra21 = new CellRangeAddress(data.size() + data2.size() + data3.size() + data4.size() + 42, data.size() + data2.size() + data3.size() + data4.size() + 42, 11, 31);
        sheet1.addMergedRegion(cra21);

        List<List> data5 = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelDataC.size(); i++) {
                Object objectEntity5 = excelDataC.get(i);
                List<Object> objectEntityValues5 = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName == null || paramItemsName.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity5);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues5.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        objectEntityValues5.add(o.toString());
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues5.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data5.add(objectEntityValues5);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }


        HSSFRow[] dataRow5 = new HSSFRow[data5.size() + 1];
        HSSFCell[] dataCell5 = new HSSFCell[data5.get(0).size()];

        for (int i = 0; i < data5.size(); i++) {
            dataRow5[i + 1] = sheet1.createRow(i + data.size() + data2.size() + data3.size() + data4.size() + 44);
            for (int j = 0; j < data5.get(i).size(); j++) {
                dataCell5[j] = dataRow5[i + 1].createCell(j);
                dataCell5[j].setCellValue(new HSSFRichTextString(String.valueOf(data5.get(i).get(j))));
            }
        }


        /**
         * 第6个表格最近一周
         */
        row[11] = sheet1.createRow(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + 46);
        row[11].setHeight((short) 500);
        HSSFCell[] headerCell11 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell11[col] = row[11].createCell(col);
            headerCell11[col].setCellStyle(columnHeadStyle);
            if (col == 0) {
                headerCell11[col].setCellValue(String.valueOf("TOP10 ICCs-最近一周"));
            } else if (col == 1) {
                headerCell11[col].setCellValue(String.valueOf(excelHeadFirst.get(0)));
            } else if (col == 2 || col == 3 || col == 4) {
                headerCell11[col].setCellValue(String.valueOf(excelHeadFirst.get(1)));
            } else if (col == 5 || col == 6 || col == 7 || col == 8 || col == 9 || col == 10) {
                headerCell11[col].setCellValue(String.valueOf(excelHeadFirst.get(2)));
            } else {
                headerCell11[col].setCellValue(String.valueOf(excelHeadFirst.get(3)));
            }
        }

        row[12] = sheet1.createRow(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + 47);
        row[12].setHeight((short) 500);
        HSSFCell[] headerCell12 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell12[col] = row[12].createCell(col);
            headerCell12[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead.get(col))));
            headerCell12[col].setCellStyle(columnHeadStyle);
        }
        CellRangeAddress cra22 = new CellRangeAddress(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + 46, data.size() + data2.size() + data3.size() + data4.size() + data5.size() + 47, 0, 0);
        sheet1.addMergedRegion(cra22);
        CellRangeAddress cra23 = new CellRangeAddress(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + 46, data.size() + data2.size() + data3.size() + data4.size() + data5.size() + 46, 2, 4);
        sheet1.addMergedRegion(cra23);
        CellRangeAddress cra24 = new CellRangeAddress(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + 46, data.size() + data2.size() + data3.size() + data4.size() + data5.size() + 46, 5, 10);
        sheet1.addMergedRegion(cra24);
        CellRangeAddress cra25 = new CellRangeAddress(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + 46, data.size() + data2.size() + data3.size() + data4.size() + data5.size() + 46, 11, 31);
        sheet1.addMergedRegion(cra25);

        List<List> data6 = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelDataWeek.size(); i++) {
                Object objectEntity6 = excelDataWeek.get(i);
                List<Object> objectEntityValues6 = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName == null || paramItemsName.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity6);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues6.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        objectEntityValues6.add(o.toString());
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues6.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data6.add(objectEntityValues6);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }


        HSSFRow[] dataRow6 = new HSSFRow[data6.size() + 1];
        HSSFCell[] dataCell6 = new HSSFCell[data6.get(0).size()];

        for (int i = 0; i < data6.size(); i++) {
            dataRow6[i + 1] = sheet1.createRow(i + data.size() + data2.size() + data3.size() + data4.size() + data5.size() + 48);
            for (int j = 0; j < data6.get(i).size(); j++) {
                dataCell6[j] = dataRow6[i + 1].createCell(j);
                dataCell6[j].setCellValue(new HSSFRichTextString(String.valueOf(data6.get(i).get(j))));
            }
        }

        /**
         * 第7个表格最近一月
         */
        row[13] = sheet1.createRow(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + 50);
        row[13].setHeight((short) 500);
        HSSFCell[] headerCell13 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell13[col] = row[13].createCell(col);
            headerCell13[col].setCellStyle(columnHeadStyle);
            if (col == 0) {
                headerCell13[col].setCellValue(String.valueOf("TOP10 ICCs-最近一月"));
            } else if (col == 1) {
                headerCell13[col].setCellValue(String.valueOf(excelHeadFirst.get(0)));
            } else if (col == 2 || col == 3 || col == 4) {
                headerCell13[col].setCellValue(String.valueOf(excelHeadFirst.get(1)));
            } else if (col == 5 || col == 6 || col == 7 || col == 8 || col == 9 || col == 10) {
                headerCell13[col].setCellValue(String.valueOf(excelHeadFirst.get(2)));
            } else {
                headerCell13[col].setCellValue(String.valueOf(excelHeadFirst.get(3)));
            }
        }

        row[14] = sheet1.createRow(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + 51);
        row[14].setHeight((short) 500);
        HSSFCell[] headerCell14 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell14[col] = row[14].createCell(col);
            headerCell14[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead.get(col))));
            headerCell14[col].setCellStyle(columnHeadStyle);
        }
        CellRangeAddress cra26 = new CellRangeAddress(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + 50, data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + 51, 0, 0);
        sheet1.addMergedRegion(cra26);
        CellRangeAddress cra27 = new CellRangeAddress(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + 50, data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + 50, 2, 4);
        sheet1.addMergedRegion(cra27);
        CellRangeAddress cra28 = new CellRangeAddress(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + 50, data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + 50, 5, 10);
        sheet1.addMergedRegion(cra28);
        CellRangeAddress cra29 = new CellRangeAddress(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + 50, data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + 50, 11, 31);
        sheet1.addMergedRegion(cra29);

        List<List> data7 = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelDataMonth.size(); i++) {
                Object objectEntity7 = excelDataMonth.get(i);
                List<Object> objectEntityValues7 = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName == null || paramItemsName.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity7);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues7.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        objectEntityValues7.add(o.toString());
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues7.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data7.add(objectEntityValues7);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }


        HSSFRow[] dataRow7 = new HSSFRow[data7.size() + 1];
        HSSFCell[] dataCell7 = new HSSFCell[data7.get(0).size()];

        for (int i = 0; i < data7.size(); i++) {
            dataRow7[i + 1] = sheet1.createRow(i + data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + 52);
            for (int j = 0; j < data7.get(i).size(); j++) {
                dataCell7[j] = dataRow7[i + 1].createCell(j);
                dataCell7[j].setCellValue(new HSSFRichTextString(String.valueOf(data7.get(i).get(j))));
            }
        }

        /**
         * 第8个表格最近一年
         */
        row[15] = sheet1.createRow(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + data7.size() + 54);
        row[15].setHeight((short) 500);
        HSSFCell[] headerCell15 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell15[col] = row[15].createCell(col);
            headerCell15[col].setCellStyle(columnHeadStyle);
            if (col == 0) {
                headerCell15[col].setCellValue(String.valueOf("TOP10 ICCs-最近一年"));
            } else if (col == 1) {
                headerCell15[col].setCellValue(String.valueOf(excelHeadFirst.get(0)));
            } else if (col == 2 || col == 3 || col == 4) {
                headerCell15[col].setCellValue(String.valueOf(excelHeadFirst.get(1)));
            } else if (col == 5 || col == 6 || col == 7 || col == 8 || col == 9 || col == 10) {
                headerCell15[col].setCellValue(String.valueOf(excelHeadFirst.get(2)));
            } else {
                headerCell15[col].setCellValue(String.valueOf(excelHeadFirst.get(3)));
            }
        }

        row[16] = sheet1.createRow(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + data7.size() + 55);
        row[16].setHeight((short) 500);
        HSSFCell[] headerCell16 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell16[col] = row[16].createCell(col);
            headerCell16[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead.get(col))));
            headerCell16[col].setCellStyle(columnHeadStyle);
        }
        CellRangeAddress cra30 = new CellRangeAddress(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + data7.size() + 54, data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + data7.size() + 55, 0, 0);
        sheet1.addMergedRegion(cra30);
        CellRangeAddress cra31 = new CellRangeAddress(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + data7.size() + 54, data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + data7.size() + 54, 2, 4);
        sheet1.addMergedRegion(cra31);
        CellRangeAddress cra32 = new CellRangeAddress(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + data7.size() + 54, data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + data7.size() + 54, 5, 10);
        sheet1.addMergedRegion(cra32);
        CellRangeAddress cra33 = new CellRangeAddress(data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + data7.size() + 54, data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + data7.size() + 54, 11, 31);
        sheet1.addMergedRegion(cra33);

        List<List> data8 = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelDataYear.size(); i++) {
                Object objectEntity8 = excelDataYear.get(i);
                List<Object> objectEntityValues8 = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName == null || paramItemsName.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity8);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues8.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        objectEntityValues8.add(o.toString());
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues8.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data8.add(objectEntityValues8);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }


        HSSFRow[] dataRow8 = new HSSFRow[data8.size() + 1];
        HSSFCell[] dataCell8 = new HSSFCell[data8.get(0).size()];

        for (int i = 0; i < data8.size(); i++) {
            dataRow8[i + 1] = sheet1.createRow(i + data.size() + data2.size() + data3.size() + data4.size() + data5.size() + data6.size() + data7.size() + 56);
            for (int j = 0; j < data8.get(i).size(); j++) {
                dataCell8[j] = dataRow8[i + 1].createCell(j);
                dataCell8[j].setCellValue(new HSSFRichTextString(String.valueOf(data8.get(i).get(j))));
            }
        }


        /**
         * 处理表数据结束
         **/
        return workbook;

    }

    /**
     * 导出issue排序的Excel
     */
    public static HSSFWorkbook exportIssue(String excelTitle, List excelHead, List excelHeadFirst, List<Integer> excelWidth, List<String> paramItemsName, List excelData, Class dataType) {
        if (excelTitle == null || excelHead == null || excelData == null || dataType == null)
            return null;
        if (excelHead.size() == 0 || excelData.size() == 0)
            return null;
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet1 = workbook.createSheet("sheet1");
        //设置单元格宽度
        for (int i = 0; i < excelHead.size(); i++) {
            sheet1.setColumnWidth(i, excelWidth.get(i));
        }
        //处理数据开始
        /**
         * 处理表头及标题
         **/
        HSSFFont columnHeadFont = workbook.createFont();
        columnHeadFont.setFontName("宋体");
        columnHeadFont.setFontHeightInPoints((short) 10);
        columnHeadFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
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

        HSSFRow[] row = new HSSFRow[4];
        row[0] = sheet1.createRow(0);
        row[0].setHeight((short) 500);

        CellRangeAddress cra1 = new CellRangeAddress(0, 0, 0, 1);
        CellRangeAddress cra2 = new CellRangeAddress(0, 0, 2, 2);
        CellRangeAddress cra3 = new CellRangeAddress(0, 0, 3, 5);
        CellRangeAddress cra4 = new CellRangeAddress(0, 0, 6, 11);
        CellRangeAddress cra5 = new CellRangeAddress(0, 0, 12, 32);
        //在sheet里增加合并单元格
        //设置标题
        sheet1.addMergedRegion(cra1);
        sheet1.addMergedRegion(cra2);
        sheet1.addMergedRegion(cra3);
        sheet1.addMergedRegion(cra4);
        sheet1.addMergedRegion(cra5);

        HSSFCell cell1 = row[0].createCell(0);
        cell1.setCellValue(new HSSFRichTextString((String) excelHeadFirst.get(0)));
        HSSFCell cell2 = row[0].createCell(2);
        cell2.setCellValue(new HSSFRichTextString((String) excelHeadFirst.get(1)));
        HSSFCell cell3 = row[0].createCell(3);
        cell3.setCellValue(new HSSFRichTextString((String) excelHeadFirst.get(2)));
        HSSFCell cell4 = row[0].createCell(6);
        cell4.setCellValue(new HSSFRichTextString((String) excelHeadFirst.get(3)));
        HSSFCell cell5 = row[0].createCell(12);
        cell5.setCellValue(new HSSFRichTextString((String) excelHeadFirst.get(4)));

        cell1.setCellStyle(columnHeadStyle);
        cell2.setCellStyle(columnHeadStyle);
        cell3.setCellStyle(columnHeadStyle);
        cell4.setCellStyle(columnHeadStyle);
        cell5.setCellStyle(columnHeadStyle);

        row[1] = sheet1.createRow(1);
        row[1].setHeight((short) 500);

        //时间名称
        HSSFCell[] headerCell1 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell1[col] = row[1].createCell(col);
            headerCell1[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead.get(col))));
            headerCell1[col].setCellStyle(columnHeadStyle);
        }
        sheet1.setGridsPrinted(false);
        HSSFFooter footer = sheet1.getFooter();
        footer.setRight("page" + HeaderFooter.page() + "of" + HeaderFooter.numPages());
        /**
         * 处理表头及标题结束
         **/
/**
 * 处理表数据
 **/
        List<List> data = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelData.size(); i++) {
                Object objectEntity = excelData.get(i);
                List<Object> objectEntityValues = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName == null || paramItemsName.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        objectEntityValues.add(o.toString());
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data.add(objectEntityValues);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        HSSFRow[] dataRow = new HSSFRow[data.size() + 1];
        HSSFCell[] dataCell = new HSSFCell[data.get(0).size()];
        for (int i = 0; i < data.size(); i++) {
            dataRow[i + 1] = sheet1.createRow(i + 2);
            for (int j = 0; j < data.get(i).size(); j++) {
                dataCell[j] = dataRow[i + 1].createCell(j);
                dataCell[j].setCellValue(new HSSFRichTextString(String.valueOf(data.get(i).get(j))));
            }
        }

        /**
         * 处理表数据结束
         **/
        return workbook;
    }


    /**
     * 导出c1000排序的Excel
     */
    public static HSSFWorkbook exportC1000(String excelTitle, List excelHead, List excelHeadFirst, List<Integer> excelWidth, List<String> paramItemsName, List excelData, Class dataType) {
        if (excelTitle == null || excelHead == null || excelData == null || dataType == null)
            return null;
        if (excelHead.size() == 0 || excelData.size() == 0)
            return null;
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet1 = workbook.createSheet("sheet1");
        //设置单元格宽度
        for (int i = 0; i < excelHead.size(); i++) {
            sheet1.setColumnWidth(i, excelWidth.get(i));
        }
        //处理数据开始
        /**
         * 处理表头及标题
         **/
        HSSFFont columnHeadFont = workbook.createFont();
        columnHeadFont.setFontName("宋体");
        columnHeadFont.setFontHeightInPoints((short) 10);
        columnHeadFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
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

        HSSFRow[] row = new HSSFRow[4];
        row[0] = sheet1.createRow(0);
        row[0].setHeight((short) 500);

        CellRangeAddress cra1 = new CellRangeAddress(0, 0, 0, 0);
        CellRangeAddress cra2 = new CellRangeAddress(0, 0, 1, 1);
        CellRangeAddress cra3 = new CellRangeAddress(0, 0, 2, 4);
        CellRangeAddress cra4 = new CellRangeAddress(0, 0, 5, 10);
        CellRangeAddress cra5 = new CellRangeAddress(0, 0, 11, 31);
        //在sheet里增加合并单元格
        //设置标题
        sheet1.addMergedRegion(cra1);
        sheet1.addMergedRegion(cra2);
        sheet1.addMergedRegion(cra3);
        sheet1.addMergedRegion(cra4);
        sheet1.addMergedRegion(cra5);

        HSSFCell cell1 = row[0].createCell(0);
        cell1.setCellValue(new HSSFRichTextString((String) excelHeadFirst.get(0)));
        HSSFCell cell2 = row[0].createCell(1);
        cell2.setCellValue(new HSSFRichTextString((String) excelHeadFirst.get(1)));
        HSSFCell cell3 = row[0].createCell(2);
        cell3.setCellValue(new HSSFRichTextString((String) excelHeadFirst.get(2)));
        HSSFCell cell4 = row[0].createCell(5);
        cell4.setCellValue(new HSSFRichTextString((String) excelHeadFirst.get(3)));
        HSSFCell cell5 = row[0].createCell(11);
        cell5.setCellValue(new HSSFRichTextString((String) excelHeadFirst.get(4)));

        cell1.setCellStyle(columnHeadStyle);
        cell2.setCellStyle(columnHeadStyle);
        cell3.setCellStyle(columnHeadStyle);
        cell4.setCellStyle(columnHeadStyle);
        cell5.setCellStyle(columnHeadStyle);

        row[1] = sheet1.createRow(1);
        row[1].setHeight((short) 500);

        //时间名称
        HSSFCell[] headerCell1 = new HSSFCell[excelHead.size()];
        for (int col = 0; col < excelHead.size(); col++) {
            headerCell1[col] = row[1].createCell(col);
            headerCell1[col].setCellValue(new HSSFRichTextString(String.valueOf(excelHead.get(col))));
            headerCell1[col].setCellStyle(columnHeadStyle);
        }

        sheet1.setGridsPrinted(false);
        HSSFFooter footer = sheet1.getFooter();
        footer.setRight("page" + HeaderFooter.page() + "of" + HeaderFooter.numPages());
        /**
         * 处理表头及标题结束
         **/
/**
 * 处理表数据
 **/
        List<List> data = new ArrayList<>();
        try {
            Method[] method = dataType.getDeclaredMethods();//获取对象所有方法
            Field[] fs = dataType.getDeclaredFields();//获取对象所有字段

            for (int i = 0; i < excelData.size(); i++) {
                Object objectEntity = excelData.get(i);
                List<Object> objectEntityValues = new ArrayList<>();
                for (Field field : fs) {
                    if (paramItemsName == null || paramItemsName.contains(field.getName()))
                        for (Method m : method) {
                            if (("get" + field.getName()).equalsIgnoreCase(m.getName())) {
                                Object o = m.invoke(objectEntity);
                                if (o == null || "".equals(o.toString())) {
                                    objectEntityValues.add("");
                                } else {
                                    if (o instanceof List == false) {
                                        objectEntityValues.add(o.toString());
                                    } else if (o instanceof List) {
                                        for (DateCountEntity oo : ((List<DateCountEntity>) o)) {
                                            objectEntityValues.add(oo.getDatecount());
                                        }
                                    }
                                }
                            }
                        }
                }
                data.add(objectEntityValues);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        HSSFRow[] dataRow = new HSSFRow[data.size() + 1];
        HSSFCell[] dataCell = new HSSFCell[data.get(0).size()];
        for (int i = 0; i < data.size(); i++) {
            dataRow[i + 1] = sheet1.createRow(i + 2);
            for (int j = 0; j < data.get(i).size(); j++) {
                dataCell[j] = dataRow[i + 1].createCell(j);
                dataCell[j].setCellValue(new HSSFRichTextString(String.valueOf(data.get(i).get(j))));
            }
        }
        /**
         * 处理表数据结束
         **/
        return workbook;
    }


}
