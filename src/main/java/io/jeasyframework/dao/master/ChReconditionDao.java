package io.jeasyframework.dao.master;
import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.ChReconditionEntity;
import io.jeasyframework.entity.ChTraincheckinfoEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2019-03-25 11:35:25
 */
@Mapper
public interface ChReconditionDao extends BaseDao<ChReconditionEntity> {
    List<ChReconditionEntity> queryList(Map<String, Object> map);
    int queryTotal(Map<String, Object> map);
    int deleteBatch(Long[] fIds);


	
}
