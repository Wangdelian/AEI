package io.jeasyframework.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import io.jeasyframework.dao.master.UmLevelmarkDao;
import io.jeasyframework.entity.UmLevelmarkEntity;
import io.jeasyframework.service.UmLevelmarkService;



@Service("umLevelmarkService")
public class UmLevelmarkServiceImpl implements UmLevelmarkService {
	@Autowired
	private UmLevelmarkDao umLevelmarkDao;
	
	@Override
	public UmLevelmarkEntity queryObject(Object levelmarkid){
		return umLevelmarkDao.queryObject(levelmarkid);
	}
	
	@Override
	public List<UmLevelmarkEntity> queryList(Map<String, Object> map){
		return umLevelmarkDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return umLevelmarkDao.queryTotal(map);
	}
	
	@Override
	public void save(UmLevelmarkEntity umLevelmark){
		umLevelmarkDao.save(umLevelmark);
	}
	
	@Override
	public void update(UmLevelmarkEntity umLevelmark){
		umLevelmarkDao.update(umLevelmark);
	}
	
	@Override
	public void delete(Object levelmarkid){
		umLevelmarkDao.delete(levelmarkid);
	}
	
	@Override
	public void deleteBatch(Object[] levelmarkids){
		umLevelmarkDao.deleteBatch(levelmarkids);
	}
	
}
