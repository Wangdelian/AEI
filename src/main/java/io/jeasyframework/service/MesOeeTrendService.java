package io.jeasyframework.service;
import io.jeasyframework.entity.MesOeeTrendEntity;
import java.util.List;
import java.util.Map;

/**
 * Created by yaobaolin on 2017/8/7 0007.
 */
public interface MesOeeTrendService {
    List<MesOeeTrendEntity> queryList(Map<String, Object> map);
    List<MesOeeTrendEntity> queryLine(Map<String, Object> map);
    List<MesOeeTrendEntity> queryLineDay(Map<String,Object> map);
    List<MesOeeTrendEntity> queryLineShiftName(Map<String,Object> map);
}
