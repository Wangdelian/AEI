package io.jeasyframework.service.impl;

import io.jeasyframework.entity.ChJsondataEntity;
import io.jeasyframework.entity.LevelMarkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import io.jeasyframework.dao.master.ChDeviceDao;
import io.jeasyframework.entity.ChDeviceEntity;
import io.jeasyframework.service.ChDeviceService;



@Service("chDeviceService")
public class ChDeviceServiceImpl implements ChDeviceService {
	@Autowired
	private ChDeviceDao chDeviceDao;
	
	@Override
	public ChDeviceEntity queryObject(Long fId){
		return chDeviceDao.queryObject(fId);
	}
	
	@Override
	public List<ChDeviceEntity> queryList(Map<String, Object> map){
		return chDeviceDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return chDeviceDao.queryTotal(map);
	}
	
	@Override
	public void save(ChDeviceEntity chDevice){
		chDeviceDao.save(chDevice);
	}
	
	@Override
	public void update(ChDeviceEntity chDevice){
		chDeviceDao.update(chDevice);
	}
	
	@Override
	public void delete(Long fId){
		chDeviceDao.delete(fId);
	}
	
	@Override
	public void deleteBatch(Long[] fIds){
		chDeviceDao.deleteBatch(fIds);
	}

	@Override
	public List<ChJsondataEntity> queryjsondata(Map<String, Object> map) {
		return chDeviceDao.queryjsondata(map);
	}

	@Override
	public List<ChJsondataEntity> queryjson(Map<String, Object> map) {
		return chDeviceDao.queryjson(map);
	}

	@Override
	public List<LevelMarkEntity> queryByLevelmarkid(Map<String, Object> map) {
		return chDeviceDao.queryByLevelmarkid(map);
	}

	@Override
	public List<ChDeviceEntity> queryByDeviceid(ChDeviceEntity chDevice) {
		return chDeviceDao.queryByDeviceid(chDevice);
	}

}
