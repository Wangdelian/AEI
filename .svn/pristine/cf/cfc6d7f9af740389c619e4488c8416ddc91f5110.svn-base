package io.jeasyframework.service.impl;

import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.dao.cluster.MqsDao;
import io.jeasyframework.dao.master.SysUserDao;
import io.jeasyframework.entity.SysLogEntity;
import io.jeasyframework.entity.SysUserEntity;
import io.jeasyframework.service.*;
import io.jeasyframework.utils.Constant;
import io.jeasyframework.utils.DynamicDataSourceUtils;
import io.jeasyframework.utils.RRException;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import io.jeasyframework.utils.dynamicdatasource.DataSourceKey;
import io.jeasyframework.utils.dynamicdatasource.DynamicDataSourceContextHolder;
import io.jeasyframework.utils.dynamicdatasource.TargetDataSource;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * 系统用户
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年9月18日 上午9:46:09
 */
@Service("sysUserService")
public class SysUserServiceImpl implements SysUserService {
    @Autowired
    private SysUserDao sysUserDao;
    @Autowired
    private SysUserRoleService sysUserRoleService;
    @Autowired
    private SysUserLevelmarkService sysUserLevelmarkService;
    @Autowired
    private SysRoleService sysRoleService;
    @Autowired
    private SiteConfig siteConfig;

    @Autowired
    private LevelMarkService levelMarkService;

    @Override
    public List<String> queryAllPerms(Long userId) {
        return sysUserDao.queryAllPerms(userId);
    }

    @Override
    public List<Long> queryAllMenuId(Long userId) {
        return sysUserDao.queryAllMenuId(userId);
    }

    @Override
    public SysUserEntity queryByUserName(String username) {
        SysUserEntity user = sysUserDao.queryByUserName(username);
        if(user!=null){
            user.setAbnameTotal(levelMarkService.queryLevelMarkUp(user.getLevelmarkid()));
            user.setLevelmarkidTotal(levelMarkService.queryLevelIDMarkUp(user.getLevelmarkid()));
        }
        return user;
    }

    @Override
    public SysUserEntity queryByChineseName(String chinesename) {
        return sysUserDao.queryByChineseName(chinesename);
    }

    @Override
    public SysUserEntity queryObject(Long userId) {
        return sysUserDao.queryObject(userId);
    }

    @Override
    public List<SysUserEntity> queryList(Map<String, Object> map) {

        return sysUserDao.queryList(map);
    }

    @Override
    public List<SysUserEntity> queryListByConditions(Map<String, Object> map) {
        return sysUserDao.queryListByConditions(map);
    }

    @Override
    public int queryTotalByConditions(Map<String, Object> map) {
        return sysUserDao.queryTotalByConditions(map);
    }

    @Override
    public List<SysUserEntity> queryListByTimeAndId(Date beginDate, Date endDate, long id) {
        return sysUserDao.queryListByTimeAndID(beginDate, endDate, id);
    }

    /**
     * 组织机构用户搜索
     */
    @Override
    public List<SysUserEntity> queryListByLid(Map<String, Object> map) {
        return sysUserDao.queryListByLid(map);
    }

    @Override
    public List<SysUserEntity> queryListByTimeAndName(Date beginDate, Date endDate, String name) {
        return sysUserDao.queryListByTimeAndName(beginDate, endDate, name);
    }

    @Override
    public int queryTotalByTimeAndId(Date beginDate, Date endDate, long id) {
        return sysUserDao.queryTotalByTimeAndId(beginDate, endDate, id);
    }

    @Override
    public int queryTotalByTimeAndName(Date beginDate, Date endDate, String name) {
        return sysUserDao.queryTotalByTimeAndName(beginDate, endDate, name);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return sysUserDao.queryTotal(map);
    }

