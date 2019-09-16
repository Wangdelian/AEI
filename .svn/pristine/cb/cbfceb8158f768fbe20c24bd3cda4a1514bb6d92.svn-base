package io.jeasyframework.dao.master;

import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.ChJsondataEntity;
import io.jeasyframework.entity.LevelMarkEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/3.
 */

@Repository
public interface LevelMarkDao extends BaseDao<LevelMarkEntity> {
    int getChildNum(String pid);

    String queryAbname(Long userId);

    List<LevelMarkEntity> queryAbname2(Long userId);

    List<ChJsondataEntity> queryListbypid(Map<String, Object> map);

    List<LevelMarkEntity> queryByConditions(LevelMarkEntity levelmark);

    String queryLevelMarkUp(String levelmarkId);

    String queryLevelIDMarkUp(String levelmarkid);

    int querySystemTotal(Map<String, Object> map);

    List<LevelMarkEntity> querySystemList(Map<String, Object> map);



}
