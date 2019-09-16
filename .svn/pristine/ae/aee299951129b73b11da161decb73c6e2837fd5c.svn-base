package io.jeasyframework.service.impl;

import io.jeasyframework.dao.master.DocFolderLogDao;
import io.jeasyframework.entity.DocFolderLog;
import io.jeasyframework.service.DocFolderLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Admin-zbf on 2017/8/18.
 */
@Service("DocFolderLogServiceImpl")
public class DocFolderLogServiceImpl implements DocFolderLogService {
    @Autowired
    DocFolderLogDao docFolderLogDao;

    @Override
    public int add(DocFolderLog docFolderLog) {
        return docFolderLogDao.insert(docFolderLog);
    }
}
