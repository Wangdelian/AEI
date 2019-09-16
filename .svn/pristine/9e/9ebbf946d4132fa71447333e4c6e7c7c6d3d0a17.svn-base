package io.jeasyframework.service;

import io.jeasyframework.entity.UmUsermasterEntity;

import java.util.List;
import java.util.Map;

/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-11-07 09:41:06
 */
public interface UmUsermasterService {
	
	UmUsermasterEntity queryObject(String userid);
	
	List<UmUsermasterEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(UmUsermasterEntity umUsermaster);
	
	void update(UmUsermasterEntity umUsermaster);
	
	void delete(String userid);
	
	void deleteBatch(String[] userids);

	/**
	 * 根据用户名，查询系统用户
	 */
	UmUsermasterEntity queryByUserName(String username);




}
