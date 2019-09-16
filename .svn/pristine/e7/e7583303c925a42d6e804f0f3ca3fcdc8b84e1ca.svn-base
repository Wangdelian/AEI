package io.jeasyframework.controller.mes;

import io.jeasyframework.entity.MesOeePromoteEntity;
import io.jeasyframework.service.MesOeePromoteService;
import io.jeasyframework.utils.Query;
import io.jeasyframework.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/11.
 */
@Controller
@RequestMapping("/mes/promote")
public class MesOeePromoteController {
    @Autowired
    private MesOeePromoteService mesOeePromoteService;


    /**
     * 数据列表
     */
    @ResponseBody
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params){

        //查询列表数据
        List<MesOeePromoteEntity> list = mesOeePromoteService.queryList();
        return R.ok().put("list",list);

    }

}