    @Override
    @Transactional
    public void save(SysUserEntity user) {
        //String master = DynamicDataSourceContextHolder.getDataSourceKey().toString();
        user.setCreateTime(new Date());
        //sha256加密
        //user.setPassword(new Sha256Hash(user.getPassword()).toHex());
        user.setPassword(user.getPassword());

        //更新时间2018年8月20日13:52:15
        //更新内容，增加index位置，判断为第二个数据源时则不执行
        //int index = 0;

        //for (DataSourceKey dataSourceKey : DataSourceKey.values()) {
        //    if (++index == 2 && "是".equals(siteConfig.getConfig01()))
        //        continue;

            //切换数据库
       //     DynamicDataSourceContextHolder.setDataSourceKey(dataSourceKey.name());

            sysUserDao.save(user);

            //检查角色是否越权
            //2019.0704修改，取消
            //checkRole(user);

            //保存用户与角色关系
            sysUserRoleService.saveOrUpdate(user.getUserId(), user.getRoleIdList());

            //新增用户机构记录
            Map<String, Object> map = new HashMap<>();
            map.put("arr", user.getUserlevelmark());
            map.put("userId", user.getUserId());
            sysUserLevelmarkService.insertUser(map);
        //}

        //切换数据库
        //DynamicDataSourceContextHolder.setDataSourceKey(master);
    }

    @Override
    @Transactional
    public void update(SysUserEntity user) {
        //String master = DynamicDataSourceContextHolder.getDataSourceKey().toString();

        if (StringUtils.isBlank(user.getPassword())) {
            user.setPassword(null);
        } else {
            //user.setPassword(new Sha256Hash(user.getPassword()).toHex());
            user.setPassword(user.getPassword());
        }

        //更新时间2018年8月20日13:52:15
        //更新内容，增加index位置，判断为第二个数据源时则不执行
        //int index = 0;

        //for (DataSourceKey dataSourceKey : DataSourceKey.values()) {
        //if (++index == 2 && "是".equals(siteConfig.getConfig01()))
        //   continue;

        //切换数据库，逻辑
        //DynamicDataSourceContextHolder.setDataSourceKey(dataSourceKey.name());

        Map<String, Object> map = new HashMap<>();
        sysUserDao.update(user);

        //检查角色是否越权
        //2019.0704修改，取消
        //checkRole(user);

        //保存用户与角色关系
        sysUserRoleService.saveOrUpdate(user.getUserId(), user.getRoleIdList());


        if (user.getUserlevelmark() != null) {
            //删除原有的用户机构
            sysUserLevelmarkService.deleteUser(user.getUserId());

            //新增现有的用户机构
            map.put("arr", user.getUserlevelmark());
            map.put("userId", user.getUserId());
            sysUserLevelmarkService.insertUser(map);
        }
        //}

        //DynamicDataSourceContextHolder.setDataSourceKey(master);
    }

    @Override
    @Transactional
    public void updateByCondition(SysUserEntity user) {
        //String master = DynamicDataSourceContextHolder.getDataSourceKey().toString();
        if (StringUtils.isBlank(user.getPassword())) {
            user.setPassword(null);
        } else {
            user.setPassword(user.getPassword());
        }

        //更新时间2018年8月20日13:52:15
        //更新内容，增加index位置，判断为第二个数据源时则不执行
        //int index = 0;

        //for (DataSourceKey dataSourceKey : DataSourceKey.values()) {
        //if (++index == 2 && "是".equals(siteConfig.getConfig01()))
        //  continue;

        // DynamicDataSourceContextHolder.setDataSourceKey(dataSourceKey.name());

        if (sysUserDao.update(user) == 0) {//返回行为0代表不存在该数据
            user.setUserId(null);//将用户id清空
            this.save(user);//向该数据库写入用户信息
        }
        //}

        // DynamicDataSourceContextHolder.setDataSourceKey(master);
    }

