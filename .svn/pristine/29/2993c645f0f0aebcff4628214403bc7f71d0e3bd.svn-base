/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.service.impl
 *文件名：  ODTightenServiceImpl
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017-09-01 16:29
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017-09-01 16:29
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.service.impl;
import io.jeasyframework.dao.master.ODTightenDao;
import io.jeasyframework.entity.ODTightenEntity;
import io.jeasyframework.service.ODTightenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("ODTightenService")
public class ODTightenServiceImpl implements ODTightenService{
    @Autowired
    ODTightenDao odTightenDao;

    @Override
    /**
     * @method       queryList
     * @description
     * @author       daixirui@gmail.com
     * @date         2017/8/30 10:54
     * @param        [map]
     * @return       java.util.List<io.jeasyframework.entity.ODCncToolService>
     */
    public List<ODTightenEntity> queryList(Map<String, Object> map)
    {
        return odTightenDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return odTightenDao.queryTotal(map);
    }
}
