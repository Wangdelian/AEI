package io.jeasyframework.controller.system;

import com.github.pagehelper.PageHelper;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.SysLogAnalyzeEntity;
import io.jeasyframework.entity.SysLogEntity;
import io.jeasyframework.entity.SysUserEntity;
import io.jeasyframework.service.SysLogService;
import io.jeasyframework.utils.*;
import io.jeasyframework.utils.annotation.SysLog;
import io.jeasyframework.utils.validator.Assert;
import io.jeasyframework.utils.validator.ValidatorUtils;
import io.jeasyframework.utils.validator.group.AddGroup;
import io.jeasyframework.utils.validator.group.UpdateGroup;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static io.jeasyframework.utils.aop.SysLogAspect.makeLog;


/**
 * 系统日志
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017-03-08 10:40:56
 */
@Controller
@RequestMapping("/sys/log")
public class SysLogController  extends AbstractController {
	@Autowired
	private SysLogService sysLogService;
	@Autowired
	private SiteConfig siteConfig;

	/**
	 * 修改日志
	 */
	@SysLog(value = "修改日志",type = "管理操作")
	@ResponseBody
	@RequestMapping("/update")
	public R update(@RequestBody SysLogEntity log){
		ValidatorUtils.validateEntity(log, UpdateGroup.class);

		sysLogService.update(log);

		SysLogEntity sysLog = makeLog("修改日志","管理操作",log,true);
		//保存系统日志
		sysLogService.save(sysLog);

		return R.ok();
	}

	/**
	 * 初始化日志列表
	 * @param req
	 * @return
	 */
	@RequestMapping("/searchlist")
	public ModelAndView searchlist(HttpServletRequest req) {
		String webTitle=siteConfig.getWebTitle();
		ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/SysLogMgr/sysloglist","skin2");
		//ModelAndView view=mf.CreateModelAndView("","skin1");
		ModelAndView view=mf.CreateModelAndView();
		//total 是模板的全局变量，可以直接访问
		//view.addObject("message","Hello Spring Boot Beetl!");
		return view;
	}


	/**
	 * 初始化日志分析页面
	 * @param req
	 * @return
	 */
	@RequestMapping("/analyze")
	public ModelAndView analyze(HttpServletRequest req) {
		String webTitle=siteConfig.getWebTitle();
		ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/SysLogMgr/syslogAnalyze","skin2");
		//ModelAndView view=mf.CreateModelAndView("","skin1");
		ModelAndView view=mf.CreateModelAndView();
		//total 是模板的全局变量，可以直接访问
		//view.addObject("message","Hello Spring Boot Beetl!");
		return view;
	}

	/**
	 * 初始化编辑日志界面
	 * @param req
	 * @return
	 */
	@RequestMapping("/editlog/{id}")
	public ModelAndView editlog(HttpServletRequest req,@PathVariable("id") Long id) {
		String webTitle=siteConfig.getWebTitle();
		ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/SysLogMgr/editlog","");

		ModelAndView view=mf.CreateModelAndView();

		view.addObject("id",id);
		return view;
	}

	/**
	 * 初始化新增日志界面
	 * @param req
	 * @return
	 */
	@RequestMapping("/addlog")
	public ModelAndView addlog(HttpServletRequest req) {
		String webTitle=siteConfig.getWebTitle();
		ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/SysLogMgr/addlog","");

		ModelAndView view=mf.CreateModelAndView();
		return view;
	}

	/**
	 * 初始化列表,带条件的查询
	 */
	@ResponseBody
	@RequestMapping(value = "/list/{pageNum}" , method = RequestMethod.POST)
	public R list(@RequestBody Map<String, Object> condition,@PathVariable("pageNum")int pageNum){
		PageHelper.startPage(pageNum, 20);

		Query query = new Query(condition);

		List<SysLogEntity> sysLogList = sysLogService.queryList(query);
		int total = sysLogService.queryTotal(query);

		PageUtils pageUtil = new PageUtils(sysLogList, total, query.getLimit(), query.getPage());

		return R.ok().put("page", pageUtil);
	}


	/**
	 * 日志分析数据查询
	 */
	@ResponseBody
	@RequestMapping(value = "/analyzeList/{pageNum}" , method = RequestMethod.POST)
	public R analyzeList(@RequestBody Map<String, Object> condition,@PathVariable("pageNum")int pageNum){
		PageHelper.startPage(pageNum, 20);

		Query query = new Query(condition);

		List<SysLogAnalyzeEntity> sysLogList = sysLogService.analyzeList(query);
		int total = sysLogService.analyzeTotal(query);

		PageUtils pageUtil = new PageUtils(sysLogList, total, query.getLimit(), query.getPage());

		return R.ok().put("page", pageUtil);
	}


	/**
	 * 日志信息
	 */
	@ResponseBody
	@RequestMapping("/info/{id}")
	public R info(@PathVariable("id") Long id){
		SysLogEntity syslog = sysLogService.queryObject(id);

		return R.ok().put("syslog",syslog);
	}


	/**
	 * 保存日志
	 */
	@ResponseBody
	@RequestMapping("/save")
	public R save(@RequestBody SysLogEntity log){
		ValidatorUtils.validateEntity(log, AddGroup.class);

		sysLogService.save(log);
		return R.ok();
	}

	/**
	 * 删除日志
	 */
	@SysLog(value = "删除日志",type = "管理操作")
	@ResponseBody
	@RequestMapping("/delete/{id}")
	public R delete(@PathVariable("id") Long id){

		sysLogService.delete(id);

		SysLogEntity sysLog = makeLog("删除日志","管理操作",id,true);
		//保存系统日志
		sysLogService.save(sysLog);

		return R.ok();
	}

