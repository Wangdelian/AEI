package io.jeasyframework.service;

import io.jeasyframework.entity.ChTraincheckinfoEntity;
import io.jeasyframework.utils.Query;

import java.util.List;
import java.util.Map;

/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-10-23 09:36:04
 */
public interface ChTraincheckinfoService {
	
	ChTraincheckinfoEntity queryObject(Long fId);
	
	List<ChTraincheckinfoEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);

	void save(ChTraincheckinfoEntity chTraincheckinfo);
	
	void update(ChTraincheckinfoEntity chTraincheckinfo);
	
	void delete(Long fId);
	
	void deleteBatch(Long[] fIds);

	List<ChTraincheckinfoEntity> queryerrorList(Map<String, Object> map);

	List<ChTraincheckinfoEntity> queryreporterrorlist(Map<String, Object> map);

	int queryreporterrorlistTotal(Map<String, Object> map);

	int queryrepairList(Map<String, Object> map);


	List<ChTraincheckinfoEntity> queryByConditions(ChTraincheckinfoEntity chTraincheckinfo);

	List<ChTraincheckinfoEntity> queryAllInfo(ChTraincheckinfoEntity chTraincheckinfo);

	List<ChTraincheckinfoEntity> queryJu(Map<String, Object> map);

	List<ChTraincheckinfoEntity> queryDuan(Map<String, Object> map);

	List<ChTraincheckinfoEntity> queryChang(Map<String, Object> map);


	//过车管理页面
	List<ChTraincheckinfoEntity> queryManageList(Map<String, Object> map);

	int queryManageTotal(Map<String, Object> map);

	//系统检测页面选取部门下最近一次过车记录
	List<ChTraincheckinfoEntity> queryLast(Map<String, Object> map);


	//机车运行轨迹页面
	List<ChTraincheckinfoEntity> queryTrainPath(Map<String, Object> map);

	int queryTrainPathTotal(Map<String, Object> map);

    List<ChTraincheckinfoEntity> queryType(Map<String, Object> params);


	List<ChTraincheckinfoEntity> queryNumber(Map<String, Object> map);

	//在段机车页面
    List<ChTraincheckinfoEntity> queryIdleList(Map<String, Object> map);

	int queryIdleTotal(Map<String, Object> map);
}
