/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.dao
 *文件名：  MqsDao 
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017/06/28 17:10
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017/06/28 17:10
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.dao.cluster;

import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.SysLogEntity;
import org.springframework.stereotype.Repository;

/**
 * Created by daixirui on 2017/6/28.
 */
@Repository
public interface MqsDao extends BaseDao<SysLogEntity> {
}
