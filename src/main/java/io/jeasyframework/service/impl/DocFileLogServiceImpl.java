package io.jeasyframework.service.impl;

import io.jeasyframework.dao.master.DocFileLogDao;
import io.jeasyframework.entity.DocFileLog;
import io.jeasyframework.service.DocFileLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Admin-zbf on 2017/8/18.
 */
@Service("DocFileLogServiceImpl")
public class DocFileLogServiceImpl implements DocFileLogService {
    @Autowired
    DocFileLogDao docFileLogDao;

    @Override
    public int add(DocFileLog docFileLog) {
        return docFileLogDao.insert(docFileLog);
    }
}
