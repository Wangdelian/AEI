package io.jeasyframework.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import io.jeasyframework.dao.master.ChTraincheckdetailDao;
import io.jeasyframework.entity.ChTraincheckdetailEntity;
import io.jeasyframework.service.ChTraincheckdetailService;



@Service("chTraincheckdetailService")
public class ChTraincheckdetailServiceImpl implements ChTraincheckdetailService {
	@Autowired
	private ChTraincheckdetailDao chTraincheckdetailDao;
	
	@Override
	public ChTraincheckdetailEntity queryObject(Long fId){
		return chTraincheckdetailDao.queryObject(fId);
	}
	
	@Override
	public List<ChTraincheckdetailEntity> queryList(Map<String, Object> map){
		return chTraincheckdetailDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return chTraincheckdetailDao.queryTotal(map);
	}
	
	@Override
	public void save(ChTraincheckdetailEntity chTraincheckdetail){
		chTraincheckdetailDao.save(chTraincheckdetail);
	}
	
	@Override
	public void update(ChTraincheckdetailEntity chTraincheckdetail){
		chTraincheckdetailDao.update(chTraincheckdetail);
	}
	
	@Override
	public void delete(Long fId){
		chTraincheckdetailDao.delete(fId);
	}
	
	@Override
	public void deleteBatch(Long[] fIds){
		chTraincheckdetailDao.deleteBatch(fIds);
	}

	@Override
	public List<ChTraincheckdetailEntity> queryAllInfo(ChTraincheckdetailEntity chTraincheckdetail) {
		return chTraincheckdetailDao.queryAllInfo(chTraincheckdetail);
	}

	@Override
	public void updateResult(ChTraincheckdetailEntity chTraincheckdetail){
		chTraincheckdetailDao.updateResult(chTraincheckdetail);
	}


}
