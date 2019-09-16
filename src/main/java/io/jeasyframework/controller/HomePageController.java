/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.controller
 *文件名：  HomePageController 
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017/06/20 14:48
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017/06/20 14:48
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.controller;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.entity.*;
import io.jeasyframework.plugins.codegenerator.service.SysGeneratorService;
import io.jeasyframework.plugins.codegenerator.utils.GenUtils;
import io.jeasyframework.service.SysMenuService;
import io.jeasyframework.service.SysSwitchsiteService;
import io.jeasyframework.service.UserService;
import io.jeasyframework.utils.*;
import io.jeasyframework.utils.dynamicdatasource.DynamicDataSourceContextHolder;
import io.jeasyframework.utils.dynamicdatasource.TargetDataSource;
import io.jeasyframework.utils.encrypt.EncryUtil;
import io.jeasyframework.utils.mail.MailTest;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.lang.model.element.NestingKind;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipOutputStream;


/**
 * Created by daixirui on 2017/6/20.
 */
@RestController
@RequestMapping("/sys/homepage")
public class HomePageController extends AbstractController {
    @Autowired
    private SiteConfig siteConfig;

    @Autowired
    private SysMenuService sysMenuService;
    @Autowired
    private SysGeneratorService sysGeneratorService;
    @Autowired
    private UserService userService;
    @Autowired
    private SysSwitchsiteService sysSwitchsiteService;
    /**
     * 系统默认首页
     * @param req
     * @return
     */
    @RequestMapping(value="/main",method = RequestMethod.POST)
    public ModelAndView main(HttpServletRequest req, HttpServletResponse response) throws IOException {
        String webTitle=siteConfig.getWebTitle();
        int pagesize=siteConfig.getPagesize();
        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/main",this.getUserSkin());
        //ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/UserMgr/userlist",this.getUserSkin());

        //ModelAndView view=mf.CreateModelAndView("","skin1");
        ModelAndView view=mf.CreateModelAndView();
        view.addObject("AuthorName", siteConfig.getAuthorName());
        view.addObject("AuthorUrl", siteConfig.getAuthorUrl());
        view.addObject("Version", siteConfig.getVersion());
        view.addObject("logintoken",this.getLoginToken());
        view.addObject("userid", String.valueOf(this.getUser().getUserId()));
        view.addObject("userextvalue4", this.getUser().getUserextvalue4());
        view.addObject("menuname", this.getUser().getMenuname());
        view.addObject("firstMenuid", this.getUser().getMenuid());
        String testaaaa=req.getServerName();
        /*UserEntity USER=userService.queryObject(1L);

        DynamicDataSourceContextHolder.setDataSourceKey("slaveAlpha");
        UserEntity USER1=userService.queryObject(1L);


        String hhhhhh=this.getCurProductLine();
        this.setCurProductLine("S1");
        String dfdfdfdf=this.getCurProductLine();

        String ltoken=this.getLoginToken();
        String aaaaaa=EncryUtil.decrypt(ltoken);
        String[] aryLogin=aaaaaa.split("\\|");

        SysSwitchsiteEntity sse=sysSwitchsiteService.queryObject(1L);*/
        List<SysSwitchsiteEntity> switchsiteEntities=sysSwitchsiteService.queryList(null);
        for(SysSwitchsiteEntity entity : switchsiteEntities) {
            view.addObject("host_ip_"+entity.getSwitchsiteId(),entity.getSwitchsitecode());
        }

        //MailTest.TestSendText();
        return view;
    }


    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse response) throws IOException {
        String webTitle=siteConfig.getWebTitle();
        int pagesize=siteConfig.getPagesize();
        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/index",this.getUserSkin());
        ModelAndView view=mf.CreateModelAndView();

        return view;
    }

    @RequestMapping("/main_codegen")
    public void main_codegen(HttpServletRequest req, HttpServletResponse response) throws IOException {
        String webTitle=siteConfig.getWebTitle();
        int pagesize=siteConfig.getPagesize();
        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/main",this.getUserSkin());
        //ModelAndView view=mf.CreateModelAndView("","skin1");
        ModelAndView view=mf.CreateModelAndView();
        String test=view.toString();
        String beta="";
        beta="4321";
        String alpha="";
        alpha="1234";
        //total 是模板的全局变量，可以直接访问
        //view.addObject("message","Hello Spring Boot Beetl!");
        /*Map<String, Object> params=new HashMap<String,Object>() ;
        params.put("tableName","");
        Query query = new Query(params);
        List<Map<String, Object>> list = sysGeneratorService.queryList(query);
        for (Map<String, Object> map : list) {
            for (String s : map.keySet()) {
                System.out.print(map.get(s) + "  ");
            }
        }*/
        byte[] data = generatorCode();
        response.reset();
        response.setHeader("Content-Disposition", "attachment; filename=\"jeasyframework.zip\"");
        response.addHeader("Content-Length", "" + data.length);
        response.setContentType("application/octet-stream; charset=UTF-8");

        IOUtils.write(data, response.getOutputStream());



    }

    public byte[] generatorCode() {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ZipOutputStream zip = new ZipOutputStream(outputStream);

        //查询表信息
        Map<String, String> table = sysGeneratorService.queryTable("TB_USER");
        //查询列信息
        List<Map<String, String>> columns = sysGeneratorService.queryColumns("TB_USER");
        //生成代码
        GenUtils.generatorCode(table, columns, zip);
        IOUtils.closeQuietly(zip);
        return outputStream.toByteArray();
    }

    /**
     * 系统默认功能菜单页（只针对default皮肤）
     * @param req
     * @return
     *
     */
    @RequestMapping("/nav")
    public ModelAndView nav(HttpServletRequest req) {
        SysUserEntity user=getUser();
        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/nav","");
        //ModelAndView view=mf.CreateModelAndView("","skin1");
        ModelAndView view=mf.CreateModelAndView();
        //total 是模板的全局变量，可以直接访问
        view.addObject("alpha","true");
        return view;
    }

    /**
     * 系统功能菜单页Json格式
     * @return
     */
    @RequestMapping("/navforjson")
    public R NavforJson()
    {
        Long userId=this.getUserId();
        List<SysMenuEntity> userMenu=sysMenuService.getUserMenuList(userId);
        List<LayUINavEntity> userLayUINav=sysMenuService.toLayUINav(userMenu);
        return R.ok().put("nav", userLayUINav);
    }

    //账号登录过程被禁用，跳转登录页面
    @ResponseBody
    @RequestMapping(value = "/loginFailStatus",method = RequestMethod.GET)
    public ModelAndView loginFailStatus(HttpServletRequest req,String userName, String password) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/loginStatus","");
        ModelAndView view=mf.CreateModelAndView();

        view.addObject("autoName",userName);
        view.addObject("autoPwd",password);


        return view;
    }

    //账号异地登录跳转登录页面
    @ResponseBody
    @RequestMapping(value = "/loginWrong",method = RequestMethod.GET)
    public ModelAndView loginWrong(HttpServletRequest req,String userName, String password) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/loginPlace","");
        ModelAndView view=mf.CreateModelAndView();

        view.addObject("autoName",userName);
        view.addObject("autoPwd",password);


        return view;
    }

    //账号密码更改
    @ResponseBody
    @RequestMapping(value = "/pwChange",method = RequestMethod.GET)
    public ModelAndView pwChange(HttpServletRequest req,String userName, String password) {

        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/loginPwchange","");
        ModelAndView view=mf.CreateModelAndView();

        view.addObject("autoName",userName);
        view.addObject("autoPwd",password);


        return view;
    }

    //提示用户同一个浏览器不能登录两个用户

    @ResponseBody
    @RequestMapping(value = "/loginTwo",method = RequestMethod.GET)
    public String loginTwo() {
        return "loginTwo";
    }

}
