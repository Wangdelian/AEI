package io.jeasyframework.utils;

import io.jeasyframework.config.SiteConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;

/**
 * 创建人：周帮福
 * 时间：2018-3-2 14:04:05
 * email：zbfcqtl@163.com
 * 描述：
 * web文件处理工具类
 * 默认保存路径
 * ** idea启动项目方式------>C:\\Users\\你的windows用户名\\AppData\Local\\Temp\\upload\\
 * ** 外部tomcat启动方式---->..你的tomcat插件存放位置\\apache-tomcat-8.5.24\\webapps\\upload
 * **
 * 版本：20180302001
 * 测试代码：
 * ** 上传
 * ** ** @RequestMapping("/upload") public R upload(@RequestParam MultipartFile file, HttpServletRequest request) {
 * ** ** String path = WebFileUtils.saveFile(file, request);
 * ** ** String[] fileInfomation = new String[3];//文件名、文件类型、文件绝对地址
 * ** ** String[] tempArr = path.split("\\\\");
 * ** ** fileInfomation[0] = tempArr[tempArr.length - 1];
 * ** ** fileInfomation[1] = path.substring(path.indexOf(".") + 1);//Files.probeContentType(source);
 * ** ** fileInfomation[2] = path;
 * ** ** return R.ok().put("info", fileInfomation);
 * **
 * ** 下载
 * ** ** @RequestMapping("/download") public void exportProject(@RequestParam Map<String, Object> params, HttpServletResponse response) {
 * ** ** WebFileUtils.downFile(agTaskAttachEntity.getAttachFilePath(), "任务_" + agTaskEntity.getTaskTitle() + "_附件."
 * ** ** + agTaskAttachEntity.getAttachFileType(), response);
 * ** ** }
 * ** ** }
 **/

public class WebFileUtils {
    /**
     * @param file    controller层获取到的web文件对象，暂时只处理了单文件
     * @param request 这个都熟悉了
     * @return 保存文件的绝对路径
     * 描述：
     * ** 不提供自定义文件名功能，在下载时可以自定义输出文件名，此处自定义文件名功能无意义
     * ** 文件名组成--->当前时间毫秒数_上传的文件名，没有做相同文件内容的文件重复检测，防止上传文件名冲突
     */
    public static String saveFile(MultipartFile file, String webFileUrl, HttpServletRequest request) {
        System.out.println();
        String realPath, rootPath = webFileUrl;

        if (webFileUrl.equals("")) {
            //设置主路径
            realPath = request.getServletContext().getRealPath("");
            //将路径设置到当前项目同级，并创建upload文件夹
            rootPath = new File(realPath).getParent() + "\\upload\\";
        }
        //组合文件名
        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("\\") + 1);
        String filePath = rootPath + filename;
        File localFile = new File(filePath);

        // 检测是否存在目录，不存在则创建
        if (!localFile.getParentFile().exists()) {
            localFile.getParentFile().mkdirs();
        }
        try {
            //保存文件
            file.transferTo(localFile);
        } catch (IOException e) {
            e.printStackTrace();
        }

        //返回文件的绝对路径
        return localFile.getAbsolutePath();
    }

    /**
     * @param fileAbsolutePath 下载文件的绝对路径
     * @param outputFileName   web浏览器下载文件框显示的文件名，tip：请将文件扩展名加载，本方法不处理文件类型
     * @param response         这个都熟悉了
     */
    public static void downFile(String fileAbsolutePath, String outputFileName, HttpServletResponse response) {
        try {
            //下载文件输入流
            InputStream inputStream = new BufferedInputStream(new FileInputStream(fileAbsolutePath));
            byte[] buffer = new byte[inputStream.available()];
            //转换字节码
            inputStream.read(buffer);
            inputStream.close();
            // 清空response
            response.reset();
            // 设置response的Header
            response.setContentType("application/octet-stream");
            response.addHeader("Content-Disposition", "attachment;filename=" +
                    URLEncoder.encode(outputFileName, "UTF-8"));

            OutputStream outputStream = new BufferedOutputStream(response.getOutputStream());
            //输出文件
            outputStream.write(buffer);
            outputStream.flush();
            outputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
