package io.jeasyframework.service;

import io.jeasyframework.entity.ChDeviceEntity;
import io.jeasyframework.entity.ChJsondataEntity;
import io.jeasyframework.entity.ChTraincheckinfoEntity;
import io.jeasyframework.entity.LevelMarkEntity;

import java.util.List;
import java.util.Map;

/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-11-05 11:38:46
 */
public interface ChDeviceService {
	
	ChDeviceEntity queryObject(Long fId);
	
	List<ChDeviceEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(ChDeviceEntity chDevice);
	
	void update(ChDeviceEntity chDevice);
	
	void delete(Long fId);
	
	void deleteBatch(Long[] fIds);

	List<ChJsondataEntity> queryjsondata(Map<String, Object> map);

	List<ChJsondataEntity> queryjson(Map<String, Object> map);

	List<LevelMarkEntity> queryByLevelmarkid(Map<String, Object> map);

	List<ChDeviceEntity> queryByDeviceid(ChDeviceEntity chDevice);

}
