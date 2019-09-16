/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.dao.master
 *文件名：  ODAndonDao
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017-08-30 09:50
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017-08-30 09:50
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.dao.master;
import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.ODAndonEntity;
import org.springframework.stereotype.Repository;

@Repository("ODAndonDao")
public interface ODAndonDao extends BaseDao<ODAndonEntity> {

}
