package io.jeasyframework.service;

import io.jeasyframework.entity.ChJsondataEntity;
import io.jeasyframework.entity.LevelMarkEntity;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/3.
 */
public interface LevelMarkService {
    List<LevelMarkEntity> queryList(Map<String, Object> map);

    int queryTotal(Map<String, Object> map);

    LevelMarkEntity queryObject(String levelmarkid);

    void delete(String levelmarkid);

    void save(LevelMarkEntity levelmark);

    void update(LevelMarkEntity levelmark);

    int getChildNum(String pid);

    String queryAbname(Long userId);

	List<LevelMarkEntity> queryAbname2(Long userId);

    Boolean sync();

    List<ChJsondataEntity> queryListbypid(Map<String, Object> map);

    List<LevelMarkEntity> queryByConditions(LevelMarkEntity levelmark);

    String queryLevelMarkUp(String levelmarkid);

    String queryLevelIDMarkUp(String levelmarkid);

    //系统页面列表
    List<LevelMarkEntity> querySystemList(Map<String, Object> map);

    int querySystemTotal(Map<String, Object> map);

}
