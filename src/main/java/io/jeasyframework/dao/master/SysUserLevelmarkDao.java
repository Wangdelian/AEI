package io.jeasyframework.dao.master;

import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.SysUserLevelmarkEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/16.
 */

@Repository
public interface SysUserLevelmarkDao extends BaseDao<SysUserLevelmarkEntity> {
    List<String> queryLevelmarkid(Long userId);
    void deleteUser(Long userId);
    int deleteBatch(Long[] userIds);
}
