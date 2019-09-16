package io.jeasyframework.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import io.jeasyframework.dao.master.UmUsermasterDao;
import io.jeasyframework.entity.UmUsermasterEntity;
import io.jeasyframework.service.UmUsermasterService;



@Service("umUsermasterService")
public class UmUsermasterServiceImpl implements UmUsermasterService {
	@Autowired
	private UmUsermasterDao umUsermasterDao;
	
	@Override
	public UmUsermasterEntity queryObject(String userid){
		return umUsermasterDao.queryObject(userid);
	}
	
	@Override
	public List<UmUsermasterEntity> queryList(Map<String, Object> map){
		return umUsermasterDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return umUsermasterDao.queryTotal(map);
	}
	
	@Override
	public void save(UmUsermasterEntity umUsermaster){
		umUsermasterDao.save(umUsermaster);
	}
	
	@Override
	public void update(UmUsermasterEntity umUsermaster){
		umUsermasterDao.update(umUsermaster);
	}
	
	@Override
	public void delete(String userid){
		umUsermasterDao.delete(userid);
	}
	
	@Override
	public void deleteBatch(String[] userids){
		umUsermasterDao.deleteBatch(userids);
	}

	@Override
	public UmUsermasterEntity queryByUserName(String username) {
		return umUsermasterDao.queryByUserName(username);
	}

}
