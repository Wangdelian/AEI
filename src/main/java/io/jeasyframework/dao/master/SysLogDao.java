package io.jeasyframework.dao.master;

import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.SysLogAnalyzeEntity;
import io.jeasyframework.entity.SysLogEntity;
import io.jeasyframework.utils.Query;

import java.util.List;

/**
 * 系统日志
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017-03-08 10:40:56
 */
public interface SysLogDao extends BaseDao<SysLogEntity> {

    List<SysLogAnalyzeEntity> analyzeList(Query query);

    int analyzeTotal(Query query);
}
