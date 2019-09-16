package io.jeasyframework.service;

import io.jeasyframework.entity.ChDictionaryCaroutEntity;
import io.jeasyframework.utils.Query;

import java.util.List;
import java.util.Map;

/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2019-05-15 09:09:41
 */
public interface ChDictionaryCaroutService {
	
	ChDictionaryCaroutEntity queryObject(Long fId);
	
	List<ChDictionaryCaroutEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(ChDictionaryCaroutEntity chDictionaryCarout);
	
	void update(ChDictionaryCaroutEntity chDictionaryCarout);
	
	void delete(Long fId);
	
	void deleteBatch(Long[] fIds);

	List<ChDictionaryCaroutEntity> queryHistoryList(Map<String, Object> map);

	int queryHistoryTotal(Map<String, Object> map);
}
