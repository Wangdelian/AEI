package io.jeasyframework.controller.system;

import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.dao.master.ChDeviceDao;
import io.jeasyframework.entity.*;
import io.jeasyframework.service.*;
import io.jeasyframework.utils.ModelAndViewFactory;
import io.jeasyframework.utils.Query;
import io.jeasyframework.utils.R;
import io.jeasyframework.utils.annotation.SysLog;
import io.jeasyframework.utils.validator.ValidatorUtils;
import io.jeasyframework.utils.validator.group.AddGroup;
import io.jeasyframework.utils.validator.group.UpdateGroup;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.jeasyframework.utils.aop.SysLogAspect.makeLog;

/**
 * ${comments}
 *
 * @author hezhenmei
 * @email hezheenmei@cqrfid.cn
 */
@Controller
@RequestMapping("/sys/levelmark")
public class LevelMarkController extends AbstractController {
    @Autowired
    private LevelMarkService levelMarkService;
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SiteConfig siteConfig;
    @Autowired
    private SysUserLevelmarkService sysUserLevelmarkService;
    @Autowired
    private ChDeviceService chDeviceService;
    @Autowired
    private SysLogService sysLogService;

    //得到设备的list
    List<ChJsondataEntity> deviceList = new ArrayList<>();

    //运维监测-设备列表是否只显示异常数据
    String onlyWrong = "0";

    /**
     * 初始化机构列表
     *
     * @param req
     * @return
     */
    @RequestMapping("/searchlist")
    public ModelAndView searchlist(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/SysLevelmark/levelmark", this.getUserSkin());
        ModelAndView view = mf.CreateModelAndView();
        return view;
    }


    /**
     * 初始化列表
     */
    @ResponseBody
    @RequestMapping(value = "/list")
    public R list(HttpServletRequest request) {
        Map<String, Object> params = new HashMap<>();
        //显示组织机构
        List<LevelMarkEntity> levelmarkList = levelMarkService.queryList(params);
        List<SysUserEntity> userList = sysUserService.queryUser();

        //设置第一级和第二级的机构在树中自动展开
        for (LevelMarkEntity levelmark : levelmarkList) {
            levelmark.setParent(true);
            if (levelmark.getLevelmarkvalue() != null && levelmark.getLevelmarkvalue().length() <= 4)
                levelmark.setOpen(true);

            //为父节点设置图标路径
            if ("0".equals(levelmark.getPid())) {
                levelmark.setIcon(request.getContextPath() + "/templates/skin2/media/js/plugins/zTree_v3/images/company.png");
            } else
                levelmark.setIcon(request.getContextPath() + "/templates/skin2/media/js/plugins/zTree_v3/images/depart3.png");
        }

        for (SysUserEntity user : userList) {
            String[] levelmarkidlist = user.getLevelmarkid().split(",");
            //将员工包装为组织，方便页面生产树
            if (levelmarkidlist.length == 1) {
                LevelMarkEntity level = new LevelMarkEntity();
                level.setPid(user.getLevelmarkid());
                level.setAbname(user.getUsername());
                level.setLevelmarkextvalue1(String.valueOf(user.getUserId()));
                if (user.getSex() == null) {
                    user.setSex(Short.valueOf("1"));
                }
                //为男.女职工指定固定的图片路径
                if (user.getSex() == 1)
                    level.setIcon(request.getContextPath() + "/templates/skin2/media/js/plugins/zTree_v3/images/male.png");
                else
                    level.setIcon(request.getContextPath() + "/templates/skin2/media/js/plugins/zTree_v3/images/female.png");

                levelmarkList.add(level);
            } else {
                for (int i = 0; i < levelmarkidlist.length; i++) {
                    LevelMarkEntity level = new LevelMarkEntity();
                    level.setPid(levelmarkidlist[i]);
                    level.setAbname(user.getUsername());
                    level.setLevelmarkextvalue1(String.valueOf(user.getUserId()));
                    if (user.getSex() == null) {
                        user.setSex(Short.valueOf("1"));
                    }
                    //为男.女职工指定固定的图片路径
                    if (user.getSex() == 1)
                        level.setIcon(request.getContextPath() + "/templates/skin2/media/js/plugins/zTree_v3/images/male.png");
                    else
                        level.setIcon(request.getContextPath() + "/templates/skin2/media/js/plugins/zTree_v3/images/female.png");

                    levelmarkList.add(level);
                }
            }
        }
        return R.ok().put("levelMarkList", levelmarkList);
    }

