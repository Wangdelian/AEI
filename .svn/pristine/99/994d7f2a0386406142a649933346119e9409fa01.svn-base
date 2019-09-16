package io.jeasyframework.service;

import io.jeasyframework.entity.SysDictionaryEntity;

import java.util.List;
import java.util.Map;

/**
 * Created by Admin-zbf on 2017/7/14.
 */
public interface SysDictionaryService {

    //查询所有数据
    List<SysDictionaryEntity> queryList(Map<String, Object> map);
    //查询数据数量
    int queryTotal(Map<String, Object> map);
    //查询单个
    SysDictionaryEntity queryObject(Long dictionaryId);
    //修改单个信息
    int update(SysDictionaryEntity dictionary);
    //删除单个
    int delete(long dictionaryId);
    //多选删除
    int deleteLists(Object[] objects);
    //增加一个
    void save(SysDictionaryEntity dictionary);

    int queryTotalByConditions(Map<String, Object> map);

    List<SysDictionaryEntity> queryListByConditions(Map<String, Object> map);
}
