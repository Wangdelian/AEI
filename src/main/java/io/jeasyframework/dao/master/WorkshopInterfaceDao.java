/*******************************************************
 *Copyright (c) 2018 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.dao.master
 *文件名：  WorkshopInterfaceDao
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2018-03-23 15:22
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2018-03-23 15:22
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.dao.master;

import io.jeasyframework.entity.MESEngineInfo;
import io.jeasyframework.entity.MqsStationEntity;

import java.util.List;
import java.util.Map;

public interface WorkshopInterfaceDao {
    List<MqsStationEntity> queryStaionList(Map<String, Object> map);

    MESEngineInfo querymesenginebasicinfo(Map<String, Object> map);

    MESEngineInfo queryea3mesenginebasicinfo(Map<String, Object> map);

    void updateissuemodel(Map<String, Object> map);

    List<MESEngineInfo> querymesenginebasicinfolist(Map<String, Object> map);

}
