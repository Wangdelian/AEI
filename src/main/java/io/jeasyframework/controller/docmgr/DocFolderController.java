package io.jeasyframework.controller.docmgr;

import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.DocFolder;
import io.jeasyframework.entity.DocFolderLog;
import io.jeasyframework.service.DocFolderLogService;
import io.jeasyframework.service.DocFolderService;
import io.jeasyframework.utils.ModelAndViewFactory;
import io.jeasyframework.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by Admin-zbf on 2017/8/7.
 */
@RestController
@RequestMapping("/document/folder")
public class DocFolderController extends AbstractController {
    @Autowired
    DocFolderService docFolderService;
    @Autowired
    DocFolderLogService docFolderLogService;
    @Autowired
    private SiteConfig siteConfig;

    /**
     * 初始化主页面
     *
     * @param req
     * @return
     */
    @RequestMapping("/initializeDocumentList")
    public ModelAndView mainPage(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/FileSystem/docMain", this.getUserSkin());
        ModelAndView view = mf.CreateModelAndView();

        return view;
    }

    /**
     * 获取文件夹列表
     *
     * @param params
     * @return
     * @throws InterruptedException
     */
    @RequestMapping("/getDocumentList")
    public List<DocFolder> getDocumentList(@RequestParam Map<String, Object> params) throws InterruptedException {
        //判断根目录是否存在，不存在，则创建
        if (docFolderService.queryById(params.get("folderId")) == null) {
            DocFolder root = new DocFolder();
            root.setFolderId(1000000l);
            root.setFolderName("全部文件");
            root.setCreateTime(new Date());
            root.setCreatorId(getUserId());
            root.setCreatorName(getUser().getChineseName());

            docFolderService.addFolder(root);
        }

        return docFolderService.queryByParentId(params.get("folderId"));
    }

    /**
     * 获得文件夹信息
     *
     * @param folderId
     * @return
     */
    @RequestMapping("/getFolder/{folderId}")
    public R getFolder(@PathVariable Object folderId) {
        //写日志
        this.addLog(folderId, "query", getUser().getChineseName() + "查询了编号为'" + folderId + "'的信息");
        return R.ok().put("folder", docFolderService.queryById(folderId));
    }

    /**
     * 新增文件夹
     *
     * @param treeNode
     * @return
     */
    @RequestMapping("/addFolder")
    public R addFolder(@RequestBody Map<String, Object> treeNode) {
        String folderName = this.generateConflictFolderName(treeNode);

        //构造文件夹对象
        DocFolder newFolder = new DocFolder(folderName, new Date(), getUserId(), getUser().getChineseName(), Long.parseLong(treeNode.get("parentId") + ""), (Boolean) treeNode.get("isParent"));
        if (docFolderService.addFolder(newFolder) != 1)
            return R.error("新建文件夹失败！");

        //写日志
        this.addLog(newFolder.getFolderId(), "add", getUser().getChineseName() + "创建了'" + newFolder.getFolderName() + "'文件夹");

        return R.ok();
    }

    /**
     * 删除文件夹
     *
     * @param folderId
     * @return
     */
    @RequestMapping("/delFolder/{folderId}")
    public R delFolder(@PathVariable Object folderId) {


        //设置不可见，需要查找一次对象，修改isEnable
        DocFolder docFolder = docFolderService.queryById(folderId);
        docFolder.setIsenable(Short.parseShort("0"));

        //写日志
        this.addLog(folderId, "delete", getUser().getChineseName() + "删除了名为'" + docFolder.getFolderName() + "'的文件夹");

        return R.ok().put("deleteR", docFolderService.updateFolder(docFolder));
    }

    /**
     * 编辑文件夹
     *
     * @param treeNode
     * @return
     */
    @RequestMapping("/editFolder")
    public R editFolder(@RequestBody Map<String, Object> treeNode) {
        //判断命名是否冲突
        String folderName = this.generateConflictFolderName(treeNode);
        if (!folderName.equals(treeNode.get("folderName")))
            return R.error("文件夹命名冲突！");

        //构造文件夹对象
        DocFolder docFolder = docFolderService.queryById(Long.parseLong(treeNode.get("folderId") + ""));
        //修改项
        docFolder.setFolderName(folderName);
        docFolder.setMenderId(getUserId());
        docFolder.setMendTime(new Date());
        docFolder.setMenderName(getUser().getChineseName());
        docFolder.setParentId(Long.parseLong(treeNode.get("parentId") + ""));

        int t = docFolderService.updateFolder(docFolder);

        if (t != 1)
            return R.error("重命名失败！");
        else
            this.addLog(docFolder.getFolderId(), "edit", getUser().getChineseName() + "修改'" + docFolder.getFolderId() + "'号文件夹名为'" + docFolder.getFolderName() + "'");
        return R.ok();
    }


    /**
     * 生成文件名，当文件名冲突的时候
     *
     * @param param
     * @return
     */
    public String generateConflictFolderName(Map<String, Object> param) {
        String folderName = (String) param.get("folderName");
        String folderTempName = folderName;//不变的文件名
        int conflictTimes = 0;//冲突次数
        Boolean conflict = true;//是否命名冲突
        List<DocFolder> list = docFolderService.queryByParentId(param.get("parentId"));

        if (list.size() == 0)
            return folderName;

        while (conflict) {
            for (DocFolder docFolder : list) {
                if (docFolder.getFolderName().equals(folderName) && !(docFolder.getFolderId().toString().equals(param.get("folderId") == null ? "" : param.get("folderId") + ""))) {
                    folderName = folderTempName + "(" + ++conflictTimes + ")";
                    break;
                } else if (docFolder.equals(list.get(list.size() - 1)))
                    conflict = false;
            }
        }

        return folderName;
    }


    /**
     * 写日志
     */
    public int addLog(Object folderId, String operateType, String logContent) {
        DocFolderLog docFolderLog = new DocFolderLog();

        docFolderLog.setCreatorId(getUserId());
        docFolderLog.setCreatorName(getUser().getChineseName());
        docFolderLog.setLogContent(logContent);
        docFolderLog.setLogFolderId(Long.parseLong("" + folderId));
        docFolderLog.setLogOperateType(operateType);
        docFolderLog.setLogTime(new Date());

        return docFolderLogService.add(docFolderLog);
    }
}
