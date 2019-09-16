package io.jeasyframework.utils;


import org.apache.poi.xssf.usermodel.*;
import javax.servlet.ServletOutputStream;
import java.io.IOException;
import java.util.List;

/**
 * 导出excel工具类
 *
 * @author jhd
 * @email jhd@gmail.com
 * @date 2018年10月15日 上午11:00:19
 */
public class ExportUtil {

    /*//导出机型模板
    public static void exportEngineStationExcel(String[] titles, List<MqsEngineStationEntity> engineStationEntity, ServletOutputStream fout, String sheetname) {

        // 创建一个workbook 对应一个excel应用文件
        XSSFWorkbook workBook = new XSSFWorkbook();
        // 在workbook中添加一个sheet,对应Excel文件中的sheet
        //Sheet名称，可以自定义中文名称
        XSSFSheet sheet = workBook.createSheet(sheetname);
        ExportInternalUtil exportUtil = new ExportInternalUtil(workBook, sheet);
        XSSFCellStyle headStyle = exportUtil.getHeadStyle();
        XSSFCellStyle bodyStyle = exportUtil.getBodyStyle();
        // 构建表头
        XSSFRow headRow = sheet.createRow(0);
        XSSFCell cell = null;

        // 输出标题
        for (int i = 0; i < titles.length; i++) {
            cell = headRow.createCell(i);
            cell.setCellStyle(headStyle);
            cell.setCellValue(titles[i]);
        }

      //   构建表体数据
		for (int j = 0; j < engineStationEntity.size(); j++) {
			XSSFRow bodyRow = sheet.createRow(j + 1);
            MqsEngineStationEntity engineStation = engineStationEntity.get(j);

            cell = bodyRow.createCell(0);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(engineStation.getEmsid());
            cell = bodyRow.createCell(1);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(engineStation.getEnginemode());
            cell = bodyRow.createCell(2);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(engineStation.getStationcode());
		}

        //行宽
        sheet.autoSizeColumn(0, true);
        sheet.autoSizeColumn(1, true);
        sheet.autoSizeColumn(2, true);
        try {
            workBook.write(fout);
            fout.flush();
            fout.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fout.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
*/

}
