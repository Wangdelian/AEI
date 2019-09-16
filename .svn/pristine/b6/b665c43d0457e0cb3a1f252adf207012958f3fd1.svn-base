/*******************************************************
 *Copyright (c) 2018 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.utils.dynamicdatasource
 *文件名：  TargetDataSource
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2018-03-06 09:29
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2018-03-06 09:29
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.utils.dynamicdatasource;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 在方法上使用，用于指定使用哪个数据源
 *
 * @author   单红宇(365384722)
 * @myblog  http://blog.csdn.net/catoop/
 * @create    2016年1月23日
 */
@Target({ ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface TargetDataSource {
    String name();
}