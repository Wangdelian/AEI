package io.jeasyframework.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import io.jeasyframework.dao.master.ChDictionaryCaroutDao;
import io.jeasyframework.entity.ChDictionaryCaroutEntity;
import io.jeasyframework.service.ChDictionaryCaroutService;



@Service("chDictionaryCaroutService")
public class ChDictionaryCaroutServiceImpl implements ChDictionaryCaroutService {
	@Autowired
	private ChDictionaryCaroutDao chDictionaryCaroutDao;
	
	@Override
	public ChDictionaryCaroutEntity queryObject(Long fId){
		return chDictionaryCaroutDao.queryObject(fId);
	}
	
	@Override
	public List<ChDictionaryCaroutEntity> queryList(Map<String, Object> map){
		return chDictionaryCaroutDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return chDictionaryCaroutDao.queryTotal(map);
	}
	
	@Override
	public void save(ChDictionaryCaroutEntity chDictionaryCarout){
		chDictionaryCaroutDao.save(chDictionaryCarout);
	}
	
	@Override
	public void update(ChDictionaryCaroutEntity chDictionaryCarout){
		chDictionaryCaroutDao.update(chDictionaryCarout);
	}
	
	@Override
	public void delete(Long fId){
		chDictionaryCaroutDao.delete(fId);
	}
	
	@Override
	public void deleteBatch(Long[] fIds){
		chDictionaryCaroutDao.deleteBatch(fIds);
	}

	@Override
	public List<ChDictionaryCaroutEntity> queryHistoryList(Map<String, Object> map) {
		return chDictionaryCaroutDao.queryHistoryList(map);
	}

	@Override
	public int queryHistoryTotal(Map<String, Object> map) {
		return chDictionaryCaroutDao.queryHistoryTotal(map);
	}

}
