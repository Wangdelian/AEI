/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.utils
 *文件名：  ModelAndViewFactory 
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017/06/16 2017/6/16
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017/06/16
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.utils;

import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.entity.SysSwitchsiteEntity;
import io.jeasyframework.entity.SysUserEntity;
import org.beetl.core.Configuration;
import org.beetl.core.GroupTemplate;
import org.beetl.core.Template;
import org.beetl.core.resource.FileResourceLoader;
import org.beetl.core.resource.StringTemplateResourceLoader;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by daixirui on 2017/6/16.
 */
public  class ModelAndViewFactory {

    private SiteConfig siteConfig;
    private String TopNavBarTemplatePath="/static/templates/skin1/template/Common/TopNavBar.html";
    private String SideMenuTemplatePath="/static/templates/skin1/template/Common/SideMenu.html";
    //局部变量
    public HttpServletRequest request;
    public String viewName="";
    public String skinName="default";


    protected SysUserEntity getUser()
    {
        if (ShiroUtils.isLogin()==true)
        {return ShiroUtils.getUserEntity();}
        else
        {return new SysUserEntity();}

    }

    protected Long getUserId() {
        return getUser().getUserId();
    }
    /**
     * 构造函数
     * @param _req
     *       HttpServletRequest对象
     * @param _siteConfig
     *       站点配置对象
     * @param _viewName
     *       视频名称
     * @param _skinName
     *       皮肤名称,默认default
     */
    public ModelAndViewFactory(HttpServletRequest _req,SiteConfig _siteConfig,String _viewName,String _skinName)
    {
        request=_req;
        viewName=_viewName;
        skinName=_skinName;
        siteConfig=_siteConfig;
    }

    public ModelAndView CreateModelAndView()
    {
        String siteurl=request.getContextPath();
        return this.CreateModelAndView(siteurl,skinName);
    }

    public ModelAndView CreateModelAndView(String _siteUrl)
    {
        return this.CreateModelAndView(_siteUrl,skinName);
    }

    public ModelAndView CreateModelAndView(String _siteUrl,String _skinName)
    {
        if (_skinName.equals(""))
        {
            _skinName="default";
        }
        if (!_siteUrl.equals(""))
        {
            _siteUrl=_siteUrl;
        }
        SysSwitchsiteEntity sse=(SysSwitchsiteEntity)ShiroUtils.getSessionAttribute("sse");
        ModelAndView view=new ModelAndView("/"+_skinName+"/"+viewName);

        view=this.initSetGlobalUI(view);
        //view=this.initSetTopNavBar(view);
        //view=this.initSetSideMenu(view);
        view=this.initGlobalToken(view);
        if (sse!=null)
        {
            view.addObject("switchsitename",sse.getSwitchsitename());
        }

        view.addObject("siteurl",_siteUrl);
        view.addObject("sitehost",request.getServerName());
        view.addObject("username",this.getUser().getChineseName());
        view.addObject("levelmarkid",this.getUser().getLevelmarkid());
        view.addObject("abname",this.getUser().getAbname());
        view.addObject("abnameTotal",this.getUser().getAbnameTotal());
        view.addObject("levelmarkidTotal",this.getUser().getLevelmarkidTotal());

        return view;
    }

    /**
     * 替换全局UI对象
     */
    private ModelAndView initSetGlobalUI(ModelAndView view)
    {
        view.addObject("webtitle",siteConfig.getWebTitle());
        return view;
    }

    private ModelAndView initGlobalToken(ModelAndView view)
    {
        SysUserEntity user=this.getUser();
        List<Long> menuIdList=user.getMenuIdList();
        if (menuIdList==null)
        {
            return view;
        }
        if (menuIdList.size()>0)
        {
            for (int i=0;i<menuIdList.size();i++)
            {
                Long mId=menuIdList.get(i);
                view.addObject("token_"+String.valueOf(mId),"true");
            }
        }
        return view;
    }

    /**
     * 替换顶部导航栏
     */
    private ModelAndView initSetTopNavBar(ModelAndView view)
    {
        String root=getClass().getProtectionDomain().getCodeSource().getLocation().toString().replace("file:/","");
        root=root.replace("%20"," ");
        FileResourceLoader resourceLoader = new FileResourceLoader(root,"utf-8");
        GroupTemplate gt = new GroupTemplate();
        gt.setResourceLoader(resourceLoader);
        Template templateTopNavBar = gt.getTemplate(TopNavBarTemplatePath);
        if (this.getUser()!=null)
        {
            templateTopNavBar.binding("username", this.getUser().getChineseName());
        }

        String strTopNavBar=templateTopNavBar.render();
        view.addObject("topnavbar",strTopNavBar);
        view.addObject("root",root);
        return view;
    }

    /**
     * 替换菜单栏(功能菜单)
     */
    private ModelAndView initSetSideMenu(ModelAndView view)
    {
        String root=getClass().getProtectionDomain().getCodeSource().getLocation().toString().replace("file:/","");
        FileResourceLoader resourceLoader = new FileResourceLoader(root,"utf-8");
        GroupTemplate gt = new GroupTemplate();
        gt.setResourceLoader(resourceLoader);
        Template templateMenu = gt.getTemplate(SideMenuTemplatePath);
        if (this.getUser()!=null)
        {
            templateMenu.binding("username", this.getUser().getChineseName());
        }

        String strTopNavBar=templateMenu.render();
        view.addObject("sidemenu",strTopNavBar);
        view.addObject("root",root);
        return view;
    }
}
