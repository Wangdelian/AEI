package io.jeasyframework.service.impl;

import io.jeasyframework.dao.master.UserSkinDao;
import io.jeasyframework.entity.UserSkinEntity;
import io.jeasyframework.service.UserSkinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by hh on 2017/7/26.
 */
@Service("userSkinService")
public class UserSkinServiceImpl implements UserSkinService{
    @Autowired
    private UserSkinDao userSkinDao;

    @Override
    public UserSkinEntity queryObject(Long userskinid) {
        return userSkinDao.queryObject(userskinid);
    }

    @Override
    public List<UserSkinEntity> queryList(Map<String, Object> map) {
        return userSkinDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return userSkinDao.queryTotal(map);
    }

    @Override
    public void save(UserSkinEntity userskin) {
        userSkinDao.save(userskin);
    }

    @Override
    public void update(UserSkinEntity userSkin) {
            userSkinDao.update(userSkin);
    }

    @Override
    public void delete(Long userskinid) {
        userSkinDao.delete(userskinid);
    }

    @Override
    public void deleteBatch(Long[] ids) {
        userSkinDao.deleteBatch(ids);
    }
}
