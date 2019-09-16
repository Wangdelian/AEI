package io.jeasyframework.service;

import io.jeasyframework.entity.SysLogAnalyzeEntity;
import io.jeasyframework.entity.SysLogEntity;
import io.jeasyframework.utils.Query;

import java.util.List;
import java.util.Map;

/**
 * 系统日志
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017-03-08 10:40:56
 */
public interface SysLogService {
	
	SysLogEntity queryObject(Long id);
	
	List<SysLogEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(SysLogEntity sysLog);
	
	void update(SysLogEntity sysLog);
	
	void delete(Long id);
	
	void deleteBatch(Long[] ids);

    List<SysLogAnalyzeEntity> analyzeList(Query query);

	int analyzeTotal(Query query);
}
