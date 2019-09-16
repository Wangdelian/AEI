package io.jeasyframework.api;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jeasyframework.entity.ChTraincheckdetailEntity;
import io.jeasyframework.entity.SysUserEntity;
import io.jeasyframework.service.SysUserService;
import io.jeasyframework.utils.DateUtils;
import io.jeasyframework.utils.annotation.IgnoreAuth;
import io.jeasyframework.utils.validator.Assert;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Api(value = "登陆情况", tags = {"6 登陆情况接口"}, description = "登陆情况")
public class ApiLoginInfoController {
    @Autowired
    private SysUserService sysUserService;
    //@IgnoreAuth
    @GetMapping("/queryLoginInfo")
    @ApiOperation(value="查询",notes = "查询说明")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", dataType="string", name = "dayCount", value = "最近天数内是否登陆(只能为正整数)")
    })
    public String queryByconditions(String dayCount){
        if(dayCount == null){
            dayCount = "10";
        }
        Assert.isint(dayCount, "只能为正整数");
        String fTimeEnd = DateUtils.formatT(new Date());
        String fTimeStart  = DateUtils.getBackDayTime(new Date(),Integer.parseInt(dayCount)-1).substring(0,11)+" 00:00:00";
        Map<String,Object> timeMap = new HashMap<String,Object>();
        timeMap.put("fTimeStart",fTimeStart);
        timeMap.put("fTimeEnd",fTimeEnd);
        List<SysUserEntity> list= sysUserService.queryIsLogin(timeMap);
        String isLoginFlag;
        if(list.size()>0){
            isLoginFlag = "是";
        }else{
            isLoginFlag = "否";
        }

        String data = dayCount+"天内是否登陆过:"+isLoginFlag;
        return data;
    }
}
