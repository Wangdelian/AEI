package io.jeasyframework.controller.mes;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.MesOeeDataEntity;
import io.jeasyframework.service.MesOeeDataService;
import io.jeasyframework.utils.PageUtils;
import io.jeasyframework.utils.Query;
import io.jeasyframework.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by yaobaolin on 2017/8/7 0007.
 */
@RestController
@RequestMapping("/mes/oeedata")
public class MesOeeDataController extends AbstractController {
    @Autowired
    private MesOeeDataService mesOeeDataService;
    /**
     * 数据列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params){

        //查询列表数据
        Query query = new Query(params);
        List<MesOeeDataEntity> list = mesOeeDataService.queryList(query);

        return R.ok().put("list", list);

    }
    /**
     * 工作线列表
     */
    @RequestMapping("/worklinelist")
    public R workLinelist(@RequestParam Map<String, Object> params){

        //查询列表数据
        Query query = new Query(params);
        List<MesOeeDataEntity> list = mesOeeDataService.queryLine(params);


        return R.ok().put("list", list);
    }
}
