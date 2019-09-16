/*******************************************************
 *Copyright (c) 2018 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.api
 *文件名：  ApiWorkshopInterface
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2018-03-23 13:40
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2018-03-23 13:40
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/

package io.jeasyframework.api;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jeasyframework.entity.*;
import io.jeasyframework.service.*;
import io.jeasyframework.utils.DateUtils;
import io.jeasyframework.utils.R;
import io.jeasyframework.utils.ShiroUtils;
import io.jeasyframework.utils.annotation.IgnoreAuth;
import io.jeasyframework.utils.annotation.LoginUser;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@RestController
@RequestMapping("/api")
@Api(value="现场程序接口库",tags={"现场程序接口库"},description = "现场程序接口库")
public class ApiWorkshopInterface {
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private WorkshopInterfaceService workshopInterfaceService;
    @Autowired
    private SysMenuService sysMenuService;


/**
     * 现场程序登录接口
     */

   // @IgnoreAuth
    @RequestMapping("sso_login")
    @ApiOperation(value = "现场程序登录接口")
    public @ResponseBody String sso_login(String loginname,String loginpassword,String stationname){
        String result= loginname+"$admin$12345678$CAL";
        //查询用户信息
        SysUserEntity user = sysUserService.queryByUserName(loginname);
        //账号不存在
        if(user == null) {
            return "err$用户不存在";
        }
        String password = new Sha256Hash(loginpassword).toHex();
        //密码错误
        if(!password.equals(user.getPassword())) {
            return "err$密码错误";
        }
        String OP_StaionIDs=user.getUserextvalue5();
        if (!OP_StaionIDs.equals(""))
        {
            OP_StaionIDs=","+OP_StaionIDs+",";
            if (OP_StaionIDs.indexOf(","+stationname+",")>=0)
            {

            }
            else
            {
                return "err$用户无权限使用该采集点录入问题";
            }
        }
        else
        {
            return "err$当前登录用户无权使用现场问题录入程序";
        }
        sysUserService.updateLoginCount(loginname,password);
        String OPString="";
        List<SysMenuEntity> menus=sysMenuService.getUserMenuzTreeList(user.getUserId());
        for(SysMenuEntity entity : menus)
        {
            if (OPString.equals(""))
            {
                OPString=String.valueOf(entity.getMenuId());
            }
            else
            {
                OPString=OPString+","+String.valueOf(entity.getMenuId());
            }
        }
        result=loginname+"$"+user.getChineseName()+"$"+OPString+"$"+user.getUserextvalue5();
        return result;
    }


/**
     * 获取采集点列表
     *//*

    @IgnoreAuth
    @RequestMapping("getstationlist")
    @ApiOperation(value = "获取采集点列表")
    public @ResponseBody String getstationlist(String plineid){
        Map<String ,Object> map=new HashMap<String , Object>();
        map.put("productionlineid",plineid);
        List<MqsStationEntity> tables =workshopInterfaceService.queryStaionList(map);
        ObjectMapper objectMapper = new ObjectMapper();
        String data= JSONObject.toJSONString(tables);
        data="{\"total\":"+String.valueOf(tables.size())+",\"rows\":"+data+"}";
        return data;
    }

    */
/**
     * 获取ICC列表
     *//*

    @IgnoreAuth
    @RequestMapping("geticclist")
    @ApiOperation(value = "获取ICC列表")
    public @ResponseBody String geticclist(String keyword){
        Map<String ,Object> map=new HashMap<String , Object>();
        map.put("iqivrt","动力传动");
        map.put("keyword",keyword);
        List<IqIccEntity> tables =workshopInterfaceService.queryICCList(map);
        ObjectMapper objectMapper = new ObjectMapper();
        String data= JSONObject.toJSONString(tables);
        data="{\"total\":"+String.valueOf(tables.size())+",\"rows\":"+data+"}";
        return data;
    }

    */
/**
     * 获取ICC列表(TOP)
     *//*

    @IgnoreAuth
    @RequestMapping("gettopicclist")
    @ApiOperation(value = "获取ICC列表(TOP)")
    public @ResponseBody String gettopicclist(){
        Map<String ,Object> map=new HashMap<String , Object>();
        List<IqIccEntity> tables =workshopInterfaceService.queryTopICCList(map);
        ObjectMapper objectMapper = new ObjectMapper();
        String data= JSONObject.toJSONString(tables);
        data="{\"total\":"+String.valueOf(tables.size())+",\"rows\":"+data+"}";
        return data;
    }

    */
/**
     * 获取Issue列表
     *//*

    @IgnoreAuth
    @RequestMapping("queryissuelistforwk")
    @ApiOperation(value = "获取Issue列表")
    public @ResponseBody String queryissuelistforwk(String engineno){
        Map<String ,Object> map=new HashMap<String , Object>();
        map.put("engineno",engineno);
        List<MqsIssueEntity> tables =workshopInterfaceService.queryissuelistforwk(map);
        ObjectMapper objectMapper = new ObjectMapper();
        String data= JSONObject.toJSONString(tables);
        data="{\"total\":"+String.valueOf(tables.size())+",\"rows\":"+data+"}";
        return data;
    }

    */
