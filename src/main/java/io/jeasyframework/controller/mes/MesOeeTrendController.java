package io.jeasyframework.controller.mes;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.MesOeeTrendEntity;
import io.jeasyframework.service.MesOeeTrendService;
import io.jeasyframework.utils.Query;
import io.jeasyframework.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.List;
/**
 * Created by yaobaolin on 2017/8/7 0007.
 */
@RestController
@RequestMapping("/mes/trend")
public class MesOeeTrendController extends AbstractController {
    @Autowired
    private MesOeeTrendService mesOeeTrendService;
    /**
     * 数据列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params){
        //查询列表数据
        Query query = new Query(params);
        List<MesOeeTrendEntity> list = mesOeeTrendService.queryList(query);

        return R.ok().put("list", list);

    }
    /**
     * 工作线列表
     */
    @RequestMapping("/worklinelist")
    public R workLinelist(@RequestParam Map<String, Object> params){
        //查询列表数据
        List<MesOeeTrendEntity> list = mesOeeTrendService.queryLine(params);
        return R.ok().put("list", list);
    }
    /**
     * 工作线日期
     */
    @RequestMapping("/worklinedaylist")
    public R workLinedays(@RequestParam Map<String, Object> params){
        //查询列表数据
        List<MesOeeTrendEntity> list = mesOeeTrendService.queryLineDay(params);
        return R.ok().put("list", list);
    }
    /**
     * 工作线班次列表
     */
    @RequestMapping("/worklineshiftlist")
    public R workLineshiftlist(@RequestParam Map<String, Object> params){
        //查询列表数据
        List<MesOeeTrendEntity> list = mesOeeTrendService.queryLineShiftName(params);
        return R.ok().put("list", list);
    }
}
