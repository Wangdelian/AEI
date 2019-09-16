package io.jeasyframework.service.impl;

import io.jeasyframework.dao.master.DocFolderDao;
import io.jeasyframework.entity.DocFolder;
import io.jeasyframework.service.DocFolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by Admin-zbf on 2017/8/7.
 */
@Service("docFolderService")
public class DocFolderServiceImpl implements DocFolderService {
    @Autowired
    private DocFolderDao docFolderDao;

    @Override
    public List<DocFolder> queryByParentId(Object parentId) {
        return docFolderDao.selectByParentId(parentId);
    }

    @Override
    public DocFolder queryById(Object folderId) {
        return docFolderDao.selectByPrimaryKey(folderId);
    }

    @Override
    public void deleteFolder(Object folderId) {
        docFolderDao.deleteByPrimaryKey(folderId);
    }

    @Override
    public int addFolder(DocFolder docFolder) {
        if (docFolder.getFolderId() == null)
            return docFolderDao.insert(docFolder);
        else
            return docFolderDao.insertSelective(docFolder);
    }

    @Override
    public int updateFolder(DocFolder docFolder) {
        return docFolderDao.updateByPrimaryKey(docFolder);
    }

    @Override
    public List<DocFolder> queryAll(Map<String, Object> map) {
        return docFolderDao.queryList(map);
    }
}
