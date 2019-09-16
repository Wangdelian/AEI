package io.jeasyframework.service;

import io.jeasyframework.entity.MqsStationEntity;

import java.util.List;
import java.util.Map;

/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-01-05 09:33:21
 */
public interface MqsStationService {
	
	MqsStationEntity queryObject(Long stationid);
	
	List<MqsStationEntity> queryList(Map<String, Object> map);

	int queryTotal(Map<String, Object> map);
	
	void save(MqsStationEntity mqsStation);
	
	void update(MqsStationEntity mqsStation);
	
	void delete(Long stationid);
	
	void deleteBatch(Long[] stationids);

	List<MqsStationEntity> queryPstationlist();

	List<MqsStationEntity> queryBystationids(Map<String, Object> map);



}
