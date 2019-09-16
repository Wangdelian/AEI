package io.jeasyframework.utils.aop;

import com.alibaba.fastjson.JSON;
import io.jeasyframework.utils.annotation.SysLog;
import io.jeasyframework.entity.SysLogEntity;
import io.jeasyframework.service.SysLogService;
import io.jeasyframework.utils.HttpContextUtils;
import io.jeasyframework.utils.IPUtils;
import io.jeasyframework.utils.ShiroUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.util.*;


/**
 * 系统日志，切面处理类
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017年3月8日 上午11:07:35
 */
@Aspect
@Component
public class SysLogAspect {
    @Autowired
    private SysLogService sysLogService;

    @Pointcut("@annotation(io.jeasyframework.utils.annotation.SysLog)")
    public void logPointCut() {

    }

    @Before("logPointCut()")
    public void saveSysLog(JoinPoint joinPoint) {

        /*
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();

        SysLogEntity sysLog = new SysLogEntity();
        SysLog syslog = method.getAnnotation(SysLog.class);
        if (syslog != null) {
            //注解上的描述
            sysLog.setOperation(syslog.value());
            sysLog.setOperationtype(syslog.type());
        }

        //请求的方法名
        String className = joinPoint.getTarget().getClass().getName();
        String methodName = signature.getName();
        sysLog.setMethod(className + "." + methodName + "()");

        //请求的参数
        Object[] args = joinPoint.getArgs();

        //图片中的字符串太长了，数据库params字段存不下，也没有必要显示出来，所以有的话就移掉
        String params = "";
        Object obj = "";
        if(args.length != 0){
            if (args[0].toString().contains("data:image/png")) {
                LinkedHashMap argsmapnow = new LinkedHashMap();
                argsmapnow.putAll((LinkedHashMap) args[0]);
                for (Iterator<HashMap.Entry> it = argsmapnow.entrySet().iterator(); it.hasNext(); ) {
                    HashMap.Entry item = it.next();
                    if(item.getValue().toString().contains("data:image/png")){
                        it.remove();
                    }
                }
                obj = argsmapnow;
            } else {
                obj = args[0];
            }
        }
        try{
            params = JSON.toJSONString(obj);
        }catch (Exception e){
            System.out.println("不转了");
        }

        sysLog.setParams(params);

        //获取request
        HttpServletRequest request = HttpContextUtils.getHttpServletRequest();
        //设置IP地址
        sysLog.setIp(IPUtils.getIpAddr(request));

        //用户名
        String username = "";
        if(ShiroUtils.getUserEntity()!=null){
            username = ShiroUtils.getUserEntity().getUsername();
        }else{
            //用户登录，ShiroUtils里面没有，从请求参数获取用户
            username = args[1].toString();
        }
        sysLog.setUsername(username);

        sysLog.setCreateDate(new Date());
        //保存系统日志
        sysLogService.save(sysLog);
        **/
    }


    //
    public static SysLogEntity makeLog(String operation,String operationtype,Object args,Boolean result){
        SysLogEntity sysLog = new SysLogEntity();
        sysLog.setOperation(operation);
        sysLog.setOperationtype(operationtype);
        String className = Thread.currentThread().getStackTrace()[1].getClassName();
        String methodName = Thread.currentThread().getStackTrace()[1].getMethodName();
        //获取request
        HttpServletRequest request = HttpContextUtils.getHttpServletRequest();
        //设置IP地址
        sysLog.setIp(IPUtils.getIpAddr(request));

        sysLog.setMethod(className + "." + methodName + "()");

        //图片中的字符串太长了，数据库params字段存不下，也没有必要显示出来，所以有的话就移掉
        String params = "";
        Object obj = "";
        if(args!=null){
            if (args.toString().contains("data:image/png")) {
                LinkedHashMap argsmapnow = new LinkedHashMap();
                argsmapnow.putAll((LinkedHashMap) args);
                for (Iterator<HashMap.Entry> it = argsmapnow.entrySet().iterator(); it.hasNext(); ) {
                    HashMap.Entry item = it.next();
                    if(item.getValue().toString().contains("data:image/png")){
                        it.remove();
                    }
                }
                obj = argsmapnow;
            } else {
                obj = args;
            }
        }
        try{
            params = JSON.toJSONString(obj);
        }catch (Exception e){
            System.out.println("不转了");
        }
        sysLog.setParams(params);
        //用户名
        String username = "";
        String chineseNmae = "";
        if(ShiroUtils.getUserEntity()!=null){
            username = ShiroUtils.getUserEntity().getUsername();
            chineseNmae = ShiroUtils.getUserEntity().getChineseName();
        }
        sysLog.setUsername(username);
        sysLog.setChineseName(chineseNmae);

        sysLog.setCreateDate(new Date());
        if(result){
            sysLog.setResult("成功");
        }else{
            sysLog.setResult("失败");
        }

        return sysLog;

    }
}
