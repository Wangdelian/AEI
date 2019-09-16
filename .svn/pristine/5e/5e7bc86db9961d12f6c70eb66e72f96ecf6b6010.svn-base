/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.service
 *文件名：  NetbarServices
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017-11-07 14:31
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017-11-07 14:31
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.service;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

@WebService(name = "NetbarServices", // 暴露服务名称
        targetNamespace = "http://service.jeasyframework.io/"// 命名空间,一般是接口的包名倒序
)
public interface NetbarServices {
    //http://localhost:8080/JFK/services/NetbarServices?wsdl
    @WebMethod
    String sayHello(@WebParam(name = "userName") String name);
}