/**
     * 获取发动机基本信息
     *//*

    @IgnoreAuth
    @RequestMapping("querymesenginebasicinfo")
    @ApiOperation(value = "获取发动机基本信息")
    public @ResponseBody String querymesenginebasicinfo(String engineno){
        String enginetype="";
        Map<String ,Object> map=new HashMap<String , Object>();
        map.put("engineno",engineno);
        MESEngineInfo basicinfo =workshopInterfaceService.querymesenginebasicinfo(map);
        if (basicinfo!=null)
        {
            enginetype=basicinfo.getitemseriescode();
        }
        String data="{\"enginemodel\":\"\",\"enginetype\":\""+enginetype+"\"}";
        return data;
    }

    */
/**
     * 获取Issue列表,验证ICC
     *//*

    @IgnoreAuth
    @RequestMapping("verfiyissueicc")
    @ApiOperation(value = "获取Issue列表,验证ICC")
    public @ResponseBody String verfiyissueicc(String engineno,String icccode){
        Map<String ,Object> map=new HashMap<String , Object>();
        map.put("engineno",engineno);
        map.put("icccode",icccode);
        List<MqsIssueEntity> tables =workshopInterfaceService.verfiyissueicc(map);
        if (tables.size()>0)
        {return "ok";}
        else
        {return "nodata";}
    }

    */
/**
     * 新增issue
     *//*

    @IgnoreAuth
    @RequestMapping("insertissue")
    @ApiOperation(value = "新增issue")
    public @ResponseBody String insertissue(String issueid,String productiondeptname,
                                            String productionlinename,String pregion,String pstation,String enginemodel,
                                            String engineno,String icc,String itempart,String failuremodel,
                                            String issuedesc,String repaircontent,String issuestatus,String
                                                        dateclose,String closebyname,String closeby,String createdbyname,
                                            String createdbyid,String datecreated,String modifiedbyname,
                                            String modifiedbyid,String datemodified,String isenable,
                                            String iscp,String icccode,String issueremark,String isonline,String enginetype,String isreproduced){
        MqsIssueEntity mqs_issue=new MqsIssueEntity();
        mqs_issue.setProductiondeptname(productiondeptname);
        mqs_issue.setProductionlinename(productionlinename);
        mqs_issue.setPregion(pregion);
        mqs_issue.setPstation(pstation);
        mqs_issue.setEnginemodel(enginemodel);
        mqs_issue.setEngineno(engineno);
        mqs_issue.setIcc(icc);
        mqs_issue.setItempart(itempart);
        mqs_issue.setFailuremodel(failuremodel);
        mqs_issue.setIssuedesc(issuedesc);
        mqs_issue.setRepaircontent(repaircontent);
        mqs_issue.setIssuestatus(issuestatus);
        //mqs_issue.setDateclose(dateclose);
        mqs_issue.setClosebyname(closebyname);
        mqs_issue.setCloseby(closeby);
        mqs_issue.setCreatedbyname(createdbyname);
        mqs_issue.setCreatedbyid(createdbyid);
        mqs_issue.setDatecreated(DateUtils.getCurrentDate());
        mqs_issue.setModifiedbyname(modifiedbyname);
        mqs_issue.setModifiedbyid(modifiedbyid);
        //mqs_issue.setDatemodified(datemodified);
        mqs_issue.setIsenable(1L);
        mqs_issue.setIscp(0L);
        mqs_issue.setIcccode(icccode);
        mqs_issue.setIssueremark(issueremark);
        mqs_issue.setIsonline(isonline);
        mqs_issue.setIssueattr("");
        mqs_issue.setPartsbarcode("");
        mqs_issue.setEnginetype(enginetype);
        SysUserEntity user=sysUserService.queryByChineseName(createdbyname);
        if (user!=null)
        {
            if (user.getUserextvalue4()==null)
            {
                user.setUserextvalue4("未设置班组");
            }
            mqs_issue.setIssuebz(user.getUserextvalue4());
        }
        else
        {
            mqs_issue.setIssuebz("未设置班组");
        }

        this.mqsIssueService.save(mqs_issue);
        return "ok";
    }

    */
/**
     * 获取Issue详细信息
     *//*

    @IgnoreAuth
    @RequestMapping("queryissueforwk")
    @ApiOperation(value = "获取Issue详细信息")
    public @ResponseBody String queryissueforwk(String issueid){
        Map<String ,Object> map=new HashMap<String , Object>();
        map.put("issueid",issueid);
        MqsIssueEntity issue =workshopInterfaceService.queryissueforwk(map);
        ObjectMapper objectMapper = new ObjectMapper();
        String data= JSONObject.toJSONString(issue);
        return data;
    }

    */
