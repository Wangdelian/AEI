package io.jeasyframework.controller.docmgr;

import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.DocFile;
import io.jeasyframework.entity.DocFileLog;
import io.jeasyframework.entity.DocFolder;
import io.jeasyframework.service.DocFileLogService;
import io.jeasyframework.service.DocFileService;
import io.jeasyframework.service.DocFolderService;
import io.jeasyframework.utils.ModelAndViewFactory;
import io.jeasyframework.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by Admin-zbf on 2017/8/14.
 *
 * @author zhoubangfu
 * @email zbfcqtl@163.com
 */

@RestController
@RequestMapping("/document/file")
public class DocFileController extends AbstractController {
    @Autowired
    private DocFileService docFileService;
    @Autowired
    private DocFileLogService docFileLogService;
    @Autowired
    private DocFolderService docFolderService;
    @Autowired
    private SiteConfig siteConfig;

    /**
     * 文件详情（方法名不符合，以注释为准）
     *
     * @param fileId
     * @param req
     * @return
     */
    @RequestMapping("/fileDetail/{fileId}")
    public DocFile searchlist(@PathVariable("fileId") Object fileId, HttpServletRequest req) {
        DocFile docFile = docFileService.queryById(fileId);

        //浏览次数加1
        docFile.setVisitCount(docFile.getVisitCount() + 1);
        docFileService.update(docFile);

        //写日志
        this.addLog(fileId, "searchlist", getUser().getChineseName() + "查看了文件ID为" + fileId + "的文件信息");

        return docFile;
    }

    /**
     * 文件夹查询
     *
     * @param folderId
     * @return
     */
    @RequestMapping("/getFileList/{folderId}")
    public List getDocumentList(@PathVariable("folderId") Long folderId) {
        return docFileService.queryByFolderId(folderId);
    }

    /**
     * 删除文件
     *
     * @param fileId
     * @return
     */
    @RequestMapping("/deleteFile/{fileId}")
    public R deleteFile(@PathVariable("fileId") Object fileId) {
        DocFile docFile = docFileService.queryById(fileId);
        docFile.setIsenable(Short.parseShort(0 + ""));

        //写日志
        this.addLog(fileId, "delete", getUser().getChineseName() + "删除了'" + docFile.getFileName() + "'文件");

        return R.ok().put("key", docFileService.update(docFile));
    }

    /**
     * 批量删除文件
     *
     * @param params
     * @return
     */
    @RequestMapping("/deleteFiles")
    public R deleteFiles(@RequestParam Map<String, Object> params) {
        int del = 0;
        if (params.size() != 0) {
            for (int i = 0; i < params.size(); i++) {
                DocFile docFile = docFileService.queryById(params.get("" + i));
                docFile.setIsenable(Short.parseShort(0 + ""));
                del += docFileService.update(docFile);
                //写日志
                this.addLog(params.get("" + i), "deleteMore", getUser().getChineseName() + "删除了第" + del + "个文件，名为'" + docFile.getFileName() + "'");
            }
        }

        return R.ok().put("del", del);
    }

    /**
     * 条件查询
     *
     * @param tempName
     * @return
     */
    @RequestMapping("/queryByConditions/{tempName}")
    public List queryByConditions(@PathVariable("tempName") Object tempName) {
        return docFileService.queryByName(tempName);
    }

    /**
     * 编辑文件信息
     *
     * @param params
     * @return
     */
    @RequestMapping("/editFileDetail")
    public R editFileDetail(@RequestParam Map<String, Object> params) {
        //处理编辑信息
        DocFile docFile = docFileService.queryById(params.get("fileId"));

        String reName = this.generateConflictFileName(docFile.getFileFolderId(), docFile.getFileId(), (String) params.get("fileName"));
        docFile.setFileName(reName);
        docFile.setFileComment(params.get("fileComment") == null ? "无" : ((String) params.get("fileComment")));
        docFile.setMenderId(getUserId());
        docFile.setMdedTime(new Date());
        docFile.setMenderName(getUser().getChineseName());

        //写日志
        this.addLog(docFile.getFileId(), "edit", getUser().getChineseName() + "将文件名'" + (String) params.get("fileName") + "'修改为'" + reName + "'，文件描述修改为'" + docFile.getFileComment() + "'");

        return R.ok().put("key", docFileService.update(docFile));
    }

    /**
     * 上传文件
     *
     * @param file
     * @return
     */
    @ResponseBody
    @RequestMapping("/upload")
    public String uploadFile(@RequestParam MultipartFile file, HttpServletRequest req, HttpServletRequest request) {
        Long folderId = Long.parseLong(req.getParameter("fileId"));

        //设置主路径
        //String rootPath = "C:\\jfw\\upload\\";
        String rootPath = request.getServletContext().getRealPath(
                "//WEB-INF//upload//");

        String filename = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("\\") + 1);
        //String filePath = rootPath + System.currentTimeMillis() + file.getOriginalFilename();
        String filePath = rootPath + System.currentTimeMillis() + filename;
        File localFile = new File(filePath);
        try {
            // 检测是否存在目录
            if (!localFile.getParentFile().exists()) {
                localFile.getParentFile().mkdirs();
            }
            //if (!localFile.exists())
            //    localFile.createNewFile();

            file.transferTo(localFile);
        } catch (IOException e) {
            e.printStackTrace();
        }

