package io.jeasyframework.plugins.codegenerator.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.plugins.codegenerator.entity.TableEntity;
import io.jeasyframework.plugins.codegenerator.service.SysGeneratorService;
import io.jeasyframework.utils.ModelAndViewFactory;
import io.jeasyframework.utils.PageUtils;
import io.jeasyframework.utils.Query;
import io.jeasyframework.utils.R;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 代码生成器
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年12月19日 下午9:12:58
 */
@Controller
@RequestMapping("/sys/generator")
public class SysGeneratorController extends AbstractController {
    @Autowired
    private SysGeneratorService sysGeneratorService;
    @Autowired
    private SiteConfig siteConfig;


    /***
     * @method initTableList
     * @description 初始化数据源中数据表清单
     * @author daixirui@gmail.com
     * @date 2017/9/18 09:18
     * @param        [req]
     * @return org.springframework.web.servlet.ModelAndView
     */
    @RequestMapping("/inittablelist")
    public ModelAndView initTableList(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "plugins/template/CodeGen/tablelist", this.getUserSkin());

        ModelAndView view = mf.CreateModelAndView();

        return view;
    }

    /***
     * @method       TableList
     * @description  获取数据库中表清单数据
     * @author       daixirui@gmail.com
     * @date         2017/9/18 15:51
     * @param        [condition, pageNum]
     * @return       io.jeasyframework.utils.R
     */
    @ResponseBody
    @RequestMapping(value = "/tablelist/{pageNum}", method = RequestMethod.POST)
    public R TableList(@RequestBody Map<String, Object> condition, @PathVariable int pageNum) {
        PageHelper.startPage(pageNum, siteConfig.getPagesize());

        Query query = new Query(condition);
        List<TableEntity> tables = sysGeneratorService.queryListForEntity(query);
        int total = sysGeneratorService.queryTotal(query);
        PageUtils pageUtil = new PageUtils(tables, total, query.getLimit(), query.getPage());

        return R.ok().put("page", pageUtil);
    }

    /***
     * @method       codegen
     * @description  代码生成
     * @author       daixirui@gmail.com
     * @date         2017/9/18 16:18
     * @param        [request, response]
     * @return       void
     */
    @RequestMapping("/codegen")
    public void codegen(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String[] tableNames = new String[]{};
        String tables = request.getParameter("tables");
        tableNames=tables.split(",");
        //tableNames = JSON.parseArray(tables).toArray(tableNames);

        byte[] data = sysGeneratorService.generatorCode(tableNames);

        response.reset();
        response.setHeader("Content-Disposition", "attachment; filename=\"jeasyframework.zip\"");
        response.addHeader("Content-Length", "" + data.length);
        response.setContentType("application/octet-stream; charset=UTF-8");

        IOUtils.write(data, response.getOutputStream());
    }

    /**
     * 列表
     */
    @ResponseBody
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        List<Map<String, Object>> list = sysGeneratorService.queryList(query);
        int total = sysGeneratorService.queryTotal(query);

        PageUtils pageUtil = new PageUtils(list, total, query.getLimit(), query.getPage());

        return R.ok().put("page", pageUtil);
    }

    /**
     * 生成代码
     */
    @RequestMapping("/code")
    public void code(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String[] tableNames = new String[]{};
        String tables = request.getParameter("tables");
        tableNames = JSON.parseArray(tables).toArray(tableNames);

        byte[] data = sysGeneratorService.generatorCode(tableNames);

        response.reset();
        response.setHeader("Content-Disposition", "attachment; filename=\"jeasyframework.zip\"");
        response.addHeader("Content-Length", "" + data.length);
        response.setContentType("application/octet-stream; charset=UTF-8");

        IOUtils.write(data, response.getOutputStream());
    }
}
