package io.jeasyframework.controller.train;

import java.util.*;

import com.github.pagehelper.PageHelper;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.*;
import io.jeasyframework.service.SysLogService;
import io.jeasyframework.utils.ModelAndViewFactory;
import io.jeasyframework.utils.PageUtils;
import io.jeasyframework.utils.Query;
import io.jeasyframework.utils.R;
import io.jeasyframework.utils.annotation.SysLog;
import io.jeasyframework.utils.validator.ValidatorUtils;
import io.jeasyframework.utils.validator.group.AddGroup;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import io.jeasyframework.service.ChReconditionService;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

import static io.jeasyframework.utils.aop.SysLogAspect.makeLog;


/**
 * ${comments}
 *
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2019-03-25 11:35:25
 */
@RestController
@RequestMapping("/train/recondition")
public class ChReconditionController extends AbstractController {
	@Autowired
	private ChReconditionService chReconditionService;
	@Autowired
	private SiteConfig siteConfig;
	@Autowired
	private SysLogService sysLogService;


    @RequestMapping("/searchlist")
    public ModelAndView searchlist(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/Recondition/reconditionList", this.getUserSkin());
        ModelAndView view = mf.CreateModelAndView();
        return view;
    }

	/**
	 * 列表
	 */
	@RequestMapping(value = "/list/{pageNum}", method = RequestMethod.POST)
	public R list(@RequestBody Map<String, Object> params, @PathVariable("pageNum") int pageNum){
		PageHelper.startPage(pageNum, siteConfig.getPagesize());
		//查询列表数据
		Query query = new Query(params);

		List<ChReconditionEntity> chReconditionList = chReconditionService.queryList(query);
		int total = chReconditionService.queryTotal(query);

		PageUtils pageUtil = new PageUtils(chReconditionList, total, query.getLimit(), query.getPage());

		return R.ok().put("page", pageUtil);
	}
	/**
	 * 记录详细信息
	 */
	@RequestMapping("/info/{fid}")
	public R info(@PathVariable("fid") Long fid) {
		ChReconditionEntity recondition = chReconditionService.queryObject(fid);
		return R.ok().put("recondition", recondition);
	}

	/**
	 * 保存
	 */
	@SysLog(value = "添加设备检修履历",type = "业务操作")
	@RequestMapping("/save")
	public R save(@RequestBody ChReconditionEntity chRecondition){
		chRecondition.setFId(System.currentTimeMillis());
		chRecondition.setFReserve1(0);
		chRecondition.setFDevicename("AEI");
		chRecondition.setFReconditiontime(new Date());

		chReconditionService.save(chRecondition);

		SysLogEntity sysLog = makeLog("添加设备检修履历","业务操作",chRecondition,true);
		//保存系统日志
		sysLogService.save(sysLog);

		return R.ok();
	}

	/**
	 * 修改
	 */
	@SysLog(value = "修改设备检修履历",type = "业务操作")
	@RequestMapping("/update")
	public R update(@RequestBody ChReconditionEntity chRecondition){
		chReconditionService.update(chRecondition);

		SysLogEntity sysLog = makeLog("修改设备检修履历","业务操作",chRecondition,true);
		//保存系统日志
		sysLogService.save(sysLog);

		return R.ok();
	}

	/***
	 * 多选删除
	 */
	@SysLog(value = "删除设备检修履历",type = "业务操作")
	@RequestMapping("/delete")
	public R delete(@RequestBody Map<String, Object> map) {
		if (map.isEmpty())
			return R.error("请至少选择一条数据");
		Long[] ids = new Long[map.size()];
		for (int i = 0; i < map.size(); i++) {
			ids[i] = Long.parseLong(map.get(String.valueOf(i)) + "");
		}
		int re = chReconditionService.deleteBatch(ids);
		if (re == 0) {

			SysLogEntity sysLog = makeLog("删除设备检修履历","业务操作",map,false);
			//保存系统日志
			sysLogService.save(sysLog);
			return R.ok().put("re", "删除数据失败，请联系管理员！");
		} else {

			SysLogEntity sysLog = makeLog("删除设备检修履历","业务操作",map,true);
			//保存系统日志
			sysLogService.save(sysLog);
			return R.ok().put("re", "本次共删除了" + re + "条数据！");
		}
	}

	/**
	 * 初始化编辑界面
	 * @param req
	 * @return
	 */
	@RequestMapping("/editRecondition/{fid}")
	public ModelAndView editRecondition(HttpServletRequest req, @PathVariable("fid") Long fid) {
		String webTitle = siteConfig.getWebTitle();
		ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/Recondition/editRecondition", this.getUserSkin());

		ModelAndView view = mf.CreateModelAndView();

		view.addObject("fid", fid);
		return view;
	}

	/**
	 * 初始化新增界面
	 * @param req
	 * @return
	 */
	@RequestMapping("/addRecondition")
	public ModelAndView addRecondition(HttpServletRequest req) {
		ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/Recondition/addRecondition", this.getUserSkin());
		return mf.CreateModelAndView();
	}



}
