package io.jeasyframework.dao.master;


import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.UmUsermasterEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-11-07 09:41:06
 */
@Mapper
public interface UmUsermasterDao extends BaseDao<UmUsermasterEntity> {

    UmUsermasterEntity queryByUserName(String username);


}
