package io.jeasyframework.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import io.jeasyframework.dao.master.SysUserPasswordDao;
import io.jeasyframework.entity.SysUserPasswordEntity;
import io.jeasyframework.service.SysUserPasswordService;



@Service("sysUserPasswordService")
public class SysUserPasswordServiceImpl implements SysUserPasswordService {
	@Autowired
	private SysUserPasswordDao sysUserPasswordDao;
	
	@Override
	public SysUserPasswordEntity queryObject(Object id){
		return sysUserPasswordDao.queryObject(id);
	}
	
	@Override
	public List<SysUserPasswordEntity> queryList(Map<String, Object> map){
		return sysUserPasswordDao.queryList(map);
	}

	@Override
	public List<SysUserPasswordEntity> queryByUser(Long userId) {
		return sysUserPasswordDao.queryByUser(userId);
	}

	@Override
	public int queryTotal(Map<String, Object> map){
		return sysUserPasswordDao.queryTotal(map);
	}
	
	@Override
	public void save(SysUserPasswordEntity sysUserPassword){
		sysUserPasswordDao.save(sysUserPassword);
	}
	
	@Override
	public void update(SysUserPasswordEntity sysUserPassword){
		sysUserPasswordDao.update(sysUserPassword);
	}
	
	@Override
	public void delete(Object id){
		sysUserPasswordDao.delete(id);
	}
	
	@Override
	public void deleteBatch(Object[] ids){
		sysUserPasswordDao.deleteBatch(ids);
	}
	
}