    @Override
    @Transactional
    public int deleteBatch(Long[] userId) {
        //String master = DynamicDataSourceContextHolder.getDataSourceKey().toString();
        int result = 0;
        //更新时间2018年8月20日13:52:15
        //更新内容，增加index位置，判断为第二个数据源时则不执行
        //int index = 0;

        //for (DataSourceKey dataSourceKey : DataSourceKey.values()) {
        //    if (++index == 2 && "是".equals(siteConfig.getConfig01()))
        //       continue;

        //切换数据库，逻辑
        //    DynamicDataSourceContextHolder.setDataSourceKey(dataSourceKey.name());

        int num = sysUserDao.deleteBatch(userId);
        result = num == 0 ? result : num;
        sysUserLevelmarkService.deleteBatch(userId);
        //}

        //DynamicDataSourceContextHolder.setDataSourceKey(master);

        return result;
    }

    @Override
    public int updatePassword(Long userId, String password, String newPassword) {
        Map<String, Object> map = new HashMap<>();

        map.put("userId", userId);
        map.put("password", password);
        map.put("newPassword", newPassword);

        int result = DynamicDataSourceUtils.doMethod(SysUserDao.class, sysUserDao, "updatePassword", map, Map.class);

        return result;
    }

    /**
     * 检查角色是否越权
     */
    private void checkRole(SysUserEntity user) {
        //如果不是超级管理员，则需要判断用户的角色是否自己创建
        if (user.getCreateUserId() == Constant.SUPER_ADMIN) {
            return;
        }

        //查询用户创建的角色列表
        List<Long> roleIdList = sysRoleService.queryRoleIdList(user.getCreateUserId());

        //判断是否越权
        if (!roleIdList.containsAll(user.getRoleIdList())) {
            throw new RRException("新增用户所选角色，不是本人创建");
        }
    }

    @Override
    public List<SysUserEntity> queryAllLevelMarkId() {
        return sysUserDao.queryAllLevelMarkId();
    }

    @Override
    public List<SysUserEntity> queryByLevelMarkId(String levelmarkid) {
        return sysUserDao.queryByLevelMarkId(levelmarkid);
    }

    @Override
    public List<SysUserEntity> queryUser() {
        return sysUserDao.queryUser();
    }

    @Override
    public void updateLoginCount(String username, String password) {
        Map map = new HashMap();
        map.put("username", username);
        map.put("password", password);
        sysUserDao.updateLoginCount(map);
    }

    @Override
    public void updateLoginStatus(String username, String password,String status) {
        Map map = new HashMap();
        map.put("username", username);
        map.put("password", password);
        map.put("status", status);
        sysUserDao.updateLoginStatus(map);
    }

    @Override
    public List<SysUserEntity> mysqlList() {
        DynamicDataSourceContextHolder.setDataSourceKey("slaveAlpha");
        System.out.println(DynamicDataSourceContextHolder.getDataSourceKey());
        List<SysUserEntity> sysUserEntityList = sysUserDao.mysqlList();
        DynamicDataSourceContextHolder.clearDataSourceKey();
        System.out.println(DynamicDataSourceContextHolder.getDataSourceKey());

        return sysUserEntityList;
    }

    @Override
    public List<SysUserEntity> oracleList() {
        return sysUserDao.queryList();
    }

    @Override
    public Boolean sync() {
        //int total = sysUserDao.queryTotal();
        List<SysUserEntity> sysUsers = sysUserDao.queryList();


        System.out.println(sysUsers.size());


        return null;
    }

    @Override
    public <param> List<SysUserEntity> queryIsLogin(Map<String, Object> map) {
        return sysUserDao.queryIsLogin(map);
    }

    @Override
    public int queryLoginCount() {
        return sysUserDao.queryLoginCount();
    }

    @Override
    public Date queryLastLogin() {
        return sysUserDao.queryLastLogin();
    }

    @Override
    public void updateFailTimes(SysUserEntity user) {
        sysUserDao.updateFailTimes(user);
    }

    @Override
    public void updateDateFail(SysUserEntity user) {
        sysUserDao.updateDateFail(user);
    }

    @Override
    public void updateDatePassword(SysUserEntity user) {
        sysUserDao.updateDatePassword(user);
    }

    @Override
    public int resetPassword(Long userId, String password) {
        Map<String, Object> map = new HashMap<>();

        map.put("userId", userId);
        map.put("password", password);

        int result = sysUserDao.resetPassword(map);

        return result;

    }

}
