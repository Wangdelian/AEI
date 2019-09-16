package io.jeasyframework.service;

import io.jeasyframework.entity.UserSkinEntity;

import java.util.List;
import java.util.Map;

/**
 * Created by hh on 2017/7/26.
 */

public interface UserSkinService {
    UserSkinEntity queryObject(Long userskinid);

    List<UserSkinEntity> queryList(Map<String, Object> map);

    int queryTotal(Map<String, Object> map);

    void save(UserSkinEntity userSkin);

    void update(UserSkinEntity userSkin);

    void delete(Long userskinid);

    void deleteBatch(Long[] ids);

}
