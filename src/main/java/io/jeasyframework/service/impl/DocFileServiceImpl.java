package io.jeasyframework.service.impl;

import io.jeasyframework.dao.master.DocFileDao;
import io.jeasyframework.entity.DocFile;
import io.jeasyframework.service.DocFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Admin-zbf on 2017/8/14.
 */
@Service("DocFileServiceImpl")
public class DocFileServiceImpl implements DocFileService {
    @Autowired
    DocFileDao docFileDao;

    @Override
    public List<DocFile> queryByFolderId(Object fileFolderId) {
        return docFileDao.selectByFolderId(fileFolderId);
    }

    @Override
    public int add(DocFile docFile) {
        return docFileDao.insert(docFile);
    }

    @Override
    public DocFile queryById(Object fileId) {
        return docFileDao.selectByPrimaryKey(fileId);
    }

    @Override
    public int update(DocFile docFile) {
        return docFileDao.updateByPrimaryKey(docFile);
    }

    @Override
    public int delete(Object fileId) {
        return docFileDao.deleteByPrimaryKey(fileId);
    }

    @Override
    public List<DocFile> queryByName(Object fileName) {
        return docFileDao.selectByFileName(fileName);
    }
}
