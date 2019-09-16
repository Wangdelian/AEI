package io.jeasyframework.dao.master;

import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.SysMenuEntity;

import java.util.List;
import java.util.Map;

/**
 * 菜单管理
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年9月18日 上午9:33:01
 */
public interface SysMenuDao extends BaseDao<SysMenuEntity> {
	
	/**
	 * 根据父菜单，查询子菜单
	 * @param parentId 父菜单ID
	 */
	List<SysMenuEntity> queryListParentId(Long parentId);
	
	/**
	 * 获取不包含按钮的菜单列表
	 */
	List<SysMenuEntity> queryNotButtonList();

	/**
	 * 根据父菜单，获取不包含按钮的菜单列表
	 * @param parentId 父菜单ID
	 * @return
	 */
	List<SysMenuEntity> queryNotButtonListByParentId(Long parentId);
	
	/**
	 * 查询用户的权限列表
	 */
	List<SysMenuEntity> queryUserList(Long userId);

	/**
	 * 查询用户的权限列表
	 */
	List<SysMenuEntity> queryMenuList(Long userId);

	List<SysMenuEntity> querysecondList(Map<String, Object> map);

}
