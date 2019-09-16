package io.jeasyframework.service.impl;

import io.jeasyframework.dao.master.MesOeePromoteDao;
import io.jeasyframework.dao.master.MesOeeTrendDao;
import io.jeasyframework.entity.MesOeePromoteEntity;
import io.jeasyframework.entity.MesOeeTrendEntity;
import io.jeasyframework.service.MesOeePromoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/11.
 */
@Service("/MesOeePromoteService")
public class MesOeePromoteServiceImpl implements MesOeePromoteService {
    @Autowired
    private MesOeePromoteDao mesOeePromoteDao;

    @Override
    public List<MesOeePromoteEntity> queryList() {
        return mesOeePromoteDao.queryList();
    }
}
