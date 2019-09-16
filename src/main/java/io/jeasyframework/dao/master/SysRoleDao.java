package io.jeasyframework.dao.master;

import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.SysRoleEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 角色管理
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年9月18日 上午9:33:33
 */

@Repository
public interface SysRoleDao extends BaseDao<SysRoleEntity> {
	
	/**
	 * 查询用户创建的角色ID列表
	 */
	List<Long> queryRoleIdList(Long createUserId);

	/**
	 *
	 * 查询所有角色
	 */
	List<SysRoleEntity> queryListShow(Map<String, Object> map);

	List<SysRoleEntity> queryRoleNameList(Long userid);

}
