package io.jeasyframework.service;

import io.jeasyframework.entity.UmLevelmarkEntity;

import java.util.List;
import java.util.Map;

/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-11-05 11:39:48
 */
public interface UmLevelmarkService {
	
	UmLevelmarkEntity queryObject(Object levelmarkid);
	
	List<UmLevelmarkEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(UmLevelmarkEntity umLevelmark);
	
	void update(UmLevelmarkEntity umLevelmark);
	
	void delete(Object levelmarkid);
	
	void deleteBatch(Object[] levelmarkids);
}
