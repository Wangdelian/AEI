package io.jeasyframework.service.impl;

import io.jeasyframework.dao.master.SysDictionaryDao;
import io.jeasyframework.entity.SysDictionaryEntity;
import io.jeasyframework.service.SysDictionaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by Admin-zbf on 2017/7/14.
 */

@Service("SysDictionaryService")
public class SysDictionaryServiceImpl implements SysDictionaryService {
    @Autowired
    private SysDictionaryDao sysDictionaryDao;

    @Override
    public List<SysDictionaryEntity> queryList(Map<String, Object> map) {
        return sysDictionaryDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return sysDictionaryDao.queryTotal(map);
    }

    @Override
    public SysDictionaryEntity queryObject(Long dictionaryId) {
        return sysDictionaryDao.queryObject(dictionaryId);
    }

    @Override
    public int update(SysDictionaryEntity dictionary) {

        return sysDictionaryDao.update(dictionary);
    }

    @Override
    public int delete(long dictionaryId) {

        return sysDictionaryDao.delete(dictionaryId);
    }

    @Override
    public int deleteLists(Object[] objects) {
        return sysDictionaryDao.deleteBatch(objects);
    }

    @Override
    public void save(SysDictionaryEntity dictionary) {
        sysDictionaryDao.saveOverride(dictionary);
    }

    @Override
    public int queryTotalByConditions(Map<String, Object> map) {
        return sysDictionaryDao.queryTotalByConditions(map);
    }

    @Override
    public List<SysDictionaryEntity> queryListByConditions(Map<String, Object> map) {
        return sysDictionaryDao.queryListByConditions(map);
    }
}
