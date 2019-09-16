package io.jeasyframework.api;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jeasyframework.entity.ChTraincheckinfoEntity;
import io.jeasyframework.service.ChTraincheckinfoService;
import io.jeasyframework.utils.annotation.IgnoreAuth;
import io.jeasyframework.utils.validator.Assert;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//@RestController
@RequestMapping("/api")
@Api(value="运维监测",tags={"运维监测接口"},description = "运维监测")
public class ApiMonitorController {
    @Autowired
    private ChTraincheckinfoService chTraincheckinfoService;



    //@IgnoreAuth
    @PostMapping("/monitor_queryByConditions")
    @ApiOperation(value="查询",notes = "查询说明")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", dataType="string", name = "LevelMarkID", value = "组织架构ID"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fTrainorder", value = "车次"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fTraintypeverdict", value = "识别车型"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fTrainnumberverdict", value = "识别车号"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fdetalReserve2", value = "确认车型"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fdetalReserve5", value = "确认车号"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fBureauname", value = "局"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fSectionname", value = "段"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fPasssite", value = "闸楼"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fPasspoint", value = "地点"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fDirection", value = "方向"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fTimeStart", value = "开始时间(格式为yyyy-mm-dd,小于通过时间)"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fTimeEnd", value = "结束时间(格式为yyyy-mm-dd，大于通过时间)"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fInforfid", value = "标签"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fdetalReserve3", value = "确定人")
    })
    public String queryByconditions(String LevelMarkID,String fTrainorder,String fTraintypeverdict,String fTrainnumberverdict,String fdetalReserve2,String fdetalReserve5,String fBureauname,String fSectionname,String fPasssite,String fPasspoint,String fDirection,String fTimeStart,String fTimeEnd,String fInforfid,String fdetalReserve3){

        Assert.isymd(fTimeStart, "格式不正确");
        Assert.isymd(fTimeEnd, "格式不正确");
        //Assert.isymd(fdetalReserve4, "格式不正确");

        ChTraincheckinfoEntity chTraincheckinfo = new ChTraincheckinfoEntity();
        chTraincheckinfo.setFDeviceid(LevelMarkID);
        chTraincheckinfo.setFTrainorder(fTrainorder);
        chTraincheckinfo.setfTraintypeverdict(fTraintypeverdict);
        chTraincheckinfo.setfTrainnumberverdict(fTrainnumberverdict);
        chTraincheckinfo.setFdetalReserve2(fdetalReserve2);
        chTraincheckinfo.setFdetalReserve5(fdetalReserve5);
        chTraincheckinfo.setfBureauname(fBureauname);
        chTraincheckinfo.setfSectionname(fSectionname);
        chTraincheckinfo.setFPasssite(fPasssite);
        chTraincheckinfo.setFPasspoint(fPasspoint);
        chTraincheckinfo.setFDirection(fDirection);
        chTraincheckinfo.setfTimeStart(fTimeStart);
        chTraincheckinfo.setfTimeEnd(fTimeEnd);
        chTraincheckinfo.setfInforfid(fInforfid);
        chTraincheckinfo.setFdetalReserve3(fdetalReserve3);
        //模糊查询
        List<ChTraincheckinfoEntity> list= chTraincheckinfoService.queryByConditions(chTraincheckinfo);

        ObjectMapper objectMapper = new ObjectMapper();
        String data = "{\"total\":"+String.valueOf(list.size())+"}";
        for(int i=0;i<list.size();i++){
            String listdata= JSONObject.toJSONString(list.get(i));
            data += "\n"+listdata;
        }
        /*String data= JSONObject.toJSONString(list);
        data="{\"total\":"+String.valueOf(list.size())+",\"rows\":"+data+"}";*/
        return data;
    }
}
