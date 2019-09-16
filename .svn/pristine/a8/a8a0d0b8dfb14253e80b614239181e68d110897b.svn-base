/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.service.impl
 *文件名：  ODMarkServiceImpl
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017-08-31 15:03
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017-08-31 15:03
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.service.impl;

import io.jeasyframework.dao.master.ODMarkDao;
import io.jeasyframework.entity.ODMarkEntity;
import io.jeasyframework.service.ODMarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("ODMarkService")
public class ODMarkServiceImpl implements ODMarkService {
    @Autowired
    ODMarkDao odMarkDao;

    @Override
    /**
     * @method       queryList
     * @description
     * @author       daixirui@gmail.com
     * @date         2017/8/30 10:54
     * @param        [map]
     * @return       java.util.List<io.jeasyframework.entity.ODCncToolService>
     */
    public List<ODMarkEntity> queryList(Map<String, Object> map)
    {
        return odMarkDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return odMarkDao.queryTotal(map);
    }
}