        /**
         * 保存文件
         * 1、获得文件及信息
         * 2、生成唯一文件名
         * 3、本地保存文件
         * 4、判断保存成功
         * 5、保存数据库信息及操作日志
         */

        /**保存文件数据库**/
        //取得文件夹信息
        DocFolder docFolder = docFolderService.queryById(folderId);
        DocFile docFile = new DocFile();

        /**构造对象**/
        //创建人名
        docFile.setCreatorName(getUser().getChineseName());
        //创建人id
        docFile.setCreatorId(getUserId());
        //创建时间
        docFile.setCreateTime(new Date());
        //本地文件绝对地址
        docFile.setFilePath(localFile.getPath());
        //文件夹名
        docFile.setFileFolderName(docFolder.getFolderName());
        //文件夹id
        docFile.setFileFolderId(folderId);
        //数据库文件名
        docFile.setFileName(this.generateConflictFileName(folderId, null, filename));
        //文件大小
        docFile.setFileSize(Double.parseDouble(file.getSize() + ""));

        int result = docFileService.add(docFile);

        //写日志，由于没有id，需要查询判断

        this.addLog(docFile.getFileId(), "upload", getUser().getChineseName() + "上传了'" + docFile.getFileName() + "'文件");

        return String.valueOf(result);
    }

    /**
     * 下载文件
     *
     * @param fileId
     * @return
     */
    @RequestMapping("/download/{fileId}")
    public void downFile(@PathVariable("fileId") Object fileId, HttpServletResponse response) {
        try {
            DocFile docFile = docFileService.queryById(fileId);
            File file = new File(docFile.getFilePath());

            //下载次数加一
            docFile.setDownloadCount(docFile.getDownloadCount() + 1);
            docFileService.update(docFile);
            //写日志
            this.addLog(docFile.getFileId(), "downLoad", getUser().getChineseName() + "下载了'" + docFile.getFileName() + "'文件");

            response.setHeader("conent-type", "application/octet-stream");
            response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment; filename=" + file.getName());

            OutputStream os = response.getOutputStream();
            BufferedOutputStream bos = new BufferedOutputStream(os);

            InputStream is = null;

            is = new FileInputStream(file.getPath());
            BufferedInputStream bis = new BufferedInputStream(is);

            int length = 0;
            byte[] temp = new byte[1 * 1024 * 10];

            while ((length = bis.read(temp)) != -1) {
                bos.write(temp, 0, length);
            }
            bos.flush();
            bis.close();
            bos.close();
            is.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     *
     */

    /**
     * 工具，文件大小转换方法
     */
    public String transfer(Double size) {
        String re = null;
        DecimalFormat df = new DecimalFormat("#.00");
        if (size < 1024)
            re = df.format(size) + "B";
        else if (size >= 1024 && size < 1048576)
            re = df.format(size / 1024) + "KB";
        else if (size >= 1048576 && size < 1073741824)
            re = df.format(size / 1048576) + "MB";
        else
            re = df.format(size / 1073741824) + "GB";

        return re;
    }

    /**
     * 通过文件夹id和当前文件名判断生成不冲突的文件名
     *
     * @return
     */
    public String generateConflictFileName(Object folderId, Object fileId, String fileName) {
        String folderTempName = fileName;//不变的文件名
        int conflictTimes = 0;//冲突次数
        Boolean conflict = true;//是否命名冲突
        List<DocFile> list = docFileService.queryByFolderId(folderId);

        if (list.size() == 0)
            return fileName;

        while (conflict) {
            for (DocFile docFile : list) {
                if (docFile.getFileName().equals(fileName) && (fileId == null ? true : !(docFile.getFileId().toString().equals(fileId + "")))) {
                    String[] strs = fileName.split("\\.");
                    if (strs.length != 1)
                        fileName = folderTempName.split("\\." + strs[strs.length - 1])[0] + "(" + ++conflictTimes + ")." + strs[strs.length - 1];
                    break;
                } else if (docFile.equals(list.get(list.size() - 1)))
                    conflict = false;
            }
        }

        return fileName;
    }

    /**
     * 增加一条日志
     *
     * @param fileId
     * @param operateType
     * @param logContent
     * @return
     */
    public int addLog(Object fileId, String operateType, String logContent) {
        DocFileLog docFileLog = new DocFileLog();

        docFileLog.setCreatorName(getUser().getChineseName());
        docFileLog.setCreatorId(getUserId());
        docFileLog.setLogFileId(Long.parseLong("" + fileId));
        docFileLog.setLogOperateType(operateType);
        docFileLog.setLogTime(new Date());
        docFileLog.setLogContent(logContent);

        return docFileLogService.add(docFileLog);
    }
}
