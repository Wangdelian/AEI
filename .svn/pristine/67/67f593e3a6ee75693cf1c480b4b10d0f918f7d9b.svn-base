package io.jeasyframework.controller.system;

import com.github.pagehelper.PageHelper;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.entity.UserSkinEntity;
import io.jeasyframework.service.UserSkinService;
import io.jeasyframework.utils.ModelAndViewFactory;
import io.jeasyframework.utils.PageUtils;
import io.jeasyframework.utils.Query;
import io.jeasyframework.utils.R;
import io.jeasyframework.utils.validator.ValidatorUtils;
import io.jeasyframework.utils.validator.group.AddGroup;
import io.jeasyframework.utils.validator.group.UpdateGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Created by hh on 2017/7/26.
 */
@Controller
@RequestMapping("/sys/userskin")
public class UserSkinController {
    @Autowired
    private UserSkinService userSkinService;
    @Autowired
    private SiteConfig siteConfig;


    /**
     * 初始化用户皮肤列表
     * @param req
     * @return
     */
    @RequestMapping("/searchlist")
    public ModelAndView searchlist(HttpServletRequest req) {
        String webTitle=siteConfig.getWebTitle();
        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/UserSkinMgr/skinlist","");
        ModelAndView view=mf.CreateModelAndView();
        return view;
    }

    /**
     * 初始化编辑用户皮肤界面
     * @param req
     * @return
     */
    @RequestMapping("/editskin/{userskinid}")
    public ModelAndView editlog(HttpServletRequest req,@PathVariable("userskinid") Long userskinid) {
        String webTitle=siteConfig.getWebTitle();
        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/UserSkinMgr/editskin","");

        ModelAndView view=mf.CreateModelAndView();

        view.addObject("userskinid",userskinid);
        return view;
    }

    /**
     * 初始化列表,带条件的查询
     */
    @ResponseBody
    @RequestMapping(value = "/list/{pageNum}" , method = RequestMethod.POST)
    public R list(@RequestBody Map<String, Object> params, @PathVariable("pageNum")int pageNum){

        PageHelper.startPage(pageNum, 8);
        Query query = new Query(params);

        List<UserSkinEntity>  userskinList = userSkinService.queryList(query);
        int total = userSkinService.queryTotal(query);
        PageUtils pageUtil = new PageUtils(userskinList, total, query.getLimit(), query.getPage());
        return R.ok().put("page", pageUtil);
    }

    /**
     * 初始化新增皮肤界面
     * @param req
     * @return
     */
    @RequestMapping("/addskin")
    public ModelAndView addlog(HttpServletRequest req) {
        String webTitle=siteConfig.getWebTitle();
        ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/UserSkinMgr/addskin","");

        ModelAndView view=mf.CreateModelAndView();
        return view;
    }


    /**
     * 保存皮肤
     */
    @ResponseBody
    @RequestMapping("/save")
    public R save(@RequestBody UserSkinEntity userskin){
        ValidatorUtils.validateEntity(userskin, AddGroup.class);

        userSkinService.save(userskin);
        return R.ok();
    }

    /**
     * 用户皮肤信息
     */
    @ResponseBody
    @RequestMapping("/info/{userskinid}")
    public R info(@PathVariable("userskinid") Long userskinid){
        UserSkinEntity userskin = userSkinService.queryObject(userskinid);

        return R.ok().put("userskin",userskin);
    }

    /**
     * 修改日志
     */
    @ResponseBody
    @RequestMapping("/update")
    public R update(@RequestBody UserSkinEntity userskin){
        ValidatorUtils.validateEntity(userskin, UpdateGroup.class);

        userSkinService.update(userskin);
        return R.ok();
    }

    /**
     * 删除日志
     */
    @ResponseBody
    @RequestMapping("/delete/{userskinid}")
    public R delete(@PathVariable("userskinid") Long userskinid){

        userSkinService.delete(userskinid);
        return R.ok();
    }

    /**
     * 批量删除删除日志
     */
    @ResponseBody
    @RequestMapping("/deleteBatch/{ids}")
    public R deleteBatch(@PathVariable("ids") Long[] ids){

        userSkinService.deleteBatch(ids);
        return R.ok();
    }

}
