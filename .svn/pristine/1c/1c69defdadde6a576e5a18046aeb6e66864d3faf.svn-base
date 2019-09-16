/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.service.impl
 *文件名：  NetbarServicesImpl
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017-11-07 14:32
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017-11-07 14:32
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.service.impl;

import io.jeasyframework.service.NetbarServices;
import org.springframework.stereotype.Component;

import javax.jws.WebService;

@WebService(serviceName = "NetbarServices"//服务名
        ,targetNamespace = "http://service.jeasyframework.io"//报名倒叙，并且和接口定义保持一致
        ,endpointInterface = "io.jeasyframework.service.NetbarServices")//包名
@Component
public class NetbarServicesImpl implements NetbarServices {
    @Override
    public String sayHello(String name) {
        return "hello , "+ name;
    }
}