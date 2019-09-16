package io.jeasyframework.service;

import java.util.List;
import java.util.Map;
import io.jeasyframework.entity.MesScheduleEntity;

/**
 * 角色
 * 
 * @author yaobaolin
 *
 * @date 2017年8月3日 上午10:42:52
 */
public interface MesScheduleService {
	MesScheduleEntity queryObject(Long fProducescheduleid);
	List<MesScheduleEntity> queryList(Map<String, Object> map);
	int queryTotal(Map<String, Object> map);
	void save(MesScheduleEntity mesScheduleEntity);
	void update(MesScheduleEntity mesScheduleEntity);
	void deleteBatch(Long[] fProducescheduleids);
	MesScheduleEntity getMaxendTime(Long id);
	List<MesScheduleEntity> queryListCase(Map<String, Object> map);
}
