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
@RequestMapping("/train/trainpath")
public class TrainPathController extends AbstractController {
    @Autowired
    private ChTraincheckinfoService chTraincheckinfoService;
    @Autowired
    private SiteConfig siteConfig;
    @Autowired
    private ChTraincheckdetailService chTraincheckdetailService;

    private static  int PAGE_LIMIT = 50;

    @RequestMapping("/searchlist")
    public ModelAndView searchlist(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/TrainPath/trainPath", this.getUserSkin());
        ModelAndView view = mf.CreateModelAndView();
        return view;
    }



    /**
     * 机车运行轨迹
     */
    @RequestMapping(value = "/trainPath/{pageNum}", method = RequestMethod.POST)
    public R trainPath(@RequestBody Map<String, Object> params, @PathVariable("pageNum") int pageNum) {
        PageHelper.startPage(pageNum, siteConfig.getPagesize());
        //查询列表数据
        Query query = new Query(params);
        List<ChTraincheckinfoEntity> chTraincheckinfoList = chTraincheckinfoService.queryTrainPath(query);
        int total = chTraincheckinfoService.queryTrainPathTotal(query);
        PageUtils pageUtil = new PageUtils(chTraincheckinfoList, total,query.getLimit(), query.getPage());
        return R.ok().put("page", pageUtil);
    }

    //机车运行轨迹-车型选择下拉框
    @RequestMapping(value = "/queryType", method = RequestMethod.POST)
    public R queryType(@RequestBody Map<String, Object> params) {
        List<ChTraincheckinfoEntity> juInfoList = chTraincheckinfoService.queryType(params);
        return R.ok().put("list", juInfoList);
    }

    //机车运行轨迹-车号选择下拉框
    @RequestMapping(value = "/queryNumber", method = RequestMethod.POST)
    public R queryNumber(@RequestBody Map<String, Object> params) {
        List<ChTraincheckinfoEntity> juInfoList = chTraincheckinfoService.queryNumber(params);
        return R.ok().put("list", juInfoList);
    }
}
