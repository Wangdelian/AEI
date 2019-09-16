package io.jeasyframework.service.impl;


import io.jeasyframework.dao.master.MesOeeTrendDao;

import io.jeasyframework.entity.MesOeeTrendEntity;

import io.jeasyframework.service.MesOeeTrendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by yaobaolin on 2017/8/7 0007.
 */
@Service("/MesOeeTrendService")
public class MesOeeTrendServiceImpl implements MesOeeTrendService {
    @Autowired
    private MesOeeTrendDao mesOeeTrendDao;
    @Override
    public List<MesOeeTrendEntity> queryList(Map<String, Object> map) {
        return mesOeeTrendDao.queryList(map);
    }
    @Override
    public List<MesOeeTrendEntity> queryLine(Map<String, Object> map) {return mesOeeTrendDao.queryLine(map);}

    @Override
    public List<MesOeeTrendEntity> queryLineDay(Map<String, Object> map) {
        return mesOeeTrendDao.queryLineDay(map);
    }

    @Override
    public List<MesOeeTrendEntity> queryLineShiftName(Map<String, Object> map) {
        return mesOeeTrendDao.queryLineShiftName(map);
    }
}
