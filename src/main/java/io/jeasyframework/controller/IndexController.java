
package io.jeasyframework.controller;

import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.entity.LayUINavEntity;
import io.jeasyframework.entity.SysMenuEntity;
import io.jeasyframework.entity.SysSwitchsiteEntity;
import io.jeasyframework.entity.SysUserEntity;
import io.jeasyframework.plugins.codegenerator.service.SysGeneratorService;
import io.jeasyframework.plugins.codegenerator.utils.GenUtils;
import io.jeasyframework.service.SysMenuService;
import io.jeasyframework.service.SysSwitchsiteService;
import io.jeasyframework.service.UserService;
import io.jeasyframework.utils.ModelAndViewFactory;
import io.jeasyframework.utils.R;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipOutputStream;

@RestController
@RequestMapping("/")
public class IndexController extends AbstractController {
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
    @RequestMapping(value="",method = RequestMethod.POST)
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
        String testaaaa=req.getServerName();
        List<SysSwitchsiteEntity> switchsiteEntities=sysSwitchsiteService.queryList(null);
        for(SysSwitchsiteEntity entity : switchsiteEntities) {
            view.addObject("host_ip_"+entity.getSwitchsiteId(),entity.getSwitchsitecode());
        }

        //MailTest.TestSendText();
        return view;
    }

}
