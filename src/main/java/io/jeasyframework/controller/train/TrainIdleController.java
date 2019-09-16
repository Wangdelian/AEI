package io.jeasyframework.controller.train;


import com.github.pagehelper.PageHelper;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.ChTraincheckinfoEntity;
import io.jeasyframework.service.ChTraincheckdetailService;
import io.jeasyframework.service.ChTraincheckinfoService;
import io.jeasyframework.utils.*;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;


/**
 * ${comments}
 */
@RestController
@RequestMapping("/train/trainidle")
public class TrainIdleController extends AbstractController {
    @Autowired
    private ChTraincheckinfoService chTraincheckinfoService;
    @Autowired
    private SiteConfig siteConfig;
    @Autowired
    private ChTraincheckdetailService chTraincheckdetailService;

    private static  int PAGE_LIMIT = 10;

    @RequestMapping("/searchlist")
    public ModelAndView searchlist(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/trainIdle/trainIdle", this.getUserSkin());
        ModelAndView view = mf.CreateModelAndView();
        return view;
    }

    /**
     * 列表
     */
    @RequestMapping(value = "/list/{pageNum}", method = RequestMethod.POST)
    public R list(@RequestBody Map<String, Object> params, @PathVariable("pageNum") int pageNum) {
        PageHelper.startPage(pageNum, PAGE_LIMIT);
        //查询列表数据
        Query query = new Query(params);
        List<ChTraincheckinfoEntity> chTraincheckinfoList = chTraincheckinfoService.queryIdleList(query);
        int total = chTraincheckinfoService.queryIdleTotal(query);
        PageUtils pageUtil = new PageUtils(chTraincheckinfoList, total,PAGE_LIMIT, query.getPage());
        return R.ok().put("page", pageUtil);
    }

    @RequestMapping(value = "/queryJu", method = RequestMethod.POST)
    public R queryJu(@RequestBody Map<String, Object> params) {
        List<ChTraincheckinfoEntity> juInfoList = chTraincheckinfoService.queryJu(params);
        return R.ok().put("juInfoList", juInfoList);
    }

    @RequestMapping(value = "/queryDuan", method = RequestMethod.POST)
    public R queryDuan(@RequestBody Map<String, Object> params) {
        List<ChTraincheckinfoEntity> juInfoList = chTraincheckinfoService.queryDuan(params);
        return R.ok().put("juInfoList", juInfoList);
    }

    @RequestMapping(value = "/queryChang", method = RequestMethod.POST)
    public R queryChang(@RequestBody Map<String, Object> params) {
        List<ChTraincheckinfoEntity> juInfoList = chTraincheckinfoService.queryChang(params);
        return R.ok().put("juInfoList", juInfoList);
    }
}