	/**
	 * 批量删除删除日志
	 */
	@SysLog(value = "批量删除日志",type = "管理操作")
	@ResponseBody
	@RequestMapping("/deleteBatch/{ids}")
	public R deleteBatch(@PathVariable("ids") Long[] ids){

		sysLogService.deleteBatch(ids);

		SysLogEntity sysLog = makeLog("批量删除日志","管理操作",ids,true);
		//保存系统日志
		sysLogService.save(sysLog);

		return R.ok();
	}


	@SysLog(value = "导出日志管理报表",type = "管理操作")
	@ResponseBody
	@RequestMapping(value = "/export", method = RequestMethod.GET)
	public void export(@RequestParam Map<String, Object> condition, HttpServletResponse response) {

		List<SysLogEntity> sysLogList = sysLogService.queryList(condition);

		//添加数据到集合
		List excelHead = new ArrayList<>();

		excelHead.add("ID");
		excelHead.add("登录名");
		excelHead.add("用户名称");
		excelHead.add("操作类型");
		excelHead.add("操作描述");
		excelHead.add("操作结果");
		excelHead.add("操作IP");
		excelHead.add("时间");

		//添加数据到集合
		List<String> paramItemsName = new ArrayList<>();
		paramItemsName.add("id");
		paramItemsName.add("username");
		paramItemsName.add("chineseName");
		paramItemsName.add("operationtype");
		paramItemsName.add("operation");
		paramItemsName.add("result");
		paramItemsName.add("ip");
		paramItemsName.add("createDate");

		//添加数据到集合
		List<Integer> excelWidth = new ArrayList<>();
		excelWidth.add(2500);
		excelWidth.add(3500);
		excelWidth.add(3500);
		excelWidth.add(3500);
		excelWidth.add(6000);
		excelWidth.add(3500);
		excelWidth.add(4500);
		excelWidth.add(6000);


		//进行导出逻辑
		HSSFWorkbook hssfWorkbook = ExportExcel.export2("日志管理报表" + DateUtils.formatT(new Date()), excelHead, excelWidth, paramItemsName, sysLogList, SysLogEntity.class);
		BufferedOutputStream buff = null;
		ServletOutputStream outSTr = null;

		try {
			response.setContentType("text/plain");
			response.addHeader("Content-Disposition",
					"attachment;filename=" + URLEncoder.encode("日志管理报表" + DateUtils.format(new Date(), "yyyy年MM月dd日 HH时mm分ss秒") + ".xls", "UTF-8"));
			StringBuffer write = new StringBuffer();
			outSTr = response.getOutputStream();// 建立
			buff = new BufferedOutputStream(outSTr);
			buff.write(write.toString().getBytes("UTF-8"));
			if (hssfWorkbook != null) {
				hssfWorkbook.write(buff);
			}
			buff.flush();
			buff.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				buff.close();
				outSTr.close();
				SysLogEntity sysLog = makeLog("导出日志管理报表","管理操作",condition,true);
				//保存系统日志
				sysLogService.save(sysLog);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}



	@SysLog(value = "导出日志分析报表",type = "管理操作")
	@ResponseBody
	@RequestMapping(value = "/exportAnalyze", method = RequestMethod.GET)
	public void exportAnalyze(@RequestParam Map<String, Object> condition, HttpServletResponse response) {

		Query query = new Query(condition);
		//List<SysLogEntity> sysLogList = sysLogService.queryList(condition);
		List<SysLogAnalyzeEntity> sysLogList = sysLogService.analyzeList(query);

		//添加数据到集合
		List excelHead = new ArrayList<>();

		excelHead.add("登录名");
		excelHead.add("用户名称");
		excelHead.add("成功次数");
		excelHead.add("失败次数");

		//添加数据到集合
		List<String> paramItemsName = new ArrayList<>();
		paramItemsName.add("username");
		paramItemsName.add("chineseName");
		paramItemsName.add("success");
		paramItemsName.add("fail");

		//添加数据到集合
		List<Integer> excelWidth = new ArrayList<>();
		excelWidth.add(3500);
		excelWidth.add(3500);
		excelWidth.add(3000);
		excelWidth.add(3000);


		//进行导出逻辑
		HSSFWorkbook hssfWorkbook = ExportExcel.export2("日志分析报表"
				+ DateUtils.formatT(new Date()), excelHead, excelWidth, paramItemsName, sysLogList, SysLogAnalyzeEntity.class);
		BufferedOutputStream buff = null;
		ServletOutputStream outSTr = null;

		try {
			response.setContentType("text/plain");
			response.addHeader("Content-Disposition",
					"attachment;filename=" + URLEncoder.encode("日志分析报表"
							+ DateUtils.format(new Date(), "yyyy年MM月dd日 HH时mm分ss秒") + ".xls", "UTF-8"));
			StringBuffer write = new StringBuffer();
			outSTr = response.getOutputStream();// 建立
			buff = new BufferedOutputStream(outSTr);
			buff.write(write.toString().getBytes("UTF-8"));
			if (hssfWorkbook != null) {
				hssfWorkbook.write(buff);
			}
			buff.flush();
			buff.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				buff.close();
				outSTr.close();
				SysLogEntity sysLog = makeLog("导出日志分析报表","管理操作",condition,true);
				//保存系统日志
				sysLogService.save(sysLog);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
