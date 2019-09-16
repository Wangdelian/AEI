package io.jeasyframework.service.impl;

import io.jeasyframework.entity.MqsStationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import io.jeasyframework.dao.master.MqsStationDao;
import io.jeasyframework.service.MqsStationService;
import org.springframework.transaction.annotation.Transactional;


@Service("mqsStationService")
public class MqsStationServiceImpl implements MqsStationService {
	@Autowired
	private MqsStationDao mqsStationDao;
	
	@Override
	public MqsStationEntity queryObject(Long stationid){
		return mqsStationDao.queryObject(stationid);
	}
	
	@Override
	public List<MqsStationEntity> queryList(Map<String, Object> map){
		return mqsStationDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return mqsStationDao.queryTotal(map);
	}
	
	@Override
	@Transactional
	public void save(MqsStationEntity mqsStation){
		mqsStationDao.save(mqsStation);
	}
	
	@Override
	@Transactional
	public void update(MqsStationEntity mqsStation){
		mqsStationDao.update(mqsStation);
	}
	
	@Override
	public void delete(Long stationid){
		mqsStationDao.delete(stationid);
	}
	
	@Override
	@Transactional
	public void deleteBatch(Long[] stationids){
		mqsStationDao.deleteBatch(stationids);
	}

	@Override
	public List<MqsStationEntity> queryPstationlist(){
		return mqsStationDao.queryPstationlist();
	}

	@Override
	public List<MqsStationEntity> queryBystationids(Map<String, Object> map){
		return mqsStationDao.queryBystationids(map);
	}


	
}
