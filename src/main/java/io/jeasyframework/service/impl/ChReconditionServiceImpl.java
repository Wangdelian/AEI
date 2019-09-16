package io.jeasyframework.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import io.jeasyframework.dao.master.ChReconditionDao;
import io.jeasyframework.entity.ChReconditionEntity;
import io.jeasyframework.service.ChReconditionService;



@Service("chReconditionService")
public class ChReconditionServiceImpl implements ChReconditionService {
	@Autowired
	private ChReconditionDao chReconditionDao;
	
	@Override
	public ChReconditionEntity queryObject(Long fId){
		ChReconditionEntity temp = chReconditionDao.queryObject(fId);
		return temp;
	}
	
	@Override
	public List<ChReconditionEntity> queryList(Map<String, Object> map){
		return chReconditionDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return chReconditionDao.queryTotal(map);
	}
	
	@Override
	public void save(ChReconditionEntity chRecondition){
		chReconditionDao.save(chRecondition);
	}
	
	@Override
	public void update(ChReconditionEntity chRecondition){
		chReconditionDao.update(chRecondition);
	}
	
	@Override
	public void delete(Long fId){
		chReconditionDao.delete(fId);
	}
	
	@Override
	public int deleteBatch(Long[] fIds){
		return chReconditionDao.deleteBatch(fIds);
	}
	
}
