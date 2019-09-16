package io.jeasyframework.dao.master;

import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.MesScheduleEntity;
import org.springframework.stereotype.Repository;

import java.util.Map;
import  java.util.List;
/**
 * 定时任务
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年12月1日 下午10:29:57
 */
@Repository("MesScheduleDao")
public interface MesScheduleDao extends BaseDao<MesScheduleEntity> {
	int queryTotal(Map<String, Object> map);
	MesScheduleEntity getMaxent(Object id);
	List<MesScheduleEntity> queryListCase(Map<String, Object> map);
}
