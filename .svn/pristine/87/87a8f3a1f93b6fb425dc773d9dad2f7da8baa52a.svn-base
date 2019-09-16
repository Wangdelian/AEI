package io.jeasyframework.service.impl;

import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.dao.master.LevelMarkDao;
import io.jeasyframework.entity.ChJsondataEntity;
import io.jeasyframework.entity.LevelMarkEntity;
import io.jeasyframework.service.LevelMarkService;
import io.jeasyframework.utils.DynamicDataSourceUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/3.
 */
@Service("levelMarkService")
public class LevelMarkServiceImpl implements LevelMarkService {
    @Autowired
    private LevelMarkDao levelMarkDao;

    @Override
    public int queryTotal(Map<String, Object> map) {
        return levelMarkDao.queryTotal(map);
    }

    @Override
    public List<LevelMarkEntity> queryList(Map<String, Object> map) {
        return levelMarkDao.queryList(map);
    }

    @Override
    public LevelMarkEntity queryObject(String levelmarkid) {
        return levelMarkDao.queryObject(levelmarkid);
    }

    @Override
    @Transactional
    public void delete(String levelmarkid) {
        DynamicDataSourceUtils.doMethod(BaseDao.class, levelMarkDao, "delete", levelmarkid, Object.class);
        //levelMarkDao.delete(levelmarkid);
    }

    @Override
    @Transactional
    public void save(LevelMarkEntity levelmark) {
        DynamicDataSourceUtils.doMethod(BaseDao.class, levelMarkDao, "save", levelmark, Object.class);
        //levelMarkDao.save(levelmark);
    }

    @Override
    @Transactional
    public void update(LevelMarkEntity levelmark) {
        DynamicDataSourceUtils.doMethod(BaseDao.class, levelMarkDao, "update", levelmark, Object.class);

        //levelMarkDao.update(levelmark);
    }

    @Override
    public int getChildNum(String pid) {
        return levelMarkDao.getChildNum(pid);
    }

    @Override
    public String queryAbname(Long userId) {
        return levelMarkDao.queryAbname(userId);
    }

    @Override
    public List<LevelMarkEntity> queryAbname2(Long userId) {
        return levelMarkDao.queryAbname2(userId);
    }

    @Override
    public Boolean sync() {
        return null;
    }

    @Override
    public List<ChJsondataEntity> queryListbypid(Map<String, Object> map) {
        return levelMarkDao.queryListbypid(map);
    }

    @Override
    public List<LevelMarkEntity> queryByConditions(LevelMarkEntity levelmark) {
        return levelMarkDao.queryByConditions(levelmark);
    }

    @Override
    public String queryLevelMarkUp(String levelmarkid) {
        return levelMarkDao.queryLevelMarkUp(levelmarkid);
    }

    @Override
    public String queryLevelIDMarkUp(String levelmarkid) {
        return levelMarkDao.queryLevelIDMarkUp(levelmarkid);
    }

    @Override
    public int querySystemTotal(Map<String, Object> map) {
        return levelMarkDao.querySystemTotal(map);
    }

    @Override
    public List<LevelMarkEntity> querySystemList(Map<String, Object> map) {
        return levelMarkDao.querySystemList(map);
    }

}
