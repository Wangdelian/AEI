package io.jeasyframework.service.impl;

import io.jeasyframework.dao.master.SysMenuDao;
import io.jeasyframework.entity.LayUINavChildren;
import io.jeasyframework.entity.LayUINavEntity;
import io.jeasyframework.entity.SysMenuEntity;
import io.jeasyframework.service.SysMenuService;
import io.jeasyframework.service.SysRoleMenuService;
import io.jeasyframework.service.SysUserService;
import io.jeasyframework.utils.Constant.MenuType;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Service("sysMenuService")
public class SysMenuServiceImpl implements SysMenuService {
	private Logger logger = LoggerFactory.getLogger(getClass());
	@Autowired
	private SysMenuDao sysMenuDao;
	@Autowired
	private SysUserService sysUserService;
	@Autowired
	private SysRoleMenuService sysRoleMenuService;
	
	@Override
	public List<SysMenuEntity> queryListParentId(Long parentId, List<Long> menuIdList) {
		List<SysMenuEntity> menuList = sysMenuDao.queryListParentId(parentId);
		if(menuIdList == null){
			return menuList;
		}
		
		List<SysMenuEntity> userMenuList = new ArrayList<>();
		for(SysMenuEntity menu : menuList){
			if(menuIdList.contains(menu.getMenuId())){
				userMenuList.add(menu);
			}
		}
		return userMenuList;
	}

	@Override
	public List<SysMenuEntity> queryNotButtonList() {
		return sysMenuDao.queryNotButtonList();
	}

	@Override
	public List<SysMenuEntity> queryNotButtonListByParentId(Long parentId) {
		return sysMenuDao.queryNotButtonListByParentId(parentId);
	}

	@Override
	public List<SysMenuEntity> getUserMenuList(Long userId) {
		//系统管理员，拥有最高权限
		if(userId == 1){
			return getAllMenuList(null);
		}
		
		//用户菜单列表
		List<Long> menuIdList = sysUserService.queryAllMenuId(userId);
		return getAllMenuList(menuIdList);
	}

	@Override
	public List<SysMenuEntity> getUserMenuzTreeList(Long userId)
	{
		//获取菜单权限列表
		List<SysMenuEntity> meanulist=queryList(null);
		//用户菜单列表
		List<Long> menuIdList = sysUserService.queryAllMenuId(userId);
		for(SysMenuEntity entity : meanulist){
			entity.setOpen(true);
			if(menuIdList.contains(entity.getMenuId()))
			{
				entity.setchecked(true);
			}
			else
			{
				entity.setchecked(false);
			}
		}

		return meanulist;
	}

	@Override
	public Set<String> getUserPermissions(long userId) {
		List<String> permsList;

		//系统管理员，拥有最高权限
		if(userId == 1){
			List<SysMenuEntity> menuList = queryList(new HashMap<String,Object>());
			permsList = new ArrayList<>(menuList.size());
			for(SysMenuEntity menu : menuList){
				permsList.add(menu.getPerms());
			}
		}else{
			permsList = sysUserService.queryAllPerms(userId);
		}

		//用户权限列表
		Set<String> permsSet = new HashSet<String>();
		for(String perms : permsList){
			if(StringUtils.isBlank(perms)){
				continue;
			}
			permsSet.addAll(Arrays.asList(perms.trim().split(",")));
		}
		return permsSet;
	}
	
	@Override
	public SysMenuEntity queryObject(Long menuId) {
		return sysMenuDao.queryObject(menuId);
	}

	@Override
	public List<SysMenuEntity> queryList(Map<String, Object> map) {
		return sysMenuDao.queryList(map);
	}

	@Override
	public List<SysMenuEntity> querysecondList(Map<String, Object> map) {
		return sysMenuDao.querysecondList(map);
	}

	@Override
	public int queryTotal(Map<String, Object> map) {
		return sysMenuDao.queryTotal(map);
	}

	@Override
	public void save(SysMenuEntity menu) {
		sysMenuDao.save(menu);
	}

	@Override
	public void update(SysMenuEntity menu) {
		sysMenuDao.update(menu);
	}

	@Override
	@Transactional
	public void deleteBatch(Long[] menuIds) {
		sysMenuDao.deleteBatch(menuIds);
	}
	
	@Override
	public List<SysMenuEntity> queryUserList(Long userId) {
		return sysMenuDao.queryUserList(userId);
	}

	/**
	 * 获取所有菜单列表
	 */
	private List<SysMenuEntity> getAllMenuList(List<Long> menuIdList){
		//查询根菜单列表
		List<SysMenuEntity> menuList = queryListParentId(0L, menuIdList);
		//递归获取子菜单
		getMenuTreeList(menuList, menuIdList);
		
		return menuList;
	}

	/**
	 * 递归
	 */
	private List<SysMenuEntity> getMenuTreeList(List<SysMenuEntity> menuList, List<Long> menuIdList){
		List<SysMenuEntity> subMenuList = new ArrayList<SysMenuEntity>();
		
		for(SysMenuEntity entity : menuList){
			if(entity.getType() == MenuType.CATALOG.getValue()){//目录
				entity.setList(getMenuTreeList(queryListParentId(entity.getMenuId(), menuIdList), menuIdList));
			}
			subMenuList.add(entity);
		}
		
		return subMenuList;
	}

	/**
	 * 生成LayUINav对象
	 * @param userMenuList 用户权限目录列表
	 * @return
	 */
	@Override
	public List<LayUINavEntity> toLayUINav(List<SysMenuEntity> userMenuList)
	{
		List<LayUINavEntity> userLayUINav=new ArrayList<LayUINavEntity>();
		for (SysMenuEntity entity : userMenuList)
		{
			LayUINavEntity layUINav=new LayUINavEntity();
			layUINav.setTitle(entity.getName());
			layUINav.setIco(entity.getIcon());
			layUINav.setSpread("falase");
			List<LayUINavChildren> childrens=new ArrayList<LayUINavChildren>();
			for (SysMenuEntity temp : (List<SysMenuEntity> )entity.getList())
			{
				LayUINavChildren children=new LayUINavChildren();
				children.setTitle(temp.getName());
				children.setIco(temp.getIcon());
				children.setHref(temp.getUrl());
				children.setIsSelected("false");
				childrens.add(children);
			}
			if (childrens.size()>0)
			{
				layUINav.setChildren(childrens);
			}
			userLayUINav.add(layUINav);
		}

		return userLayUINav;
	}

	@Override
	public List<SysMenuEntity> queryMenuList(Long userId) {
		return sysMenuDao.queryMenuList(userId);
	}









}
