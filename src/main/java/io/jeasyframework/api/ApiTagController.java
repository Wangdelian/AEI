package io.jeasyframework.api;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jeasyframework.entity.ChTraincheckinfoEntity;
import io.jeasyframework.service.ChTraincheckinfoService;
import io.jeasyframework.utils.DateUtils;
import io.jeasyframework.utils.R;
import io.jeasyframework.utils.annotation.IgnoreAuth;
import io.jeasyframework.utils.validator.Assert;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Api(value="过车数据",tags={"2 过车数据接口"},description = "过车数据")
public class ApiTagController {
    @Autowired
    private ChTraincheckinfoService chTraincheckinfoService;

    //@IgnoreAuth
    @GetMapping("/tag_queryByConditions")
    @ApiOperation(value="查询",notes = "查询说明")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", dataType="string", name = "LevelMarkID", value = "组织架构ID"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fTraintypeverdict", value = "识别车型"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fTrainnumberverdict", value = "识别车号"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fdetalReserve2", value = "确认车型"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fdetalReserve5", value = "确认车号"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fDirection", value = "方向"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fTimeStart", value = "开始时间(格式为yyyy-mm-dd,小于通过时间)"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fTimeEnd", value = "结束时间(格式为yyyy-mm-dd，大于通过时间)"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "errorCondition", value = "标签错误情况(1为标签不可识别 2为标签识别错误)")
    })
    public String queryByconditions(String LevelMarkID,String fTraintypeverdict,String fTrainnumberverdict,String fdetalReserve2,String fdetalReserve5,String fDirection,String fTimeStart,String fTimeEnd,String errorCondition){

        Assert.isymd(fTimeStart, "格式不正确");
        Assert.isymd(fTimeEnd, "格式不正确");
        Assert.isoneortwo(errorCondition, "标签错误情况只能填1或者2");
        if((fTimeStart==null||fTimeStart=="")&&(fTimeEnd==null||fTimeEnd=="")){
            fTimeStart = DateUtils.format(new Date());
            fTimeEnd  = DateUtils.getBackDayymdTime(fTimeStart,-1);

            //&&LevelMarkID==null&fTraintypeverdict==null&&fTrainnumberverdict==null&&fdetalReserve2==null&&fdetalReserve5==null&&fDirection==null&&errorCondition==null
        }else if((fTimeStart!=null||fTimeStart!="")&&(fTimeEnd==null||fTimeEnd=="")){
            fTimeEnd  = DateUtils.getBackDayymdTime(fTimeStart,-1);
        }else if((fTimeStart==null||fTimeStart=="")&&(fTimeEnd!=null||fTimeEnd!="")){
            fTimeStart  = DateUtils.getBackDayymdTime(fTimeEnd,1);
        }

        ChTraincheckinfoEntity chTraincheckinfo = new ChTraincheckinfoEntity();
        chTraincheckinfo.setFDeviceid(LevelMarkID);
        chTraincheckinfo.setfTraintypeverdict(fTraintypeverdict);
        chTraincheckinfo.setfTrainnumberverdict(fTrainnumberverdict);
        chTraincheckinfo.setFdetalReserve2(fdetalReserve2);
        chTraincheckinfo.setFdetalReserve5(fdetalReserve5);
        chTraincheckinfo.setFDirection(fDirection);
        chTraincheckinfo.setfTimeStart(fTimeStart);
        chTraincheckinfo.setfTimeEnd(fTimeEnd);
        chTraincheckinfo.setErrorCondition(errorCondition);
        //模糊查询
        List<ChTraincheckinfoEntity> list= chTraincheckinfoService.queryByConditions(chTraincheckinfo);

        ObjectMapper objectMapper = new ObjectMapper();
        StringBuilder stringBuilder=new StringBuilder("{\"status\":\"success\",");
        if(list.size()<1){
            return "{\"result\":\"\",\"status\":\"fail\"}";
        }
        stringBuilder.append("\"result\":[");
        for(int i=0;i<list.size();i++){
            String listdata= list.get(i).toString();
            stringBuilder.append("\n");
            stringBuilder.append(listdata);
            if(i<list.size()-1){
                stringBuilder.append(",");
            }
        }
        stringBuilder.append("]}");
        /*String data= JSONObject.toJSONString(list);
        data="{\"total\":"+String.valueOf(list.size())+",\"rows\":"+data+"}";*/
        return stringBuilder.toString();
    }

}
