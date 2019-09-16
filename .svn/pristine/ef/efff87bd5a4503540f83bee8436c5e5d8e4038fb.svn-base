package io.jeasyframework.config;

import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.SysUserEntity;
import io.jeasyframework.service.SysUserService;
import io.jeasyframework.service.SysUserTokenService;
import io.jeasyframework.utils.ShiroUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class SessionConfig extends AbstractController implements HandlerInterceptor {
    @Autowired
    private SysUserTokenService sysUserTokenService;
    @Autowired
    private SysUserService sysUserService;
    Map<String,List<String>> map = new HashMap();

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        SysUserEntity obj = this.getUser();
        //获取请求中的用户名,判断是否同一个浏览器登录两个用户
        String username = httpServletRequest.getParameter("username");
        String  RequestURI = httpServletRequest.getRequestURI();
        if(RequestURI.equals("/sys/login") &&username!=null && !"".equals(username) && obj!=null && obj.getUsername()!= null){
            if(!username.equals(obj.getUsername())){
                httpServletResponse.sendRedirect(httpServletRequest.getContextPath()+"/sys/homepage/loginTwo");
                return false;
            }
        }
        String session = httpServletRequest.getSession().getId();
        String path = httpServletRequest.getServletPath();
        SysUserEntity user =(SysUserEntity) SecurityUtils.getSubject().getPrincipal();
        if(user!=null&&user.getUserId()!=null){
            SysUserEntity temp = sysUserService.queryObject(user.getUserId());
            //用户已被禁用
            if(temp!=null && temp.getStatus()!=null && temp.getStatus() == 0){
                sysUserTokenService.logout(obj.getUserId());
                ShiroUtils.logout();
                httpServletResponse.sendRedirect(httpServletRequest.getContextPath()+"/sys/homepage/loginFailStatus");
                return false;
            }else if(temp!=null && temp.getPassword()!=null && !temp.getPassword().equals(user.getPassword())){
                sysUserTokenService.logout(obj.getUserId());
                ShiroUtils.logout();
                httpServletResponse.sendRedirect(httpServletRequest.getContextPath()+"/sys/homepage/pwChange");
                return false;
            }
        }
        //用户不为空
        if(obj!=null){
            if(map.get(obj.getUserId().toString())!=null){
                List list = map.get(obj.getUserId().toString());
                //是否是第一次登陆
                if(list.size()==0){
                    //添加session
                    list.set(0,session);
                }else{
                    //获取当前session在列表中的位置
                    // 在集合中的位置等于-1为新开页面
                    if(list.indexOf(session)==-1){
                        // 新开页面session放集合第一位
                        list.add(0,session);
                    }
                    // 在集合中的位置大于0为历史页面,
                    //异地登录
                    /*else if(list.indexOf(session)>0){
                        // 重定向至login并删除session
                        // 删除list中的第1个之后的session
                        list = list.subList(0,2);
                        map.replace(obj.getUserId().toString(),list);
                        sysUserTokenService.logout(obj.getUserId());
                        ShiroUtils.logout();
                        httpServletResponse.sendRedirect(httpServletRequest.getContextPath()+"/sys/homepage/loginWrong");
                        return false;

                    }*/
                }
            }else{
                ArrayList list = new ArrayList<String>();
                list.add(session);
                map.put(obj.getUserId().toString(),list);
            }
        }

//        System.out.println("拦截器进来了000000");
//
//        System.out.println(httpServletRequest.getSession().getId());

//        SysUserEntity user = this.getUser();
//        if(user!=null){
//            String sessionAgo = user.getUserPhoto();
//            Object obj = httpServletRequest.getSession().getId();
//            if(sessionAgo!=null&&!obj.equals(sessionAgo)){
//                httpServletRequest.removeAttribute(sessionAgo);
//
//            }
//        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
