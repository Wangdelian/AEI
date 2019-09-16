package io.jeasyframework.api;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jeasyframework.entity.ChTraincheckinfoEntity;
import io.jeasyframework.service.ChTraincheckinfoService;
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
@Api(value="总过车数据",tags={"3 总过车数据接口"},description = "总过车数据")
public class ApiChTrainCheckinfoController {
    @Autowired
    private ChTraincheckinfoService chTraincheckinfoService;
    //@IgnoreAuth
    @GetMapping("/queryAllTrainCheckinfo")
    @ApiOperation(value="查询",notes = "查询说明")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fTimeStart", value = "开始时间(格式为yyyy-mm-dd,小于通过时间)"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "fTimeEnd", value = "结束时间(格式为yyyy-mm-dd，大于通过时间)"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "chCount", value = "最新过车数据条数(只能为正整数)")
    })
    public String queryByconditions(String fTimeStart,String fTimeEnd,String chCount){

        Assert.isymd(fTimeStart, "格式不正确");
        Assert.isymd(fTimeEnd, "格式不正确");
        Assert.isint(chCount, "只能为正整数");
        if((fTimeStart==null||fTimeStart=="")&&(fTimeEnd==null||fTimeEnd=="")&&chCount==null){
            fTimeStart = DateUtils.format(new Date());
            fTimeEnd  = DateUtils.getBackDayymdTime(fTimeStart,-1);
        }

        ChTraincheckinfoEntity chTraincheckinfo = new ChTraincheckinfoEntity();
        chTraincheckinfo.setfTimeStart(fTimeStart);
        chTraincheckinfo.setfTimeEnd(fTimeEnd);
        chTraincheckinfo.setChCount(chCount);
        //模糊查询
        List<ChTraincheckinfoEntity> list= chTraincheckinfoService.queryAllInfo(chTraincheckinfo);

        ObjectMapper objectMapper = new ObjectMapper();
        String data = "{\"total\":"+String.valueOf(list.size())+"}";
        for(int i=0;i<list.size();i++){
            String listdata= JSONObject.toJSONString(list.get(i));
            data += "\n"+listdata;
        }
        return data;
    }
}
