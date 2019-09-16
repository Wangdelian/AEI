package io.jeasyframework.dao.master;

import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.SysDictionaryEntity;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.List;

/**
 * Created by Admin-zbf on 2017/7/14.
 */
@Repository
public interface SysDictionaryDao extends BaseDao<SysDictionaryEntity> {
    List<SysDictionaryEntity> queryListByConditions(Map<String,Object> map);
    int queryTotalByConditions(Map<String,Object> map);

    int saveOverride(SysDictionaryEntity sysDictionaryEntity);
}
