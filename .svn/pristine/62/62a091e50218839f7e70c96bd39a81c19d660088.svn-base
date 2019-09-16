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

import io.jeasyframework.entity.UmLevelmarkEntity;
import io.jeasyframework.service.UmLevelmarkService;





/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-11-05 11:39:48
 */
@RestController
@RequestMapping("/generator/umlevelmark")
public class UmLevelmarkController {
	@Autowired
	private UmLevelmarkService umLevelmarkService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	@RequiresPermissions("generator:umlevelmark:list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<UmLevelmarkEntity> umLevelmarkList = umLevelmarkService.queryList(query);
		int total = umLevelmarkService.queryTotal(query);
		
		PageUtils pageUtil = new PageUtils(umLevelmarkList, total, query.getLimit(), query.getPage());
		
		return R.ok().put("page", pageUtil);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{levelmarkid}")
	@RequiresPermissions("generator:umlevelmark:info")
	public R info(@PathVariable("levelmarkid") Object levelmarkid){
		UmLevelmarkEntity umLevelmark = umLevelmarkService.queryObject(levelmarkid);
		
		return R.ok().put("umLevelmark", umLevelmark);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("generator:umlevelmark:save")
	public R save(@RequestBody UmLevelmarkEntity umLevelmark){
		umLevelmarkService.save(umLevelmark);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("generator:umlevelmark:update")
	public R update(@RequestBody UmLevelmarkEntity umLevelmark){
		umLevelmarkService.update(umLevelmark);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("generator:umlevelmark:delete")
	public R delete(@RequestBody Object[] levelmarkids){
		umLevelmarkService.deleteBatch(levelmarkids);
		
		return R.ok();
	}
	
}
