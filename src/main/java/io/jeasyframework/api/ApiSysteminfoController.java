package io.jeasyframework.api;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.entity.ChTraincheckinfoEntity;
import io.jeasyframework.service.ChTraincheckinfoService;
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
@Api(value="系统监测数据",tags={"系统监测数据接口"},description = "系统监测数据")
public class ApiSysteminfoController {
    @Autowired
    private ChTraincheckinfoService chTraincheckinfoService;
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SiteConfig siteConfig;

    @IgnoreAuth
    @GetMapping("/querySysteminfo")
    @ApiOperation(value="查询",notes = "Web访问次数：监控对应名称下Web被所有用户访问的总次数;;;\n" +
            "Web最后一次访问时间：监控对应名称下Web最后一次被用户访问的时间;;;\n" +
            "系统状态：监控对应名称下Web服务器是否崩溃;;;\n" +
            "数据状态：监控对应名称下过车数据是否正常，调取WebAPI接口查询最新有过车数据（默认5小时之内是否有最新数据，application.yml配置为web.config.config03）")
    @ApiImplicitParams({})
    public Map<String, Object> querySysteminfo(){
        Map<String, Object> result = new HashMap<String, Object>();

        result.put("count",sysUserService.queryLoginCount());
        result.put("lastLogin",sysUserService.queryLastLogin());

        Map<String, Object> condition = new HashMap<String, Object>();
        condition.put("range",siteConfig.getConfig03());
        List<ChTraincheckinfoEntity> list = chTraincheckinfoService.queryLast(condition);
        String dataStatus;
        if(list.isEmpty()){
            dataStatus = "异常";
        }else{
            dataStatus = "正常";
        }
        result.put("dataStatus",dataStatus);
        return result;
    }
}
