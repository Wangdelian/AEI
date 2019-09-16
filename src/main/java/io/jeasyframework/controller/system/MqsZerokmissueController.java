/*
package io.jeasyframework.controller.system;

import java.io.BufferedOutputStream;

import java.io.IOException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;

import com.github.pagehelper.PageHelper;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.*;
import io.jeasyframework.service.*;
import io.jeasyframework.utils.*;
import io.jeasyframework.utils.annotation.SysLog;
import org.apache.commons.io.IOUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.*;


*
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-01-03 14:15:35


@RestController
@RequestMapping("/mqs/mqszerokmissue")
public class MqsZerokmissueController extends AbstractController {
	@Autowired
	private MqsZerokmissueService mqsZerokmissueService;
	@Autowired
	private SiteConfig siteConfig;
	@Autowired
	private MqsDictlibService mqsDictlibService;
	@Autowired
	private MqsProductdeptService mqsProductdeptService;
	@Autowired
	private MqsProductlineService mqsProductlineService;
	@Autowired
	private MqsStationService mqsStationService;
	@Autowired
	private IqIccService iqIccService;
	@Autowired
	private MqsEnginetypeEnginemodelService mqsEnginetypeEnginemodelService;

**
	 * @method searchlist
	 * @description 初始化数据源中MQS_QCM 数据表清单
	 * @return org.springframework.web.servlet.ModelAndView


	@RequestMapping("/searchlist")
	public ModelAndView searchlist(HttpServletRequest req) {
		String webTitle = siteConfig.getWebTitle();
		ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/MqsZeroKmIssue/zerokmissuelist", this.getUserSkin());
		ModelAndView view = mf.CreateModelAndView();
		return view;
	}
*
	 * 列表


	@RequestMapping(value="/list/{pageNum}",method= RequestMethod.POST)
	public R list(@RequestBody Map<String, Object> condition,@PathVariable int pageNum){
		PageHelper.startPage(pageNum,siteConfig.getPagesize());
		//查询列表数据
        Query query = new Query(condition);
		List<MqsZerokmissueEntity> mqsZerokmissueList = mqsZerokmissueService.queryList(query);

		int total = mqsZerokmissueService.queryTotal(query);
		PageUtils pageUtil = new PageUtils(mqsZerokmissueList, total, query.getLimit(), query.getPage());
		return R.ok().put("page", pageUtil);
	}


**
	 * @method addzerokmissue
	 * @description 添加前返回视图
	 * @return org.springframework.web.servlet.ModelAndView


	//@SysLog("增加界面")
	@RequestMapping("/addzerokmissue")
	public ModelAndView addzerokmissue(HttpServletRequest req) {
		String webTitle = siteConfig.getWebTitle();
		ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/MqsZeroKmIssue/addzerokmissue", this.getUserSkin());
		ModelAndView view = mf.CreateModelAndView();
		view.addObject("username",getUser().getUsername());
		return view;
	}




	@ResponseBody
	@RequestMapping(value = "/addOptions",method = RequestMethod.POST)
	public Map<String ,Object> addOptions(){
责任班组

		List<MqsDictlibEntity> dutyteamlist = mqsDictlibService.queryDictlibList(12);

系列

		List<MqsDictlibEntity> enginemodellist = mqsDictlibService.queryDictlibList(1);
		//List<MqsDictlibEntity> enginemodellist =mqsEnginetypeEnginemodelService.queryEnginemodel();
问题属性

		List<MqsDictlibEntity> issueattrlist = mqsDictlibService.queryDictlibList(6);
责任单位

		List<MqsDictlibEntity> dutydeptlist = mqsDictlibService.queryDictlibList(7);
问题状态

		List<MqsDictlibEntity> zkissuestatuslist = mqsDictlibService.queryDictlibList(8);
维修方法

		List<MqsDictlibEntity> repaircontentlist = mqsDictlibService.queryDictlibList(14);
采集点

		List<MqsStationEntity> pstationlist = mqsStationService.queryPstationlist();
问题严重度

		List<MqsDictlibEntity> issueseveritylist = mqsDictlibService.queryDictlibList(5);
发生基地

		List<MqsDictlibEntity> productionbaselist = mqsDictlibService.queryDictlibList(4);
机型

		List<MqsDictlibEntity> enginetypelist = mqsDictlibService.queryDictlibList(11);
完成状态

		List<MqsDictlibEntity> finishedstatuslist = mqsDictlibService.queryDictlibList(21);
		Map<String ,Object> map=new HashMap<String ,Object>();
		map.put("dutyteamlist",dutyteamlist);

		map.put("enginemodellist",enginemodellist);
		map.put("issueattrlist",issueattrlist);
		map.put("dutydeptlist",dutydeptlist);
		map.put("zkissuestatuslist",zkissuestatuslist);
		map.put("repaircontentlist",repaircontentlist);
		map.put("pstationlist",pstationlist);
		map.put("issueseveritylist",issueseveritylist);
		map.put("productionbaselist",productionbaselist);
		map.put("enginetypelist",enginetypelist);
		map.put("finishedstatuslist",finishedstatuslist);
		return map;
	}

	@ResponseBody
	@RequestMapping(value="/addIccOption/{keyword}",method= RequestMethod.POST)
	public List<?> addIccOption( Map<String, Object> condition , @PathVariable("keyword") String keyword){
		PageHelper.startPage(1,50);
		//查询列表数据
		System.out.println(keyword);
		condition.put("keyword",keyword);
		Query query = new Query(condition);
		List<IqIccEntity> iqIccList = iqIccService.queryList(query);
		int total = iqIccService.queryTotal(query);
		PageUtils pageUtil = new PageUtils(iqIccList, total, query.getLimit(), query.getPage());
		return pageUtil.getList();
	}

	@RequestMapping("/editzerokmissue/{zerokmissueid}")
	public ModelAndView editzerokmissue(HttpServletRequest req,@PathVariable("zerokmissueid") Long zerokmissueid){
		String webTitle=siteConfig.getWebTitle();
		MqsZerokmissueEntity mqsZerokmissue = mqsZerokmissueService.queryObject(zerokmissueid);
		ModelAndViewFactory mf=new ModelAndViewFactory(req, siteConfig, "template/MqsZeroKmIssue/editzerokmissue",this.getUserSkin());
		ModelAndView view=mf.CreateModelAndView();
		view.addObject("mqsZerokmissue", mqsZerokmissue);
		view.addObject("username",getUser().getUsername());
		return view;
	}

*
	 * 信息


	@RequestMapping("/info/{zerokmissueid}")
	public R info(@PathVariable("zerokmissueid") Long zerokmissueid){
		MqsZerokmissueEntity mqsZerokmissue = mqsZerokmissueService.queryObject(zerokmissueid);
		return R.ok().put("mqsZerokmissue", mqsZerokmissue);
	}
	
*
	 * 保存


	@SysLog("保存零公里")
	@RequestMapping("/save")
	public R save(@RequestBody MqsZerokmissueEntity mqsZerokmissue){
		mqsZerokmissue.setCreatedbyname(getUser().getUsername());
		mqsZerokmissue.setCreatedbyid(getUserId().toString());
		mqsZerokmissueService.save(mqsZerokmissue);
		return R.ok();
	}
	
*
	 * 修改


	@SysLog("编辑零公里")
	@RequestMapping("/update")
	public R update(@RequestBody MqsZerokmissueEntity mqsZerokmissue){
		mqsZerokmissue.setModifiedbyname(getUser().getUsername());
		mqsZerokmissue.setModifiedbyid(getUserId().toString());
		mqsZerokmissueService.update(mqsZerokmissue);
		
		return R.ok();
	}
	
*
	 * 删除


	@SysLog("删除零公里")
	@RequestMapping("/delete")
	public R delete(@RequestBody Long[] zerokmissueids){
		mqsZerokmissueService.deleteBatch(zerokmissueids);
		return R.ok();
	}

*
	 * 导出表格


	@SysLog("导出零公里问题管理报表")
	@RequestMapping(value="/createtable",method= RequestMethod.GET)
	public void createtable(@RequestParam Map<String , Object > condition , HttpServletResponse response) throws IOException {
		Query query = new Query(condition);
		List<MqsZerokmissueEntity> mqsZerokmissueList = mqsZerokmissueService.queryList(query);

		List<Integer> excelWidth = new ArrayList<>();
		excelWidth.add(3500);
		excelWidth.add(3500);
		excelWidth.add(2500);
		excelWidth.add(2500);
		excelWidth.add(2500);
		excelWidth.add(3000);
		excelWidth.add(3500);
		excelWidth.add(5000);
		excelWidth.add(3000);
		excelWidth.add(4000);
		excelWidth.add(6000);
		excelWidth.add(7000);
		excelWidth.add(4500);
		excelWidth.add(4000);
		excelWidth.add(4000);
		excelWidth.add(2000);
		excelWidth.add(2000);
		excelWidth.add(2500);
		excelWidth.add(3500);
		excelWidth.add(5500);
		excelWidth.add(2000);
		excelWidth.add(2500);
		excelWidth.add(4000);
		excelWidth.add(3500);
		excelWidth.add(4000);
		excelWidth.add(3500);
		excelWidth.add(2500);
		excelWidth.add(4000);
		excelWidth.add(4000);
		excelWidth.add(3500);
		excelWidth.add(2500);
		excelWidth.add(4000);

		List<String> excelHead = new ArrayList<>();
		excelHead.add("发生基地");
		excelHead.add("发生日期");
		excelHead.add("周");
		excelHead.add("生产单位");
		excelHead.add("生产线");
		excelHead.add("系列");
		excelHead.add("机型");
		excelHead.add("机号");
		excelHead.add("VRT");
		excelHead.add("VFG");
		excelHead.add("CCC");
		excelHead.add("ICC");
		excelHead.add("部位");
		excelHead.add("模式");
		excelHead.add("问题描述");
		excelHead.add("问题严重度");
		excelHead.add("维修方法");
		excelHead.add("责任单位");
		excelHead.add("问题属性");
		excelHead.add("采集点");
		excelHead.add("记录人");
		excelHead.add("是否计入指标");
		excelHead.add("ERA措施");
		excelHead.add("ERA执行时间");
		excelHead.add("ICA措施");
		excelHead.add("ICA执行时间");
		excelHead.add("完成状态");
		excelHead.add("原因分析");
		excelHead.add("PCA措施");
		excelHead.add("PCA执行时间");
		excelHead.add("问题状态");
		excelHead.add("备注");

		List<String> paramItemsName=new ArrayList<>();
		paramItemsName.add("productionbase");
		paramItemsName.add("dateoccur");
		paramItemsName.add("zkweek");
		paramItemsName.add("productiondeptname");
		paramItemsName.add("productionlinename");
		paramItemsName.add("enginemodel");
		paramItemsName.add("enginetype");
		paramItemsName.add("engineno");
		paramItemsName.add("vrt");
		paramItemsName.add("vfg");
		paramItemsName.add("ccc");
		paramItemsName.add("icc");
		paramItemsName.add("itempart");
		paramItemsName.add("failuremodel");
		paramItemsName.add("issuedesc");
		paramItemsName.add("issueseverity");
		paramItemsName.add("repaircontent");
		paramItemsName.add("dutydept");
		paramItemsName.add("issueattr");
		paramItemsName.add("pstation");
		paramItemsName.add("createdbyname");
		paramItemsName.add("iswritetarget");
		paramItemsName.add("erameasures");
		paramItemsName.add("dateeraexecuted");
		paramItemsName.add("icameatures");
		paramItemsName.add("dateicaexecuted");
		paramItemsName.add("finishedstatus");
		paramItemsName.add("reasonanalysis");
		paramItemsName.add("pcameasures");
		paramItemsName.add("datepcaexecuted");
		paramItemsName.add("zkissuestatus");
		paramItemsName.add("remark");


		HSSFWorkbook hssfWorkbook = ExportExcel.export("零公里问题管理报表"+DateUtils.formatT(new Date())+"", excelHead, excelWidth, paramItemsName,mqsZerokmissueList, MqsZerokmissueEntity.class);
		BufferedOutputStream buff = null;
		ServletOutputStream outSTr = null;

		try {
			response.setContentType("text/plain");
			response.addHeader("Content-Disposition",
					"attachment;filename=" + URLEncoder.encode("零公里问题管理报表"+DateUtils.format(new Date(),"yyyy年MM月dd日 HH时mm分ss秒")+"-.xls", "UTF-8"));
			StringBuffer write = new StringBuffer();
			outSTr = response.getOutputStream();// 建立
			buff = new BufferedOutputStream(outSTr);
			buff.write(write.toString().getBytes("UTF-8"));
			if(hssfWorkbook!=null){
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
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}


}


*/
