package io.jeasyframework.service.impl;

import io.jeasyframework.entity.MesOeeDataEntity;
import io.jeasyframework.service.MesOeeDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import io.jeasyframework.dao.master.MesOeeDataDao;
import java.util.List;
import java.util.Map;

/**
 * Created by yaobaolin on 2017/8/7 0007.
 */
@Service("/MesOeeDataService")
public class MesOeeDataServiceImpl implements MesOeeDataService {
    @Autowired
    private MesOeeDataDao mesOeeDataDao;
    @Override
    public List<MesOeeDataEntity> queryList(Map<String, Object> map) {
        return mesOeeDataDao.queryList(map);
    }
    @Override
    public List<MesOeeDataEntity> queryLine(Map<String, Object> map) {return mesOeeDataDao.queryLine(map);}
}
