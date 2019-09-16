package io.jeasyframework.dao.master;


import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.ChDeviceEntity;
import io.jeasyframework.entity.ChJsondataEntity;
import io.jeasyframework.entity.LevelMarkEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-11-05 11:38:46
 */
@Mapper
public interface ChDeviceDao extends BaseDao<ChDeviceEntity> {

    List<ChJsondataEntity> queryjsondata(Map<String, Object> map);

    List<ChJsondataEntity> queryjson(Map<String, Object> map);

    List<LevelMarkEntity> queryByLevelmarkid(Map<String, Object> map);

    List<ChDeviceEntity> queryByDeviceid(ChDeviceEntity chDevice);

	
}
