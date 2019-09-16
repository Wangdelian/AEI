/*******************************************************
 *Copyright (c) 2018 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.service
 *文件名：  SysSwitchsiteService
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2018-03-16 10:04
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2018-03-16 10:04
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.service;

import io.jeasyframework.entity.SysSwitchsiteEntity;

import java.util.List;
import java.util.Map;

/**
 * ${comments}
 *
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-03-16 09:48:20
 */
public interface SysSwitchsiteService {

    SysSwitchsiteEntity queryObject(Long switchsiteId);

    List<SysSwitchsiteEntity> queryList(Map<String, Object> map);

    int queryTotal(Map<String, Object> map);

    void save(SysSwitchsiteEntity sysSwitchsite);

    void update(SysSwitchsiteEntity sysSwitchsite);

    void delete(Long switchsiteId);

    void deleteBatch(Long[] switchsiteIds);
}