    //优化
    @ResponseBody
    @RequestMapping(value = "/getdata")
    public R getdataJson(HttpServletRequest request,@RequestBody Map<String, Object> map) {
        deviceList = new ArrayList<>();
        if(!map.isEmpty()){
            onlyWrong = map.get("only").toString();
        }
        Map<String, Object> params = new HashMap<>();
        SysUserEntity user = sysUserService.queryObject(getUser().getUserId());
        params.put("levelmarkid", user.getLevelmarkid());
        List<ChJsondataEntity> alllevelList = new ArrayList<>();
        List<ChJsondataEntity> firstlevelList = levelMarkService.queryListbypid(params);
        if (firstlevelList != null) {
            for (int i = 0; i < firstlevelList.size(); i++) {
                alllevelList.addAll(firstlevelList);
                this.AddChildLm(firstlevelList);
            }
        }
        return R.ok().put("deviceList", deviceList).put("firstlevelList",firstlevelList);
    }

    public void AddChildLm(List<ChJsondataEntity> afloorlevelList) {
        Map params = new HashMap();
        for (int j = 0; j < afloorlevelList.size(); j++) {
            List<ChJsondataEntity> onefloorList = new ArrayList<>();
            params.put("pid", afloorlevelList.get(j).getF_LevelMarkID());
            List<ChJsondataEntity> onefloorsameparList = levelMarkService.queryListbypid(params);
            afloorlevelList.get(j).setLstJsonDeviceTreeInfoChildren(onefloorsameparList);
            //循环每一层每一个
            onefloorList.addAll(onefloorsameparList);
            if (onefloorList.size() == 0) {
                    List<ChJsondataEntity> lastfloorChJsondata = getlastList(afloorlevelList.get(j));
                    afloorlevelList.get(j).setLstJsonDeviceTreeInfoChildren(lastfloorChJsondata);
            }else{
                this.AddChildLm(onefloorList);
            }
        }

    }

    public List<ChJsondataEntity> getlastList(ChJsondataEntity nowfloorList3) {
        int a = 0;
        Map<String, Object> params = new HashMap<>();
        params.put("pid", nowfloorList3.getF_LevelMarkID());
        List<ChJsondataEntity> lastfloorChJsondata = chDeviceService.queryjson(params);
        //循环把clob字段的信息取出来
        for (int z = 0; z < lastfloorChJsondata.size(); z++) {
            a++;
            String clobinfo = lastfloorChJsondata.get(z).getF_DeviceDescription();
            JSONObject jsonObject = JSONObject.fromObject(clobinfo);

            String F_Value = jsonObject.getString("F_IPAddress");
            String F_Name = jsonObject.getString("F_Name");
            String F_GeographyAddress = jsonObject.getString("F_GeographyAddress");
            String F_Number = jsonObject.getString("F_Number");
            String F_AEIConnetState = jsonObject.getString("AEIConnetState");
            String F_Reserve1 = jsonObject.getString("F_Reserve1");
            String F_Reserve2 = jsonObject.getString("F_Reserve2");
            String F_Reserve3 = jsonObject.getString("F_Reserve3");
            String F_Reserve4 = jsonObject.getString("F_Reserve4");
            if(onlyWrong!=null && onlyWrong.equals("1")){
                if(!"1".equals(F_AEIConnetState)){
                }else {
                    continue;
                }
                if("1".equals(F_Reserve1)){
                }else if("2".equals(F_Reserve1)){
                }else{
                    continue;
                }
                if("1".equals(F_Reserve2)){
                }else if("2".equals(F_Reserve2)){
                }else{
                    continue;
                }
                if("1".equals(F_Reserve3)){
                }else if("2".equals(F_Reserve3)){
                }else{
                    continue;
                }
                if("1".equals(F_Reserve4)){
                }else if("2".equals(F_Reserve4)){
                }else{
                    continue;
                }
            }

            lastfloorChJsondata.get(z).setF_Value(F_Value);
            lastfloorChJsondata.get(z).setF_Name(F_Name);
            lastfloorChJsondata.get(z).setF_GeographyAddress(F_GeographyAddress);
            lastfloorChJsondata.get(z).setF_Number(F_Number);
            if("1".equals(F_AEIConnetState)){
                lastfloorChJsondata.get(z).setF_AEIConnetState("正常");
            }else {
                lastfloorChJsondata.get(z).setF_AEIConnetState("异常");
            }

            if("1".equals(F_Reserve1)){
                lastfloorChJsondata.get(z).setF_Reserve1("正常");
            }else if("2".equals(F_Reserve1)){
                lastfloorChJsondata.get(z).setF_Reserve1("无");
            }else{
                lastfloorChJsondata.get(z).setF_Reserve1("异常");
            }
            if("1".equals(F_Reserve2)){
                lastfloorChJsondata.get(z).setF_Reserve2("正常");
            }else if("2".equals(F_Reserve2)){
                lastfloorChJsondata.get(z).setF_Reserve2("无");
            }else{
                lastfloorChJsondata.get(z).setF_Reserve2("异常");
            }
            if("1".equals(F_Reserve3)){
                lastfloorChJsondata.get(z).setF_Reserve3("正常");
            }else if("2".equals(F_Reserve3)){
                lastfloorChJsondata.get(z).setF_Reserve3("无");
            }else{
                lastfloorChJsondata.get(z).setF_Reserve3("异常");
            }
            if("1".equals(F_Reserve4)){
                lastfloorChJsondata.get(z).setF_Reserve4("正常");
            }else if("2".equals(F_Reserve4)){
                lastfloorChJsondata.get(z).setF_Reserve4("无");
            }else{
                lastfloorChJsondata.get(z).setF_Reserve4("异常");
            }

            deviceList.add(lastfloorChJsondata.get(z));

        }

        return lastfloorChJsondata;
    }


