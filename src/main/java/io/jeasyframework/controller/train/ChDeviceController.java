package io.jeasyframework.controller.train;

import java.util.List;
import java.util.Map;

import io.jeasyframework.entity.SysLogEntity;
import io.jeasyframework.service.SysLogService;
import io.jeasyframework.utils.PageUtils;
import io.jeasyframework.utils.Query;
import io.jeasyframework.utils.R;
import io.jeasyframework.utils.annotation.SysLog;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.jeasyframework.entity.ChDeviceEntity;
import io.jeasyframework.service.ChDeviceService;

import static io.jeasyframework.utils.aop.SysLogAspect.makeLog;


/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-11-05 11:38:46
 */
@RestController
@RequestMapping("/generator/chdevice")
public class ChDeviceController {
	@Autowired
	private ChDeviceService chDeviceService;
	@Autowired
	private SysLogService sysLogService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<ChDeviceEntity> chDeviceList = chDeviceService.queryList(query);
		int total = chDeviceService.queryTotal(query);
		
		PageUtils pageUtil = new PageUtils(chDeviceList, total, query.getLimit(), query.getPage());
		
		return R.ok().put("page", pageUtil);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{fId}")
	@RequiresPermissions("generator:chdevice:info")
	public R info(@PathVariable("fId") Long fId){
		ChDeviceEntity chDevice = chDeviceService.queryObject(fId);
		
		return R.ok().put("chDevice", chDevice);
	}
	
	/**
	 * 保存
	 */
	@SysLog(value = "保存设备信息",type = "业务操作")
	@RequestMapping("/save")
	@RequiresPermissions("generator:chdevice:save")
	public R save(@RequestBody ChDeviceEntity chDevice){
		chDeviceService.save(chDevice);

		SysLogEntity sysLog = makeLog("保存设备信息","业务操作",chDevice,true);
		//保存系统日志
		sysLogService.save(sysLog);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@SysLog(value = "修改设备信息",type = "业务操作")
	@RequestMapping("/update")
	@RequiresPermissions("generator:chdevice:update")
	public R update(@RequestBody ChDeviceEntity chDevice){
		chDeviceService.update(chDevice);

		SysLogEntity sysLog = makeLog("修改设备信息","业务操作",chDevice,true);
		//保存系统日志
		sysLogService.save(sysLog);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@SysLog(value = "删除设备信息",type = "业务操作")
	@RequestMapping("/delete")
	@RequiresPermissions("generator:chdevice:delete")
	public R delete(@RequestBody Long[] fIds){
		chDeviceService.deleteBatch(fIds);

		SysLogEntity sysLog = makeLog("删除设备信息","业务操作",fIds,true);
		//保存系统日志
		sysLogService.save(sysLog);
		
		return R.ok();
	}
	
}
