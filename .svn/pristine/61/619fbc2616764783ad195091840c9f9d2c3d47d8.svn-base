package io.jeasyframework.service.impl;
import io.jeasyframework.entity.MesScheduleEntity;
import io.jeasyframework.service.MesScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;
import io.jeasyframework.dao.master.MesScheduleDao;
import org.springframework.stereotype.Service;

/**
 * Created by yaobaolin on 2017/8/3 0003.
 */
@Service("MesScheduleService")
public class MesScheduleServiceImpl implements MesScheduleService {
        @Autowired
        private  MesScheduleDao mesScheduleDao;
    public MesScheduleEntity queryObject(Long fProducescheduleid){
        return mesScheduleDao.queryObject(fProducescheduleid);
    }
    public  List<MesScheduleEntity> queryList(Map<String, Object> map){
        return mesScheduleDao.queryList(map);
    }
    public int queryTotal(Map<String, Object> map){
        return mesScheduleDao.queryTotal(map);
    }
    public  void save(MesScheduleEntity mesScheduleEntity){
        mesScheduleDao.save(mesScheduleEntity);
    }
    public void update(MesScheduleEntity mesScheduleEntity){
        mesScheduleDao.update(mesScheduleEntity);
    }
    public  void deleteBatch(Long[] fProducescheduleids){mesScheduleDao.deleteBatch(fProducescheduleids);}
    public  MesScheduleEntity getMaxendTime(Long id){

        return mesScheduleDao.getMaxent(id);
    }

    @Override
    public List<MesScheduleEntity> queryListCase(Map<String, Object> map) {
        return mesScheduleDao.queryListCase(map);
    }
}
