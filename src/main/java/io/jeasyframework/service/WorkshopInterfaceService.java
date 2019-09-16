/*******************************************************
 *Copyright (c) 2018 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.service
 *文件名：  WorkshopInterfaceService
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2018-03-23 15:06
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2018-03-23 15:06
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.service;

import io.jeasyframework.entity.MESEngineInfo;
import io.jeasyframework.entity.MqsStationEntity;
import io.jeasyframework.utils.dynamicdatasource.TargetDataSource;

import java.util.List;
import java.util.Map;

public interface WorkshopInterfaceService {
    List<MqsStationEntity> queryStaionList(Map<String, Object> map);

    MESEngineInfo querymesenginebasicinfo(Map<String, Object> map);

    MESEngineInfo queryea3mesenginebasicinfo(Map<String, Object> map);

    void updateissuemodel(Map<String, Object> map);

    List<MESEngineInfo> querymesenginebasicinfolist(Map<String, Object> map);

}
