/*******************************************************
 *Copyright (c) 2018 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.service.impl
 *文件名：  SysSwitchsiteServiceImpl
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2018-03-16 10:06
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2018-03-16 10:06
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import io.jeasyframework.dao.master.SysSwitchsiteDao;
import io.jeasyframework.entity.SysSwitchsiteEntity;
import io.jeasyframework.service.SysSwitchsiteService;



@Service("sysSwitchsiteService")
public class SysSwitchsiteServiceImpl implements SysSwitchsiteService {
    @Autowired
    private SysSwitchsiteDao sysSwitchsiteDao;

    @Override
    public SysSwitchsiteEntity queryObject(Long switchsiteId){
        return sysSwitchsiteDao.queryObject(switchsiteId);
    }

    @Override
    public List<SysSwitchsiteEntity> queryList(Map<String, Object> map){
        return sysSwitchsiteDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map){
        return sysSwitchsiteDao.queryTotal(map);
    }

    @Override
    public void save(SysSwitchsiteEntity sysSwitchsite){
        sysSwitchsiteDao.save(sysSwitchsite);
    }

    @Override
    public void update(SysSwitchsiteEntity sysSwitchsite){
        sysSwitchsiteDao.update(sysSwitchsite);
    }

    @Override
    public void delete(Long switchsiteId){
        sysSwitchsiteDao.delete(switchsiteId);
    }

    @Override
    public void deleteBatch(Long[] switchsiteIds){
        sysSwitchsiteDao.deleteBatch(switchsiteIds);
    }

}
