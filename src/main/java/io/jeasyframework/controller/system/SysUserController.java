package io.jeasyframework.controller.system;

import com.github.pagehelper.PageHelper;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.*;
import io.jeasyframework.service.*;
import io.jeasyframework.utils.*;
import io.jeasyframework.utils.annotation.SysLog;
import io.jeasyframework.utils.validator.Assert;
import io.jeasyframework.utils.validator.ValidatorUtils;
import io.jeasyframework.utils.validator.group.AddGroup;
import io.jeasyframework.utils.validator.group.UpdateGroup;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static io.jeasyframework.utils.MD5Util.md5;
import static io.jeasyframework.utils.aop.SysLogAspect.makeLog;

/**
 * ${comments}
 *
 * @author hezhenmei
 * @email hezheenmei@cqrfid.cn
 */
@RestController
@RequestMapping("/sys/user")
public class SysUserController extends AbstractController {
    @Autowired
    private LevelMarkService levelMarkService;
    @Autowired
    private SysUserLevelmarkService sysUserLevelmarkService;
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysUserRoleService sysUserRoleService;
    @Autowired
    private SysRoleService sysRoleService;
    @Autowired
    private SiteConfig siteConfig;
    @Autowired
    private SysMenuService sysMenuService;
    @Autowired
    private ODAndonService odAndonService;
    @Autowired
    private MqsStationService mqsStationService;
    @Autowired
    private SysUserPasswordService sysUserPasswordService;
    @Autowired
    private SysLogService sysLogService;


    /**
     * 初始化用户列表
     *
     * @param req
     * @return
     */
    @RequestMapping("/searchlist")
    public ModelAndView searchlist(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/UserMgr/userlist", this.getUserSkin());
        //ModelAndView view=mf.CreateModelAndView("","skin1");
        ModelAndView view = mf.CreateModelAndView();
        view.addObject("nowUser",getUser().getUserId());
        //total 是模板的全局变量，可以直接访问
        //view.addObject("message","Hello Spring Boot Beetl!");
        return view;
    }

    /**
     * 初始化密码重置页面
     *
     * @param req
     * @return
     */
    @RequestMapping("/resetPassword")
    public ModelAndView resetPassword(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/UserMgr/resetPassword", this.getUserSkin());
        //ModelAndView view=mf.CreateModelAndView("","skin1");
        ModelAndView view = mf.CreateModelAndView();
        view.addObject("nowUser",getUser().getUserId());
        //total 是模板的全局变量，可以直接访问
        //view.addObject("message","Hello Spring Boot Beetl!");
        return view;
    }

    /**
     * 初始化web用户列表
     *
     * @param req
     * @return
     */
    @RequestMapping("/searchweblist")
    public ModelAndView searchweblist(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/UserMgr/webuserlist", this.getUserSkin());
        //ModelAndView view=mf.CreateModelAndView("","skin1");
        ModelAndView view = mf.CreateModelAndView();
        //total 是模板的全局变量，可以直接访问
        //view.addObject("message","Hello Spring Boot Beetl!");
        return view;
    }

    /**
     * 初始化编辑用户界面
     *
     * @param req
     * @return
     */
    @RequestMapping("/edituser/{userId}")
    public ModelAndView edituser(HttpServletRequest req, @PathVariable("userId") Long userId) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/UserMgr/edituser", this.getUserSkin());

        ModelAndView view = mf.CreateModelAndView();

