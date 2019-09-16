/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.service
 *文件名：  ODCncToolService
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017-08-31 14:04
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017-08-31 14:04
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.service;
import java.util.List;
import java.util.Map;
import io.jeasyframework.entity.ODCncToolEntity;
public interface ODCncToolService {

    List<ODCncToolEntity> queryList(Map<String, Object> map);

    int queryTotal(Map<String, Object> map);
}
