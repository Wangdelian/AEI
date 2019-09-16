package io.jeasyframework.service;

import io.jeasyframework.entity.ChTraincheckdetailEntity;

import java.util.List;
import java.util.Map;

/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-10-23 09:34:14
 */
public interface ChTraincheckdetailService {
	
	ChTraincheckdetailEntity queryObject(Long fId);
	
	List<ChTraincheckdetailEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(ChTraincheckdetailEntity chTraincheckdetail);
	
	void update(ChTraincheckdetailEntity chTraincheckdetail);
	void updateResult(ChTraincheckdetailEntity chTraincheckdetail);
	
	void delete(Long fId);
	
	void deleteBatch(Long[] fIds);

	List<ChTraincheckdetailEntity> queryAllInfo(ChTraincheckdetailEntity chTraincheckdetail);

}
