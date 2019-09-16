package io.jeasyframework.controller.train;

import java.util.List;
import java.util.Map;

import io.jeasyframework.utils.PageUtils;
import io.jeasyframework.utils.Query;
import io.jeasyframework.utils.R;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.jeasyframework.entity.ChTraincheckdetailEntity;
import io.jeasyframework.service.ChTraincheckdetailService;

/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-10-23 09:34:14
 */
@RestController
@RequestMapping("/generator/chtraincheckdetail")
public class ChTraincheckdetailController {
	@Autowired
	private ChTraincheckdetailService chTraincheckdetailService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<ChTraincheckdetailEntity> chTraincheckdetailList = chTraincheckdetailService.queryList(query);
		int total = chTraincheckdetailService.queryTotal(query);
		
		PageUtils pageUtil = new PageUtils(chTraincheckdetailList, total, query.getLimit(), query.getPage());
		
		return R.ok().put("page", pageUtil);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{fId}")
	@RequiresPermissions("generator:chtraincheckdetail:info")
	public R info(@PathVariable("fId") Long fId){
		ChTraincheckdetailEntity chTraincheckdetail = chTraincheckdetailService.queryObject(fId);
		
		return R.ok().put("chTraincheckdetail", chTraincheckdetail);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("generator:chtraincheckdetail:save")
	public R save(@RequestBody ChTraincheckdetailEntity chTraincheckdetail){
		chTraincheckdetailService.save(chTraincheckdetail);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("generator:chtraincheckdetail:update")
	public R update(@RequestBody ChTraincheckdetailEntity chTraincheckdetail){
		chTraincheckdetailService.update(chTraincheckdetail);
		chTraincheckdetailService.updateResult(chTraincheckdetail);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("generator:chtraincheckdetail:delete")
	public R delete(@RequestBody Long[] fIds){
		chTraincheckdetailService.deleteBatch(fIds);
		
		return R.ok();
	}
	
}