        view.addObject("userid", userId);
        view.addObject("nowUser",getUser().getUserId());
        return view;
    }

    @RequestMapping("/webedituser/{userId}")
    public ModelAndView webedituser(HttpServletRequest req, @PathVariable("userId") Long userId) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/UserMgr/webedituser", this.getUserSkin());

        ModelAndView view = mf.CreateModelAndView();

        view.addObject("userid", userId);
        return view;
    }


    /**
     * 编辑用户界面
     *
     * @param req
     * @return
     */
    @RequestMapping("/edituserlevel/{userId}")
    public ModelAndView edituserlevel(HttpServletRequest req, @PathVariable("userId") Long userId) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/SysLevelmark/edituser", this.getUserSkin());

        ModelAndView view = mf.CreateModelAndView();

        view.addObject("userid", userId);
        return view;
    }

    /**
     * 初始化添加用户界面
     *
     * @param req
     * @return
     */
    @RequestMapping("/addUser")
    public ModelAndView addUser(HttpServletRequest req) {
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/UserMgr/adduser", this.getUserSkin());
        return mf.CreateModelAndView();
    }

    @RequestMapping("/webaddUser")
    public ModelAndView webaddUser(HttpServletRequest req) {
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/UserMgr/webaddUser", this.getUserSkin());
        return mf.CreateModelAndView();
    }

    /**
     * 查询所有用户列表
     */
    @RequestMapping(value = "/list/{pageNum}", method = RequestMethod.POST)
    //@RequiresPermissions("sys:user:list")
    public R list(@RequestBody Map<String, Object> params, @PathVariable("pageNum") int pageNum) {
        params.put("pageNum",pageNum);
        List<SysUserEntity> userList = getRealUserList(params);
        int total = userList.size();
        int beforepage = total / 20;
        if(pageNum!=0){
            if(pageNum>beforepage+1){
                pageNum=1;
            }
            userList = userList.subList((pageNum - 1) * 20, beforepage == pageNum - 1 ? total : (pageNum - 1) * 20 + 20);
        }
        //查询列表数据
        PageUtils pageUtil = new PageUtils(userList, total, 20, pageNum);

        return R.ok().put("page", pageUtil);
    }

    @SysLog(value = "导出用户列表报表",type = "管理操作")
    @ResponseBody
    @RequestMapping(value = "/export", method = RequestMethod.GET)
    public void export(@RequestParam Map<String, Object> condition, HttpServletResponse response) {
        //得到查询条件
        Query query = new Query(condition);
        //查询数据
        List<SysUserEntity> userList = getRealUserList(condition);

        //添加数据到集合
        List excelHead = new ArrayList<>();

        excelHead.add("唯一ID");
        excelHead.add("登录名");
        excelHead.add("姓名");
        excelHead.add("单位");
        excelHead.add("所属角色");
        excelHead.add("所属采集点");
        excelHead.add("所属班组");
        excelHead.add("创建时间");
        excelHead.add("最后登录时间");
        excelHead.add("登录次数");

        //添加数据到集合
        List<String> paramItemsName = new ArrayList<>();
        paramItemsName.add("userId");
        paramItemsName.add("username");
        paramItemsName.add("chineseName");
        paramItemsName.add("levelmarkid");
        paramItemsName.add("roleName");
        paramItemsName.add("userextvalue5");
        paramItemsName.add("userextvalue4");
        paramItemsName.add("createTime");
        paramItemsName.add("dateLastLogin");
        paramItemsName.add("userextvalue2");


        //添加数据到集合
        List<Integer> excelWidth = new ArrayList<>();
        excelWidth.add(2500);
        excelWidth.add(2500);
        excelWidth.add(2800);
        excelWidth.add(10000);
        excelWidth.add(12000);
        excelWidth.add(12000);
        excelWidth.add(2800);
        excelWidth.add(5000);
        excelWidth.add(5000);
        excelWidth.add(2500);


        //进行导出逻辑
        HSSFWorkbook hssfWorkbook = ExportExcel.export2("用户列表" + DateUtils.formatT(new Date()), excelHead, excelWidth, paramItemsName, userList, SysUserEntity.class);
        BufferedOutputStream buff = null;
        ServletOutputStream outSTr = null;

        try {
            response.setContentType("text/plain");
            response.addHeader("Content-Disposition",
                    "attachment;filename=" + URLEncoder.encode("用户列表" + DateUtils.format(new Date(), "yyyy年MM月dd日 HH时mm分ss秒") + ".xls", "UTF-8"));
            StringBuffer write = new StringBuffer();
            outSTr = response.getOutputStream();// 建立
            buff = new BufferedOutputStream(outSTr);
            buff.write(write.toString().getBytes("UTF-8"));
            if (hssfWorkbook != null) {
                hssfWorkbook.write(buff);
            }
            buff.flush();
            buff.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                buff.close();
                outSTr.close();

                SysLogEntity sysLog = makeLog("导出用户列表报表","管理操作",condition,true);
                //保存系统日志
                sysLogService.save(sysLog);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }


    public List getRealUserList(Map<String, Object> params) {
        //只有超级管理员，才能查看所有管理员列表
        if (getUserId() != Constant.SUPER_ADMIN) {
            params.put("createUserId", getUserId());
        }
        List<SysUserEntity> userList = sysUserService.queryList(params);

        int total = sysUserService.queryTotal(params);


        //得到单位ids
        String levelmarkid = (String) params.get("levelmarkid");
        String[] levelmarkidarr = null;
        if (levelmarkid != null && !levelmarkid.equals("")) {
            levelmarkidarr = levelmarkid.split(",");
        }
        //得到角色id
        String roleids = params.get("roleIdList").toString();
        String[] roleidarr = null;
        //得到传过来的角色  roleids
        if (roleids != null && !roleids.equals("") && !roleids.equals("[]")) {
            //查询和导列表传过来的数组不一样-------
            if (roleids.contains(",") && !roleids.contains(", ")) {
                roleidarr = roleids.substring(0, roleids.length()).split(",");
            } else {
                roleidarr = roleids.substring(1, roleids.length() - 1).split(", ");
            }
        }
        for (int i = 0; i < userList.size(); i++) {
            String temp = "";
            String stationNametemp = "";
            String roleName = "";

            //查询单位
            List<LevelMarkEntity> lm = levelMarkService.queryAbname2(userList.get(i).getUserId());
            if (levelmarkidarr != null) {
                int flag = 0;
//                if (lm.size() < levelmarkidarr.length) {
//                    userList.remove(i);
//                    total = total - 1;
//                    i = i - 1;
//                    continue;
//                }

                //下面为修改类容，选取两个以上也能查询
                if (lm.size() <= levelmarkidarr.length) {
                    for (int k = 0; k < levelmarkidarr.length; k++) {
                        for (int g = 0; g < lm.size(); g++) {
                            if (levelmarkidarr[k].equals(lm.get(g).getLevelmarkid())) {
                                flag++;
                                break;
                            }
                        }
                    }
                    if (flag == 0) {
                        userList.remove(i);
                        total = total - 1;
                        i = i - 1;
                        continue;
                    } else {
                        userList.get(i).setLevelmarkid(lm.get(0).getAbname());
                    }
                }
            } else {
                for (int j = 0; j < lm.size(); j++) {
                    temp += lm.get(j).getAbname() + " ,";
                }


                if (temp != "") {
                    temp = temp.substring(0, temp.length() - 1);
                }
                userList.get(i).setLevelmarkid(temp);
            }


            //查询角色
            List<SysRoleEntity> roleIdList = sysRoleService.queryRoleNameList(userList.get(i).getUserId());
            List<SysRoleEntity> isroleIdList = new ArrayList<>();
            isroleIdList.addAll(roleIdList);
            //角色的模糊查询,是与每一个用户的roleids 进行对比，看是否一致
            int roleIdListlen = roleIdList.size();
            if (roleidarr != null) {
                int roleidarrlen = roleidarr.length;
                if (roleIdList.size() == 0) {
                    userList.remove(i);
                    total = total - 1;
                    i = i - 1;
                    continue;
//                    || (roleIdList.size() != 0 && roleidarr.length > roleIdList.size())
                }

                if (roleIdList.size() != 0 && roleidarr.length <= roleIdList.size()) {
                    for (int n = 0; n < isroleIdList.size(); n++) {
                        for (int m = 0; m < roleidarr.length; m++) {
                            if (isroleIdList.get(n).getRoleId() == Long.parseLong(roleidarr[m])) {
                                isroleIdList.remove(n);
                                n = n - 1;
                                break;
                            }
                        }
                    }

                    if (isroleIdList.size() == roleIdListlen || (isroleIdList.size() != roleIdListlen && isroleIdList.size() != roleIdListlen - roleidarrlen)) {
                        userList.remove(i);
                        total = total - 1;
                        i = i - 1;
                        continue;
                    }
                }
            }

            for (int j = 0; j < roleIdList.size(); j++) {
                roleName += roleIdList.get(j).getRoleName() + " ,";
            }
            if (roleName != "") {
                roleName = roleName.substring(0, roleName.length() - 1);
            }
            userList.get(i).setRoleName(roleName);


            //查询采集点
            /*List stationnameList = new ArrayList();
            List<MqsStationEntity> stationnames = null;
            String userextvalue5s = userList.get(i).getUserextvalue5();
            String[] userextvalue5sarr = null;
            if (userextvalue5s != null) {
                userextvalue5sarr = userextvalue5s.split(",");
            }
            if (userextvalue5sarr != null) {
                for (int j = 0; j < userextvalue5sarr.length; j++) {
                    stationnameList.add(userextvalue5sarr[j]);
                }
                params.put("stationids", stationnameList);
                stationnames = mqsStationService.queryBystationids(params);
            }
            if (stationnames != null && stationnames.size() > 0) {
                for (int j = 0; j < stationnames.size(); j++) {
                    stationNametemp += stationnames.get(j).getStationname() + " ,";
                }
                stationNametemp = stationNametemp.substring(0, stationNametemp.length() - 1);
            }
            userList.get(i).setUserextvalue5(stationNametemp);*/
        }
        //存储与勾选角色名称相等的id；、、得到筛选出来的数据存储在list里面 修改了333行的代码，去除了一个筛选条件
        List<SysUserEntity> userlista = new LinkedList<>();
        if (roleidarr != null) {
            for (int l = 0; l < roleidarr.length; l++) {
                long roleId = Long.parseLong(roleidarr[l]);
                SysRoleEntity role = sysRoleService.queryObject(roleId);
                for (int k = 0; k < userList.size(); k++) {
                    /*修改，多拥有多个角色的用户，一个角色匹配也显示
                    if (role.getRoleName().equals(userList.get(k).getRoleName().trim())) {
                        userlista.add(userList.get(k));
                    }*/
                    if (userList.get(k).getRoleName().trim().indexOf(role.getRoleName())!=-1) {
                        userlista.add(userList.get(k));
                        userList.remove(k);
                        k--;
                    }
                }
            }
        }
        //判断查询时是否勾选角色名称
        if (userlista.size() == 0) {
            return userList;
        }

        return userlista;
    }

    //判断用户名是否重复
    @RequestMapping(value = "/queryUsername", method = RequestMethod.POST)
    public R queryUsername(@RequestBody Map<String, Object> condition) {
        String username = condition.get("username").toString();
        SysUserEntity sysUserEntity = sysUserService.queryByUserName(username);
        return R.ok().put("sysUserEntity", sysUserEntity);
    }

    //判断新密码与最近5次密码是否相同
    @RequestMapping(value = "/queryPassword", method = RequestMethod.POST)
    public R queryPassword(@RequestBody Map<String, Object> condition) {
        String password = condition.get("password").toString();
        Object obj = condition.get("userId");
        Long userId = getUserId();

        if(obj!=null){
            userId = Long.parseLong(obj.toString());
        }
        List<SysUserPasswordEntity> passwordList = sysUserPasswordService.queryByUser(userId);
        if(passwordList!=null&&passwordList.size()>0){
            for(int i=0;i<passwordList.size();i++){
                if(password.equals(passwordList.get(i).getPassword().toString())){
                    //密码重复
                    return R.ok().put("pwFlag", 1);
                }
            }
        }
        //密码不重复
        return R.ok();
    }

    /**
     * 根据levelmarkid查询用户信息
     */
    @RequestMapping(value = "/listByLevelmarkid/{levelmarkid}")
    //@RequiresPermissions("sys:user:list")
    public R listByLevelmarkid(@PathVariable("levelmarkid") String levelmarkid) {
        //只有超级管理员，才能查看所有管理员列表
//        Long userid = getUserId();
//        if (getUserId() != Constant.SUPER_ADMIN) {
//            params.put("createUserId", getUserId());
//        }

        //查询列表数据
        List<SysUserEntity> userList = sysUserService.queryByLevelMarkId(levelmarkid);

        return R.ok().put("userList", userList);
    }

    /**
     * 获取登录的用户信息
     */
    @RequestMapping("/info")
    public R info() {
        return R.ok().put("user", getUser());
    }


    /**
     * 获取登录的用户信息
     * 修改密码界面使用
     */
    @RequestMapping("/passinfo")
    public R passinfo() {
        SysUserEntity user = sysUserService.queryObject(getUser().getUserId());
        return R.ok().put("user",user);
    }

    /**
     * 初始化修改用户密码界面
     */
    @RequestMapping("/modifyPassword")
    public ModelAndView modifyPassword(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "/template/UserMgr/modifyPassword", this.getUserSkin());
        //ModelAndView view=mf.CreateModelAndView("","skin1");
        ModelAndView view = mf.CreateModelAndView();
        //total 是模板的全局变量，可以直接访问
        //view.addObject("message","Hello Spring Boot Beetl!");
        return view;
    }

    /**
     * 登录密码过期强制修改界面
     */
    @RequestMapping("/modifyPasswordExpired")
    public ModelAndView modifyPasswordExpired(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "/template/UserMgr/modifyPasswordExpired", this.getUserSkin());
        //ModelAndView view=mf.CreateModelAndView("","skin1");
        ModelAndView view = mf.CreateModelAndView();
        //total 是模板的全局变量，可以直接访问
        //view.addObject("message","Hello Spring Boot Beetl!");
        return view;
    }

    /**
     * 修改登录用户密码
     */
    @SysLog(value = "修改密码",type = "管理操作")
    @RequestMapping("/password")
    public R password(@RequestBody SysUserEntity user) {

        String password = user.getPassword();
        String newPassword = user.getNewPass1();
        String username = user.getUsername();
        Assert.isBlank(newPassword, "新密码不为能空");

        //sha256加密
        //password = new Sha256Hash(password).toHex();
        //
        //newPassword = new Sha256Hash(newPassword).toHex();

        //更新密码
        int count = sysUserService.updatePassword(getUserId(), password, newPassword);
        if (count == 0) {
            SysLogEntity sysLog = makeLog("修改密码","管理操作",user,false);
            //保存系统日志
            sysLogService.save(sysLog);
            return R.error("出现问题，请联系管理员");
        }
        //添加密码修改历史记录
        SysUserPasswordEntity temp = new SysUserPasswordEntity();
        temp.setId(new Date().getTime());
        temp.setUserId(getUserId());
        temp.setPassword(user.getNewPass1());
        sysUserPasswordService.save(temp);

        SysLogEntity sysLog = makeLog("修改密码","管理操作",user,true);
        //保存系统日志
        sysLogService.save(sysLog);

        //退出
        ShiroUtils.logout();

        return R.ok();
    }

    /**
     * 修改登录用户密码
     */
    @SysLog(value = "重置密码",type = "管理操作")
    @RequestMapping("/resetPw")
    public R resetPw(@RequestBody SysUserEntity user) {


        SysUserEntity temp = sysUserService.queryObject(user.getUserId());
        String usernames =  "重置密码用户：" + temp.getUsername();

        //更新密码
        int count = sysUserService.resetPassword(user.getUserId(), md5("123456"));
        if (count == 0) {

            SysLogEntity sysLog = makeLog("重置密码","管理操作",usernames,false);
            //保存系统日志
            sysLogService.save(sysLog);
            return R.error("出现问题，请联系管理员");
        }


        SysLogEntity sysLog = makeLog("重置密码","管理操作",usernames,true);
        //保存系统日志
        sysLogService.save(sysLog);
        return R.ok();
    }



    /**
     * 用户信息
     */
    @RequestMapping("/info/{userId}")
    public R info(@PathVariable("userId") Long userId) {
        SysUserEntity user = sysUserService.queryObject(userId);
        Map<String, Object> userextvalue5Condition = new HashMap<>();
        List stationnameList = new ArrayList();
        List<MqsStationEntity> stationnames = null;
        String[] userextvalue5sarr = null;
        //根据stationid查询stationname
        String userextvalue5s = user.getUserextvalue5();
        if (userextvalue5s != null) {
            userextvalue5sarr = userextvalue5s.split(",");
        }
        /*if (userextvalue5sarr != null) {
            for (int i = 0; i < userextvalue5sarr.length; i++) {
                stationnameList.add(userextvalue5sarr[i]);
            }
            userextvalue5Condition.put("stationids", stationnameList);
            stationnames = mqsStationService.queryBystationids(userextvalue5Condition);
        }*/

        //获取用户所属的角色列表
        List<Long> roleIdList = sysUserRoleService.queryRoleIdList(userId);
        user.setRoleIdList(roleIdList);
        //设置用户功能菜单权限
        List<SysRoleEntity> roleList = sysUserRoleService.getUserRolezTreeList(userId);
        String temp = "";
        List<LevelMarkEntity> lm = levelMarkService.queryAbname2(userId);
        for (int i = 0; i < lm.size(); i++) {
            temp += lm.get(i).getAbname() + ",";
        }
        String stationNametemp = "";
        String stationname = "";
        String abname = "";
        if (stationnames != null && stationnames.size() > 0) {
            for (int i = 0; i < stationnames.size(); i++) {
                stationNametemp += stationnames.get(i).getStationname() + ",";
            }
            stationname = stationNametemp.substring(0, stationNametemp.length() - 1);
        }
        if (temp != "") {
            abname = temp.substring(0, temp.length() - 1);
        }
        user.setsysRoleList(roleList);
        return R.ok().put("user", user).put("abname", abname).put("stationname", stationname);
    }

    /**
     * 组织机构搜索
     */
    @RequestMapping("/queryByLid")
    //@RequiresPermissions("sys:user:info")
    public R queryByLid(@RequestBody Map<String, Object> condition) {
        //condition.put("levelmarkid", condition.get("levelmarkid"));
        //condition.put("username", condition.get("username"));
        Query query = new Query(condition);
        List<SysUserEntity> list = sysUserService.queryListByLid(query);
        return R.ok().put("list", list);
    }

    /**
     * 保存用户
     */
    @SysLog(value = "新增用户",type = "管理操作")
    @RequestMapping("/save")
    public R save(@RequestBody SysUserEntity user) {
        //保存用户记录
        ValidatorUtils.validateEntity(user, AddGroup.class);
        user.setSkin("skin2");
        user.setCreateUserId(getUserId());
        sysUserService.save(user);

        //获取用户id
        Long userId = user.getUserId();

        //新增用户机构记录
        Map<String, Object> map = new HashMap<>();
        map.put("arr", user.getUserlevelmark());
        map.put("userId", userId);
        sysUserLevelmarkService.insertUser(map);

        //添加密码修改历史记录
        SysUserPasswordEntity temp = new SysUserPasswordEntity();
        temp.setId(new Date().getTime());
        temp.setUserId(user.getUserId());
        temp.setPassword(user.getPassword());
        sysUserPasswordService.save(temp);

        String usernames =  "新增用户：" + user.getUsername();

        SysLogEntity sysLog = makeLog("新增用户","管理操作",usernames,true);
        //保存系统日志
        sysLogService.save(sysLog);

        return R.ok();
    }

    /**
     * 修改用户
     */
    @SysLog(value = "修改用户",type = "管理操作")
    @RequestMapping("/update")
    public R update(@RequestBody SysUserEntity user) {
        //修改用户信息
        //判断输入是否有空值
        ValidatorUtils.validateEntity(user, UpdateGroup.class);
        user.setCreateUserId(getUserId());
        System.out.println("user信息=============" + user);
        sysUserService.update(user);
        if (user.getUserlevelmark() != null) {

            //获取用户id
            Long userId = user.getUserId();

            //删除原有的用户机构
            sysUserLevelmarkService.deleteUser(userId);

            //新增现有的用户机构
            Map<String, Object> map = new HashMap<>();
            map.put("arr", user.getUserlevelmark());
            map.put("userId", userId);
            sysUserLevelmarkService.insertUser(map);
        }
        if(user.getPassword()!=null){
            //添加密码修改历史记录
            SysUserPasswordEntity temp = new SysUserPasswordEntity();
            temp.setId(new Date().getTime());
            temp.setUserId(user.getUserId());
            temp.setPassword(user.getPassword());
            sysUserPasswordService.save(temp);
        }
        String usernames =  "修改用户：" + user.getUsername();
        SysLogEntity sysLog = makeLog("修改用户","管理操作",usernames,true);
        //保存系统日志
        sysLogService.save(sysLog);
        return R.ok();
    }

    /**
     * 修改用户性别
     */
    @SysLog(value = "修改用户性别",type = "管理操作")
    @RequestMapping("/updateSex")
    // @RequiresPermissions("sys:user:update" )
    public R updateSex(@RequestBody SysUserEntity user) {
        //修改用户信息
        user.setCreateUserId(getUserId());
        sysUserService.updateByCondition(user);

        SysLogEntity sysLog = makeLog("修改用户性别","管理操作",user,true);
        //保存系统日志
        sysLogService.save(sysLog);
        return R.ok();
    }

    /**
     * 修改用户状态
     */
    @SysLog(value = "修改用户状态",type = "管理操作")
    @RequestMapping("/updateStatus")
    // @RequiresPermissions("sys:user:update" )
    public R updateStatus(@RequestBody SysUserEntity user) {
        Long userid = user.getUserId();

        if (userid == user.getUserId()) {

            return R.ok().put("tag", 1);
        }
        if (userid == 1L) {
            return R.ok().put("tag", 2);
        } else {
            //修改用户信息
            user.setCreateUserId(getUserId());

            sysUserService.updateByCondition(user);


            return R.ok().put("tag", 1);
        }
    }

    /***
     * 多选删除
     */
    @SysLog(value = "删除用户",type = "管理操作")
    @RequestMapping("/delete")
    public R delete(@RequestBody Map<String, Object> map) {
        if (map.isEmpty())
            return R.error("请至少选择一条数据");
        Long[] ids = new Long[map.size()];
        for (int i = 0; i < map.size(); i++) {
            ids[i] = Long.parseLong(map.get(String.valueOf(i)) + "");
        }
        for (int j = 0; j < map.size(); j++) {
            if (ids[j] == getUserId()) {
                return R.ok().put("tag", 1);
            }
            if (ids[j] == 1L) {
                return R.ok().put("tag", 2);
            }
        }

        SysUserEntity temp = sysUserService.queryObject(ids[0]);
        String usernames =  "删除用户：" + temp.getUsername();
        for (int j = 1; j < map.size(); j++) {
            temp = sysUserService.queryObject(ids[j]);
            usernames = usernames +","+ temp.getUsername();
        }

        int re = sysUserService.deleteBatch(ids);
        sysUserLevelmarkService.deleteBatch(ids);
        sysUserRoleService.deleteBatch(ids);
        if (re == 0) {
            SysLogEntity sysLog = makeLog("删除用户","管理操作",usernames,false);
            //保存系统日志
            sysLogService.save(sysLog);
            return R.ok().put("re", "删除数据失败，请联系管理员！");
        } else {

            SysLogEntity sysLog = makeLog("删除用户","管理操作",usernames,true);
            //保存系统日志
            sysLogService.save(sysLog);
            return R.ok().put("re", "本次共删除了" + re + "条数据！");
        }
    }

    //获取组织结构树
    @ResponseBody
    @RequestMapping(value = "/getlevel/{userId}")
    public R getlevel(@PathVariable("userId") Long userId, HttpServletRequest request) {
        Map<String, Object> params = new HashMap<>();
        List<LevelMarkEntity> levelmarkList = levelMarkService.queryList(params);
        List<String> userlevel = null;

        if (userId != 0)
            userlevel = sysUserLevelmarkService.queryLevelmarkid(userId);

        //设置第一级和第二级的机构在树中自动展开
        for (LevelMarkEntity levelmark : levelmarkList) {
            if (userId != 0 && userlevel != null && userlevel.contains(levelmark.getLevelmarkid())) {
                levelmark.setChecked(true);
            }

            if (levelmark.getLevelmarkvalue() != null && levelmark.getLevelmarkvalue().length() <= 8)
                levelmark.setOpen(true);


            //为父节点设置图标路径
            if ("0".equals(levelmark.getPid())) {
                levelmark.setIcon(request.getContextPath() + "/templates/default/media/css/zTreeStyle/img/diy/company.png");
            } else
                levelmark.setIcon(request.getContextPath() + "/templates/default/media/css/zTreeStyle/img/diy/depart3.png");
        }

        return R.ok().put("levelMarkList", levelmarkList);
    }

    /***
     * 条件查询
     *
     * 传递json对象，用Map接收对象
     *
     */
    @RequestMapping(value = "/listByConditons/{pageNum}", method = RequestMethod.POST)
    // @RequiresPermissions("sys:user:list")
    public R listByConditons(@RequestBody Map<String, Object> condition, @PathVariable int pageNum) {
        PageHelper.startPage(pageNum, 1);
        //根据条件设置查询时间位置
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        switch ((String) condition.get("timeSwitch")) {
            case "one-week":
                c.add(Calendar.DATE, -7);
                break;
            case "one-month":
                c.add(Calendar.MONTH, -1);
                break;
            case "three-day":
                c.add(Calendar.DATE, -3);
                break;
            case "all":
                c.add(Calendar.YEAR, -100);
                break;
            default:
                break;
        }

        condition.put("name", condition.get("keyWords"));
        try {
            condition.put("startTime", condition.get("startTime") != "" && ((String) condition.get("timeSwitch")).equals("custom") ? new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").parse((String) condition.get("startTime")) : c.getTime());
            condition.put("endTime", condition.get("endTime") != "" && ((String) condition.get("timeSwitch")).equals("custom") ? new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").parse((String) condition.get("endTime")) : new Date());
        } catch (ParseException e) {
            e.printStackTrace();
        }

        condition.remove("timeSwitch");
        condition.remove("keyWords");
        Query query = new Query(condition);
        //根据条件取数据
        List<SysUserEntity> result = sysUserService.queryListByConditions(query);
        int total = sysUserService.queryTotalByConditions(query);
        List<ODAndonEntity> ODAndonEntityList = odAndonService.queryList(query);
        //构造返回对象
        PageUtils pageUtil = new PageUtils(result, total, 1, pageNum);
        return R.ok().put("page", pageUtil);

    }
}
