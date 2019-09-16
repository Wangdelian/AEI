package io.jeasyframework.service.impl;

import io.jeasyframework.dao.master.SysRoleDao;
import io.jeasyframework.dao.master.SysUserRoleDao;
import io.jeasyframework.service.SysUserRoleService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import io.jeasyframework.entity.SysRoleEntity;


/**
 * 用户与角色对应关系
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年9月18日 上午9:45:48
 */
@Service("sysUserRoleService")
public class SysUserRoleServiceImpl implements SysUserRoleService {
    @Autowired
    private SysUserRoleDao sysUserRoleDao;
    @Autowired
    private SysRoleDao sysRoleDao;

    @Override
    public void saveOrUpdate(Long userId, List<Long> roleIdList) {
        if (roleIdList.size() == 0) {
            //先删除用户与角色关系
            sysUserRoleDao.delete(userId);
            return;
        }

        //先删除用户与角色关系
        sysUserRoleDao.delete(userId);

        //保存用户与角色关系
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("roleIdList", roleIdList);
        sysUserRoleDao.save(map);
    }

    /**
     * 获取用户权限列表(zTree样式)
     *
     * @param userId
     * @return
     */
    @Override
    public List<SysRoleEntity> getUserRolezTreeList(Long userId) {
        //获取所有权限列表
        List<SysRoleEntity> rolelist = sysRoleDao.queryList(null);
        //获取指定用户权限ID列表
        List<Long> userRolelist = this.queryRoleIdList(userId);
        for (SysRoleEntity entity : rolelist) {
            entity.setopen(true);
            entity.setname(entity.getRoleName());
            entity.seticon(entity.getRoleIcon());
            if (userRolelist.contains(entity.getRoleId())) {
                entity.setchecked(true);
            } else {
                entity.setchecked(false);
            }
        }

        return rolelist;
    }

    @Override
    public List<Long> queryRoleIdList(Long userId) {
        List<SysRoleEntity> list = sysRoleDao.queryList(null);
        return sysUserRoleDao.queryRoleIdList(userId);
    }

    @Override
    public void delete(Long userId) {
        sysUserRoleDao.delete(userId);
    }

    @Override
    public int deleteBatch(Long[] userIds) {
        return sysUserRoleDao.deleteBatch(userIds);
    }
}
