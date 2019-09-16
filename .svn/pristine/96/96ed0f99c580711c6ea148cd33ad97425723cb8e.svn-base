package io.jeasyframework.api;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jeasyframework.entity.ChDeviceEntity;
import io.jeasyframework.entity.ChTraincheckinfoEntity;
import io.jeasyframework.service.ChDeviceService;
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
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value="设备数据",tags={"5 设备数据接口"},description = "设备数据")
public class ApiChDeviceController {
    @Autowired
    private ChDeviceService chDeviceService;
    //@IgnoreAuth
    @GetMapping("/queryDevice")
    @ApiOperation(value="查询",notes = "查询说明")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fDeviceid", value = "设备号ID")
    })
    public String queryByconditions(String fDeviceid){
        ChDeviceEntity chDeviceEntity = new ChDeviceEntity();
        chDeviceEntity.setFDeviceid(fDeviceid);
        //模糊查询
        List<ChDeviceEntity> list= chDeviceService.queryByDeviceid(chDeviceEntity);

        ObjectMapper objectMapper = new ObjectMapper();
        String data = "{\"total\":"+String.valueOf(list.size())+"}";
        for(int i=0;i<list.size();i++){
            String listdata= JSONObject.toJSONString(list.get(i));
            data += "\n"+listdata;
        }
        return data;
    }
}
