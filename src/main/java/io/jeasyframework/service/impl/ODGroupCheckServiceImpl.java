/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.service.impl
 *文件名：  ODGroupCheckServiceImpl
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017-08-31 14:46
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017-08-31 14:46
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.service.impl;
import java.util.List;
import java.util.Map;

import io.jeasyframework.dao.master.ODGroupCheckDao;
import io.jeasyframework.entity.ODGroupCheckEntity;
import io.jeasyframework.service.ODGroupCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("ODGroupCheckService")
public class ODGroupCheckServiceImpl implements ODGroupCheckService{
    @Autowired
    ODGroupCheckDao odGroupCheckDao;

    @Override
    /**
     * @method       queryList
     * @description
     * @author       daixirui@gmail.com
     * @date         2017/8/30 10:54
     * @param        [map]
     * @return       java.util.List<io.jeasyframework.entity.ODCncToolService>
     */
    public List<ODGroupCheckEntity> queryList(Map<String, Object> map)
    {
        return odGroupCheckDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return odGroupCheckDao.queryTotal(map);
    }
}
