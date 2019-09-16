package io.jeasyframework.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import io.jeasyframework.dao.master.ChTraincheckinfoDao;
import io.jeasyframework.entity.ChTraincheckinfoEntity;
import io.jeasyframework.service.ChTraincheckinfoService;



@Service("chTraincheckinfoService")
public class ChTraincheckinfoServiceImpl implements ChTraincheckinfoService {
	@Autowired
	private ChTraincheckinfoDao chTraincheckinfoDao;
	
	@Override
	public ChTraincheckinfoEntity queryObject(Long fId){
		return chTraincheckinfoDao.queryObject(fId);
	}
	
	@Override
	public List<ChTraincheckinfoEntity> queryList(Map<String, Object> map){
		return chTraincheckinfoDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return chTraincheckinfoDao.queryTotal(map);
	}
	
	@Override
	public void save(ChTraincheckinfoEntity chTraincheckinfo){
		chTraincheckinfoDao.save(chTraincheckinfo);
	}
	
	@Override
	public void update(ChTraincheckinfoEntity chTraincheckinfo){
		chTraincheckinfoDao.update(chTraincheckinfo);
	}
	
	@Override
	public void delete(Long fId){
		chTraincheckinfoDao.delete(fId);
	}
	
	@Override
	public void deleteBatch(Long[] fIds){
		chTraincheckinfoDao.deleteBatch(fIds);
	}

	@Override
	public List<ChTraincheckinfoEntity> queryerrorList(Map<String, Object> map) {
		return chTraincheckinfoDao.queryerrorList(map);
	}

	@Override
	public List<ChTraincheckinfoEntity> queryreporterrorlist(Map<String, Object> map) {
		return chTraincheckinfoDao.queryreporterrorlist(map);
	}

	@Override
	public int queryreporterrorlistTotal(Map<String, Object> map) {
		return chTraincheckinfoDao.queryreporterrorlistTotal(map);
	}

	@Override
	public int queryrepairList(Map<String, Object> map) {
		return chTraincheckinfoDao.queryrepairList(map);
	}

	@Override
	public List<ChTraincheckinfoEntity> queryByConditions(ChTraincheckinfoEntity chTraincheckinfo) {
		return chTraincheckinfoDao.queryByConditions(chTraincheckinfo);
	}

	@Override
	public List<ChTraincheckinfoEntity> queryAllInfo(ChTraincheckinfoEntity chTraincheckinfo) {
		return chTraincheckinfoDao.queryAllInfo(chTraincheckinfo);
	}


	@Override
	public List<ChTraincheckinfoEntity> queryType(Map<String, Object> map) {
		return chTraincheckinfoDao.queryType(map);
	}


	@Override
	public List<ChTraincheckinfoEntity> queryNumber(Map<String, Object> map) {
		return chTraincheckinfoDao.queryNumber(map);
	}


	@Override
	public List<ChTraincheckinfoEntity> queryJu(Map<String, Object> map) {
		return chTraincheckinfoDao.queryJu(map);
	}

	@Override
	public List<ChTraincheckinfoEntity> queryDuan(Map<String, Object> map) {
		return chTraincheckinfoDao.queryDuan(map);
	}

	@Override
	public List<ChTraincheckinfoEntity> queryChang(Map<String, Object> map) {
		return chTraincheckinfoDao.queryChang(map);
	}


	@Override
	public List<ChTraincheckinfoEntity> queryManageList(Map<String, Object> map){
		return chTraincheckinfoDao.queryManageList(map);
	}

	@Override
	public int queryManageTotal(Map<String, Object> map){
		return chTraincheckinfoDao.queryManageTotal(map);
	}


	@Override
	public List<ChTraincheckinfoEntity> queryIdleList(Map<String, Object> map) {
		return chTraincheckinfoDao.queryIdleList(map);
	}

	@Override
	public int queryIdleTotal(Map<String, Object> map) {
		return chTraincheckinfoDao.queryIdleTotal(map);
	}

	@Override
	public List<ChTraincheckinfoEntity> queryTrainPath(Map<String, Object> map){
		return chTraincheckinfoDao.queryTrainPath(map);
	}

	@Override
	public int queryTrainPathTotal(Map<String, Object> map){
		return chTraincheckinfoDao.queryTrainPathTotal(map);
	}

	@Override
	public List<ChTraincheckinfoEntity> queryLast(Map<String, Object> map){
		return chTraincheckinfoDao.queryLast(map);
	}
}
