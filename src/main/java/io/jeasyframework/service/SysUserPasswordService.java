package io.jeasyframework.service;

import io.jeasyframework.entity.SysUserPasswordEntity;

import java.util.List;
import java.util.Map;

/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2019-07-10 09:08:52
 */
public interface SysUserPasswordService {
	
	SysUserPasswordEntity queryObject(Object id);
	
	List<SysUserPasswordEntity> queryList(Map<String, Object> map);


	List<SysUserPasswordEntity> queryByUser(Long userId);
	
	int queryTotal(Map<String, Object> map);
	
	void save(SysUserPasswordEntity sysUserPassword);
	
	void update(SysUserPasswordEntity sysUserPassword);
	
	void delete(Object id);
	
	void deleteBatch(Object[] ids);
}
