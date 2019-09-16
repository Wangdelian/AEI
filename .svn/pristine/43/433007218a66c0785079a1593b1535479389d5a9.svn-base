package io.jeasyframework.service.impl;

import io.jeasyframework.dao.master.SysLogDao;
import io.jeasyframework.entity.SysLogAnalyzeEntity;
import io.jeasyframework.entity.SysLogEntity;
import io.jeasyframework.service.SysLogService;
import io.jeasyframework.utils.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;



@Service("sysLogService")
public class SysLogServiceImpl implements SysLogService {
	@Autowired
	private SysLogDao sysLogDao;
	
	@Override
	public SysLogEntity queryObject(Long id){
		return sysLogDao.queryObject(id);
	}
	
	@Override
	public List<SysLogEntity> queryList(Map<String, Object> map){
		return sysLogDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return sysLogDao.queryTotal(map);
	}
	
	@Override
	public void save(SysLogEntity sysLog){
		sysLogDao.save(sysLog);
	}
	
	@Override
	public void update(SysLogEntity sysLog){
		sysLogDao.update(sysLog);
	}
	
	@Override
	public void delete(Long id){
		sysLogDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Long[] ids){
		sysLogDao.deleteBatch(ids);
	}

	@Override
	public List<SysLogAnalyzeEntity> analyzeList(Query query) {
		return sysLogDao.analyzeList(query);
	}

	@Override
	public int analyzeTotal(Query query) {
		return sysLogDao.analyzeTotal(query);
	}

}
