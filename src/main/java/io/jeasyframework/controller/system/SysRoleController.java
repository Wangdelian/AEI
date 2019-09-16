package io.jeasyframework.controller.system;

import com.github.pagehelper.PageHelper;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.SysLogEntity;
import io.jeasyframework.service.SysLogService;
import io.jeasyframework.utils.*;
import io.jeasyframework.utils.annotation.SysLog;
import io.jeasyframework.entity.SysRoleEntity;
import io.jeasyframework.service.SysRoleMenuService;
import io.jeasyframework.service.SysRoleService;
import io.jeasyframework.utils.validator.ValidatorUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.jeasyframework.utils.aop.SysLogAspect.makeLog;

/**
 * ${comments}
 *
 * @author hezhenmei
 * @email hezheenmei@cqrfid.cn
 */
@RestController
@RequestMapping("/sys/role")
public class SysRoleController extends AbstractController {
	@Autowired
	private SysRoleService sysRoleService;
	@Autowired
	private SysRoleMenuService sysRoleMenuService;
	@Autowired
	private SiteConfig siteConfig;
	@Autowired
	private SysLogService sysLogService;

	/**
	 * 初始化角色页面
	 */
	@RequestMapping("/searchlist")
	public ModelAndView searchlist(HttpServletRequest req) {

		String webTitle=siteConfig.getWebTitle();
		ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/SysRol/sysRolList",this.getUserSkin());
		ModelAndView view=mf.CreateModelAndView();
		return view;
	}
	/**
	 * 角色列表
	 */
	@RequestMapping("/list/{pageNum}")
	//@RequiresPermissions("sys:role:list")
	public R list(@RequestParam Map<String, Object> params,@RequestBody Map<String,Object> condition,@PathVariable int pageNum){
		String rolename=(String)condition.get("roleName");
		PageHelper.startPage(pageNum,siteConfig.getPagesize());
		//查询列表数据
		Query query = new Query(params);
		query.put("roleNameKey",rolename);
		List<SysRoleEntity> list = sysRoleService.queryListShow(query);

		int total = sysRoleService.queryTotal(query);

		PageUtils pageUtil = new PageUtils(list, total, query.getLimit(), query.getPage());
		return R.ok().put("page", pageUtil);

	}
	/**
	 * 角色列表
	 */
	@RequestMapping("/select/{roleId}")
	//@RequiresPermissions("sys:role:select")
	public R select(@PathVariable long roleId){
		Map<String, Object> map = new HashMap<>();
		map.put("roleId",roleId);

		//如果不是超级管理员，则只查询自己所拥有的角色列表
		if(getUserId() != Constant.SUPER_ADMIN){
			map.put("createUserId", getUserId());
		}
		List<SysRoleEntity> list = sysRoleService.queryList(map);


		return R.ok().put("list", list);
	}
	/**
	 * 初始化编辑角色信息
	 */
	@RequestMapping("/edit/{roleId}")
	public ModelAndView editsysrole(HttpServletRequest req,@PathVariable("roleId") Long roleId) {

		String webTitle=siteConfig.getWebTitle();
		ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"/template/SysRol/editsysrole",this.getUserSkin());
		ModelAndView view=mf.CreateModelAndView();
		view.addObject("roleId",roleId);
		return view;
	}
	/**
	 * 初始化添加角色信息
	 */
	@RequestMapping("/add")
	public ModelAndView addysrole(HttpServletRequest req) {

		String webTitle=siteConfig.getWebTitle();
		ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"/template/SysRol/addrole",this.getUserSkin());
		ModelAndView view=mf.CreateModelAndView();
		view.addObject("roleId");
		return view;
	}
	/**
	 * 角色信息
	 */
	@RequestMapping("/info/{roleId}")
	//@RequiresPermissions("sys:role:info")
	public R info(@PathVariable("roleId") Long roleId){
		SysRoleEntity role = sysRoleService.queryObject(roleId);

		//查询角色对应的菜单
		List<Long> menuIdList = sysRoleMenuService.queryMenuIdList(roleId);
		role.setMenuIdList(menuIdList);
		
		return R.ok().put("role", role);
	}
	
	/**
	 * 保存角色
	 */
	@SysLog(value = "新增角色",type = "管理操作")
	@RequestMapping("/save")
	//@RequiresPermissions("sys:role:save")
	public R save(@RequestBody SysRoleEntity role){
//		if(sysRoleService.getRolenameCount(role.getRoleName())>0){
//			return R.error("角色名已存在");
//		}
		Date date=new Date();
		role.setCreateTime(date);

		ValidatorUtils.validateEntity(role);
		role.setCreateUserId(getUserId());
		System.out.println("--------------新增角色：父ID"+role.getMenuIdList().toString());
		role.setRoleIcon("1");
		role.setRoleType("1");
		if(role.getRemark()=="" || role.getRemark()==null){
			role.setRemark("");
		}
		Long  a=0L;
		role.setRoleParentId(a);
		sysRoleService.save(role);

		String rolenames =  "新增角色：" + role.getRoleName();

		SysLogEntity sysLog = makeLog("新增角色","管理操作",rolenames,true);
		//保存系统日志
		sysLogService.save(sysLog);

		return R.ok();
	}
	
	/**
	 * 修改角色
	 */
	@SysLog(value = "修改角色",type = "管理操作")
	@RequestMapping("/update")
	//@RequiresPermissions("sys:role:update")
	public R update(@RequestBody SysRoleEntity role){
		ValidatorUtils.validateEntity(role);

		role.setCreateUserId(getUserId());
		role.setRoleIcon("1");
		role.setRoleType("1");
		if(role.getRemark()=="" || role.getRemark()==null){
			role.setRemark("");
		}
		Long  a = 0L;
		role.setRoleParentId(a);

		sysRoleService.update(role);

		String rolenames =  "修改角色：" + role.getRoleName();
		SysLogEntity sysLog = makeLog("修改角色","管理操作",rolenames,true);
		//保存系统日志
		sysLogService.save(sysLog);
		return R.ok();
	}
	
	/**
	 * 删除角色
	 */
	@SysLog(value = "删除角色",type = "管理操作")
	@RequestMapping("/delete")
	//@RequiresPermissions("sys:role:delete")
	public R delete(@RequestBody Long[] roleIds){

		SysRoleEntity temp = sysRoleService.queryObject(roleIds[0]);
		String rolenames =  "删除角色：" + temp.getRoleName();
		for (int j = 1; j < roleIds.length; j++) {
			temp = sysRoleService.queryObject(roleIds[j]);
			rolenames = rolenames +","+ temp.getRoleName();
		}



		sysRoleService.deleteBatch(roleIds);



		SysLogEntity sysLog = makeLog("删除角色","管理操作",rolenames,true);
		//保存系统日志
		sysLogService.save(sysLog);
		
		return R.ok();
	}

	//角色名称判断重复
	@RequestMapping(value = "/queryRoleName", method = RequestMethod.POST)
	public R queryRoleName(@RequestBody Map<String, Object> params) {
		List<SysRoleEntity> list = sysRoleService.queryList(params);


		return R.ok().put("list", list);
	}
}
