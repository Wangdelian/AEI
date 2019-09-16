package io.jeasyframework.service;

import io.jeasyframework.entity.ChReconditionEntity;

import java.util.List;
import java.util.Map;

/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2019-03-25 11:35:25
 */
public interface ChReconditionService {
	
	ChReconditionEntity queryObject(Long fId);
	
	List<ChReconditionEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(ChReconditionEntity chRecondition);
	
	void update(ChReconditionEntity chRecondition);
	
	void delete(Long fId);
	
	int deleteBatch(Long[] fIds);
}
