package io.jeasyframework.api;

import com.alibaba.fastjson.JSONObject;
import io.jeasyframework.entity.LevelMarkEntity;
import io.jeasyframework.service.ChDeviceService;
import io.jeasyframework.service.LevelMarkService;
import io.jeasyframework.utils.annotation.IgnoreAuth;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Api(value="组织架构ID",tags={"1 组织架构ID接口"},description = "组织架构ID")
public class ApiLevelmarkController {
    @Autowired
    private LevelMarkService levelMarkService;
    @Autowired
    private ChDeviceService chDeviceService;

    //@IgnoreAuth
    @GetMapping("/levelmark_queryByConditions")
    @ApiOperation(value="查询",notes = "查询说明")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", dataType="string", name = "levelmarkid", value = "组织架构ID"),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "abname", value = "组织架构名称")
    })
    public String queryByconditions(String levelmarkid,String abname){
        LevelMarkEntity levelMarkEntity = new LevelMarkEntity();
        levelMarkEntity.setLevelmarkid(levelmarkid);
        levelMarkEntity.setAbname(abname);
        List<LevelMarkEntity> chdevicelist = new ArrayList<>();
        List levelidlist = new ArrayList<>();

        List<LevelMarkEntity> levellist = levelMarkService.queryByConditions(levelMarkEntity);
        for(int i=0;i<levellist.size();i++){
            levelidlist.add(levellist.get(i).getLevelmarkid());
        }

        Map<String,Object> params = new HashMap<String,Object>();
        if(levellist.size()>0){
            params.put("levelidlist",levelidlist);
            chdevicelist = chDeviceService.queryByLevelmarkid(params);
        }
        levellist.addAll(chdevicelist);
        List<LevelMarkEntity> rootTrees = new ArrayList<>();
        for (LevelMarkEntity tree : levellist) {
            if(tree.getPid().equals("0")){
                rootTrees.add(tree);
            }
            for (LevelMarkEntity t : levellist) {
                if(t.getPid().equals(tree.getLevelmarkid())){
                    if(tree.getChild() == null){
                        List<LevelMarkEntity> myChildrens = new ArrayList<LevelMarkEntity>();
                        myChildrens.add(t);
                        tree.setChild(myChildrens);
                    }else{
                        tree.getChild().add(t);
                    }
                }
            }
        }
        for (LevelMarkEntity tree : rootTrees) {
            System.out.println(tree.toString());
        }

        String data = "{\"status\":\"success\",";
        if(rootTrees.size()<1){
            return "{\"result\":\"\",\"status\":\"fail\"}";
        }
        data +="\"result\":[";
        for(int i=0;i<rootTrees.size();i++){
            String listdata= JSONObject.toJSONString(rootTrees.get(i));
            data += "\n"+listdata;
        }
        data +="]}";
        /*
        for(int i=0;i<chdevicelist.size();i++){
            String listdata= JSONObject.toJSONString(chdevicelist.get(i));
            data += "\n"+listdata;
        }*/

        return data;
    }
}
