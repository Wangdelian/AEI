/*******************************************************
 *Copyright (c) 2018 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.service.impl
 *文件名：  WorkshopInterfaceServiceImpl
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2018-03-23 15:07
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2018-03-23 15:07
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.service.impl;

import io.jeasyframework.dao.master.WorkshopInterfaceDao;
import io.jeasyframework.entity.MESEngineInfo;
import io.jeasyframework.entity.MqsStationEntity;
import io.jeasyframework.service.WorkshopInterfaceService;
import io.jeasyframework.utils.dynamicdatasource.TargetDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("WorkshopInterfaceService")
public class WorkshopInterfaceServiceImpl implements WorkshopInterfaceService {
    @Autowired
    private WorkshopInterfaceDao workshopInterfaceDao;


    @Override
    public List<MqsStationEntity> queryStaionList(Map<String, Object> map) {
        return workshopInterfaceDao.queryStaionList(map);
    }

    @Override
    public MESEngineInfo querymesenginebasicinfo(Map<String, Object> map) {
        return workshopInterfaceDao.querymesenginebasicinfo(map);
    }

    @Override
    public MESEngineInfo queryea3mesenginebasicinfo(Map<String, Object> map) {
        return workshopInterfaceDao.queryea3mesenginebasicinfo(map);
    }

    @Override
    public void updateissuemodel(Map<String, Object> map) {

    }

    @Override
    public List<MESEngineInfo> querymesenginebasicinfolist(Map<String, Object> map) {
        return workshopInterfaceDao.querymesenginebasicinfolist(map);
    }
}