/**
     * 编辑issue
     *//*

    @IgnoreAuth
    @RequestMapping("updateissue")
    @ApiOperation(value = "编辑issue")
    public @ResponseBody String updateissue(String issueid,String productiondeptname,
                                            String productionlinename,String pregion,String pstation,String enginemodel,
                                            String engineno,String icc,String itempart,String failuremodel,
                                            String issuedesc,String repaircontent,String issuestatus,String
                                                        dateclose,String closebyname,String closeby,String createdbyname,
                                            String createdbyid,String datecreated,String modifiedbyname,
                                            String modifiedbyid,String datemodified,String isenable,
                                            String iscp,String icccode,String issueremark,String isonline,String issueattr,String partsbarcode,String enginetype,String isreproduced){
        Map<String ,Object> map=new HashMap<String , Object>();
        map.put("issueid",issueid);
        MqsIssueEntity issue =workshopInterfaceService.queryissueforwk(map);
        issue.setIssuedesc(issuedesc);
        issue.setRepaircontent(repaircontent);
        issue.setIssuestatus("关闭");
        issue.setDateclose(DateUtils.getCurrentDate());
        issue.setDateclosestring(DateUtils.getCurrentDateAsString());
        issue.setClosebyname(closebyname);
        issue.setModifiedbyname(modifiedbyname);
        issue.setDatemodified(DateUtils.getCurrentDate());
        issue.setIssueremark(issueremark);
        issue.setIssueattr(issueattr);
        issue.setPartsbarcode(partsbarcode);
        issue.setIsreproduced(isreproduced);
        this.mqsIssueService.update(issue);
        return "ok";
    }

    */
/**
     * 删除Issue详细信息
     *//*

    @IgnoreAuth
    @RequestMapping("deleteissue")
    @ApiOperation(value = "删除Issue详细信息")
    public @ResponseBody String deleteissue(String issueid){

        mqsIssueService.delete(Long.parseLong(issueid));
        return "ok";
    }

    */
/**
     * 获取Issue列表
     *//*

    @IgnoreAuth
    @RequestMapping("queryissuelistforwklog")
    @ApiOperation(value = "获取Issue列表")
    public @ResponseBody String queryissuelistforwklog(String engineno,String pstation,String issuebz,String datecreated,String dateclose,String icc){
        if (dateclose==null)
        {
            dateclose=DateUtils.getCurrentDateAsString(DateUtils.DATE_TIME_PATTERN);
            datecreated=DateUtils.format(DateUtils.toDate(DateUtils.getBackMonthTime(DateUtils.getCurrentDate(),1)),DateUtils.DATE_TIME_PATTERN);
        }

        Map<String ,Object> map=new HashMap<String , Object>();
        map.put("engineno",engineno);
        map.put("pstation",pstation);
        map.put("issuebz",issuebz);
        map.put("datecreated",datecreated);
        map.put("dateclose",dateclose);
        map.put("icc",icc);
        List<MqsIssueEntity> tables =workshopInterfaceService.queryissuelistforwklog(map);
        ObjectMapper objectMapper = new ObjectMapper();
        String data= JSONObject.toJSONString(tables);
        data="{\"total\":"+String.valueOf(tables.size())+",\"rows\":"+data+"}";
        return data;
    }
    //mqsProductionteamService

    @IgnoreAuth
    @RequestMapping("queryteamlist")
    @ApiOperation(value = "获取Issue列表")
    public @ResponseBody String queryteamlist(String engineno,String pstation,String issuebz,String datecreated,String dateclose,String icc){
        List<MqsProductionteamEntity> teamlist =mqsProductionteamService.queryList(null);
        String data="";
        for(MqsProductionteamEntity entity : teamlist)
        {
            if (data.equals(""))
            {
                data=String.valueOf(entity.getProductionteamname());
            }
            else
            {
                data=data+","+String.valueOf(entity.getProductionteamname());
            }
        }
        return data;
    }

    */
/**
     * 获取机型系列信息
     *//*

    @IgnoreAuth
    @RequestMapping("getenginemodelandtypelist")
    @ApiOperation(value = "获取机型系列信息")
    public @ResponseBody String getenginemodelandtypelist(String plineid){
        Map<String ,Object> map=new HashMap<String , Object>();
        map.put("productionlineid",plineid);
        List<MqsEnginetypeEnginemodelEntity> tables =mqsEnginetypeEnginemodelService.queryList(map);
        ObjectMapper objectMapper = new ObjectMapper();
        String data= JSONObject.toJSONString(tables);
        data="{\"total\":"+String.valueOf(tables.size())+",\"rows\":"+data+"}";
        return data;
    }


    */
/**
     * 获取系列信息
     *//*

    @IgnoreAuth
    @RequestMapping("getenginemodellist")
    @ApiOperation(value = "获取系列信息")
    public @ResponseBody String getenginemodellist(String plineid){
        Map<String ,Object> map=new HashMap<String , Object>();
        map.put("productionlineid",plineid);
        List<MqsEnginetypeEnginemodelEntity> tables =mqsEnginetypeEnginemodelService.queryEnginemodel();
        ObjectMapper objectMapper = new ObjectMapper();
        String data= JSONObject.toJSONString(tables);
        data="{\"total\":"+String.valueOf(tables.size())+",\"rows\":"+data+"}";
        return data;
    }*/
}

