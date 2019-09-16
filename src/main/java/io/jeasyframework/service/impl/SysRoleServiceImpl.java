package io.jeasyframework.service.impl;

import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.dao.master.SysRoleDao;
import io.jeasyframework.dao.master.SysRoleMenuDao;
import io.jeasyframework.entity.SysRoleEntity;
import io.jeasyframework.service.SysRoleMenuService;
import io.jeasyframework.service.SysRoleService;
import io.jeasyframework.service.SysUserRoleService;
import io.jeasyframework.service.SysUserService;
import io.jeasyframework.utils.Constant;
import io.jeasyframework.utils.RRException;

import java.util.Date;
import java.util.List;
import java.util.Map;

import io.jeasyframework.utils.dynamicdatasource.DataSourceKey;
import io.jeasyframework.utils.dynamicdatasource.DynamicDataSourceContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * 角色
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年9月18日 上午9:45:12
 */
@Service("sysRoleService")
public class SysRoleServiceImpl implements SysRoleService {
    @Autowired
    private SysRoleDao sysRoleDao;
    @Autowired
    private SysRoleMenuDao sysRoleMenuDao;
    @Autowired
    private SysRoleMenuService sysRoleMenuService;
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SiteConfig siteConfig;

    @Override
    public SysRoleEntity queryObject(Long roleId) {
        return sysRoleDao.queryObject(roleId);
    }

    @Override
    public List<SysRoleEntity> queryList(Map<String, Object> map) {
        return sysRoleDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return sysRoleDao.queryTotal(map);
    }

    @Override
    @Transactional
    public void save(SysRoleEntity role) {
        //String master = DynamicDataSourceContextHolder.getDataSourceKey().toString();

        role.setCreateTime(new Date());

        //更新时间2018年8月20日13:52:15
        //更新内容，增加index位置，判断为第二个数据源时则不执行
        //int index = 0;

        //for (DataSourceKey dataSourceKey : DataSourceKey.values()) {
        //if (++index == 2 && "是".equals(siteConfig.getConfig01()))
        //continue;

        //切换数据库
        //DynamicDataSourceContextHolder.setDataSourceKey(dataSourceKey.name());

        sysRoleDao.save(role);

        //检查权限是否越权
        checkPrems(role);

        //保存角色与菜单关系
        sysRoleMenuService.saveOrUpdate(role.getRoleId(), role.getMenuIdList());
        //}

        //DynamicDataSourceContextHolder.setDataSourceKey(master);
    }

    @Override
    @Transactional
    public void update(SysRoleEntity role) {
        //String master = DynamicDataSourceContextHolder.getDataSourceKey().toString();

        //更新时间2018年8月20日13:52:15
        //更新内容，增加index位置，判断为第二个数据源时则不执行
        //int index = 0;

        //for (DataSourceKey dataSourceKey : DataSourceKey.values()) {
        //if (++index == 2 && "是".equals(siteConfig.getConfig01()))
        //continue;

        //切换数据库
        //DynamicDataSourceContextHolder.setDataSourceKey(dataSourceKey.name());

        sysRoleDao.update(role);

        //检查权限是否越权
        checkPrems(role);

        //更新角色与菜单关系
        sysRoleMenuService.saveOrUpdate(role.getRoleId(), role.getMenuIdList());

        //}

        //DynamicDataSourceContextHolder.setDataSourceKey(master);
    }

    @Override
    public List<SysRoleEntity> queryListShow(Map<String, Object> map) {
        return sysRoleDao.queryListShow(map);
    }

    @Override
    @Transactional
    public void deleteBatch(Long[] roleIds) {
        //String master = DynamicDataSourceContextHolder.getDataSourceKey().toString();

        //更新时间2018年8月20日13:52:15
        //更新内容，增加index位置，判断为第二个数据源时则不执行
        //int index = 0;

        //for (DataSourceKey dataSourceKey : DataSourceKey.values()) {
        //if (++index == 2 && "是".equals(siteConfig.getConfig01()))
        // continue;

        //切换数据库
        //DynamicDataSourceContextHolder.setDataSourceKey(dataSourceKey.name());
        sysRoleDao.deleteBatch(roleIds);
        sysRoleMenuDao.deleteBatch(roleIds);
        //}

        //DynamicDataSourceContextHolder.setDataSourceKey(master);
    }

    @Override
    public List<Long> queryRoleIdList(Long createUserId) {
        return sysRoleDao.queryRoleIdList(createUserId);
    }

    @Override
    public List<SysRoleEntity> queryRoleNameList(Long userid) {
        return sysRoleDao.queryRoleNameList(userid);
    }

    @Override
    public Boolean sync() {
        return null;
    }

    /**
     * 检查权限是否越权
     */
    private void checkPrems(SysRoleEntity role) {
        //如果不是超级管理员，则需要判断角色的权限是否超过自己的权限
        if (role.getCreateUserId() == Constant.SUPER_ADMIN) {
            return;
        }

        //查询用户所拥有的菜单列表
        List<Long> menuIdList = sysUserService.queryAllMenuId(role.getCreateUserId());

        //判断是否越权
        if (!menuIdList.containsAll(role.getMenuIdList())) {
            throw new RRException("新增角色的权限，已超出你的权限范围");
        }
    }
}
