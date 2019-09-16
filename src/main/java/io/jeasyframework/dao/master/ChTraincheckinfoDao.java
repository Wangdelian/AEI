package io.jeasyframework.dao.master;


import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.ChTraincheckinfoEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-10-23 09:36:04
 */
@Mapper
public interface ChTraincheckinfoDao extends BaseDao<ChTraincheckinfoEntity> {
    List<ChTraincheckinfoEntity> queryerrorList(Map<String, Object> map);

    List<ChTraincheckinfoEntity> queryreporterrorlist(Map<String, Object> map);

    int queryreporterrorlistTotal(Map<String, Object> map);

    int queryrepairList(Map<String, Object> map);

    List<ChTraincheckinfoEntity> queryByConditions(ChTraincheckinfoEntity chTraincheckinfo);

    List<ChTraincheckinfoEntity> queryAllInfo(ChTraincheckinfoEntity chTraincheckinfo);

    List<ChTraincheckinfoEntity> queryJu(Map<String, Object> map);

    List<ChTraincheckinfoEntity> queryDuan(Map<String, Object> map);

    List<ChTraincheckinfoEntity> queryChang(Map<String, Object> map);


    List<ChTraincheckinfoEntity> queryManageList(Map<String, Object> map);

    int queryManageTotal(Map<String, Object> map);

    List<ChTraincheckinfoEntity> queryLast(Map<String, Object> map);

    List<ChTraincheckinfoEntity> queryTrainPath(Map<String, Object> map);

    int queryTrainPathTotal(Map<String, Object> map);

    List<ChTraincheckinfoEntity> queryType(Map<String, Object> map);

    List<ChTraincheckinfoEntity> queryNumber(Map<String, Object> map);

    List<ChTraincheckinfoEntity> queryIdleList(Map<String, Object> map);

    int queryIdleTotal(Map<String, Object> map);

}
