package io.jeasyframework.service.impl;

import io.jeasyframework.dao.master.SysUserLevelmarkDao;
import io.jeasyframework.service.SysUserLevelmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/16.
 */
@Service("SysUserLevelmarkService")
public class SysUserLevelmarkServiceImpl implements SysUserLevelmarkService {
    @Autowired
    private SysUserLevelmarkDao SysUserLevelmarkDao;

    @Override
    public List<String> queryLevelmarkid(Long userId){
        return SysUserLevelmarkDao.queryLevelmarkid(userId);
    }

    @Override
    public void deleteUser(Long userId){ SysUserLevelmarkDao.deleteUser(userId);}

    @Override
    public int deleteBatch(Long[] userId) {
        return SysUserLevelmarkDao.deleteBatch(userId);
    }

    @Override
    public void insertUser(Map<String,Object> map){SysUserLevelmarkDao.save(map);}
}