    /**
     * 删除机构
     */
    @SysLog(value = "删除组织机构",type = "管理操作")
    @ResponseBody
    @RequestMapping(value = "/remove/{levelmarkid}")
    public R remove(@PathVariable("levelmarkid") String levelmarkid) {
        levelMarkService.delete(levelmarkid);
        SysLogEntity sysLog = makeLog("删除组织机构","管理操作",levelmarkid,true);
        //保存系统日志
        sysLogService.save(sysLog);
        return R.ok();
    }

    /**
     * 初始化新增组织界面
     *
     * @param req
     * @return
     */
    @RequestMapping("/add/{pid}")
    public ModelAndView addlevelmark(HttpServletRequest req, @PathVariable("pid") String pid) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/LevelMarkMgr/addLevelmark", "");
        ModelAndView view = mf.CreateModelAndView();
        view.addObject("pid", pid);
        return view;
    }

    /**
     * 根据levelmarkid查询组织机构信息
     */
    @ResponseBody
    @RequestMapping("/listByLevelmarkid/{levelmarkid}")
    //@RequiresPermissions("sys:user:list")
    public R listByLevelmarkid(@PathVariable("levelmarkid") String levelmarkid) {
        //查询列表数据
        LevelMarkEntity userList = levelMarkService.queryObject(levelmarkid);
        return R.ok().put("userList", userList);
    }

    /**
     * 保存组织
     */
    @SysLog(value = "保存组织机构",type = "管理操作")
    @ResponseBody
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public R save(@RequestBody LevelMarkEntity levelMark) {
        ValidatorUtils.validateEntity(levelMark, AddGroup.class);
        String pid = levelMark.getPid();


        //根据父类的levelmarkvalue设置子类的levelmarkvalue
        String pidValue = levelMarkService.queryObject(pid).getLevelmarkvalue();
        int count = levelMarkService.getChildNum(pid);
        String value = pidValue + String.format("%04d", count + 1);
        levelMark.setLevelmarkvalue(value);

        levelMarkService.save(levelMark);

        SysLogEntity sysLog = makeLog("保存组织机构","管理操作",levelMark,true);
        //保存系统日志
        sysLogService.save(sysLog);

        return R.ok().put("levelMark", levelMark);
    }

    /**
     * 修改组织信息
     */
    @SysLog(value = "修改组织机构",type = "管理操作")
    @ResponseBody
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public R update(@RequestBody LevelMarkEntity levelMark) {
        ValidatorUtils.validateEntity(levelMark, UpdateGroup.class);
        levelMarkService.update(levelMark);

        SysLogEntity sysLog = makeLog("修改组织机构","管理操作",levelMark,true);
        //保存系统日志
        sysLogService.save(sysLog);
        return R.ok();
    }



    /*
        @ResponseBody
        @RequestMapping(value="/getChild")
        public R getChild(@PathVariable("levelmarkid") String levelmarkid){

 /          List<LevelMarkEntity> childList = new ArrayList<>();
            List<SysUserEntity> userList = sysUserService.queryAllLevelMarkId(levelmarkid);
            for(SysUserEntity user:userList){
                LevelMarkEntity level = new LevelMarkEntity();
                level.setPid(user.getLevelmarkid());
                level.setLevelmarkid("100");
                level.setAbname(user.getUsername());
                childList.add(level);
            }
            return R.ok().put("childList",childList);
        }*/

}

