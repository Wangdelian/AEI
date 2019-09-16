package io.jeasyframework.dao.master;

import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.SysUserPasswordEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2019-07-10 09:08:52
 */
@Repository
public interface SysUserPasswordDao extends BaseDao<SysUserPasswordEntity> {
    /**
     * 查询用户的最近密码
     * @param userId  用户ID
     */
    List<SysUserPasswordEntity> queryByUser(Long userId);
	
}
