package io.jeasyframework.service;

import io.jeasyframework.entity.SysUserEntity;
import io.jeasyframework.utils.dynamicdatasource.TargetDataSource;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;


/**
 * 系统用户
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年9月18日 上午9:43:39
 */
public interface SysUserService {

    /**
     * 查询用户的所有权限
     *
     * @param userId 用户ID
     */
    List<String> queryAllPerms(Long userId);

    /**
     * 查询用户的所有菜单ID
     */
    List<Long> queryAllMenuId(Long userId);

    /**
     * 根据用户名，查询系统用户
     */
    SysUserEntity queryByUserName(String username);

    /**
     * 根据中文名称获取用户对象
     * @param chinesename
     * @return
     */
    SysUserEntity queryByChineseName(String chinesename);

    /**
     * 根据用户ID，查询用户
     *
     * @param userId
     * @return
     */
    SysUserEntity queryObject(Long userId);

    /**
     * 查询用户列表
     */
    List<SysUserEntity> queryList(Map<String, Object> map);


    /**
     * 多条件查询
     */
    List<SysUserEntity> queryListByConditions(Map<String, Object> map);
    int queryTotalByConditions(Map<String, Object> map);
    List<SysUserEntity> queryListByTimeAndId(Date beginDate, Date endDate, long id);

    List<SysUserEntity> queryListByTimeAndName(Date beginDate, Date endDate, String name);

    /**
     *
     * 组织机构用户搜索
     */
    List<SysUserEntity> queryListByLid(Map<String,Object> map);

    /**
     * 根据时间和ID查询数量
     */
    int queryTotalByTimeAndId(Date beginDate, Date endDate, long id);

    int queryTotalByTimeAndName(Date beginDate, Date endDate, String name);

    /**
     * 查询总数
     */
    int queryTotal(Map<String, Object> map);

    /**
     * 保存用户
     */
    void save(SysUserEntity user);

    /**
     * 修改用户
     */
    void update(SysUserEntity user);
    void updateByCondition(SysUserEntity user);

    /**
     * 删除用户
     */
    int deleteBatch(Long[] userIds);

    /**
     * 修改密码
     *
     * @param userId      用户ID
     * @param password    原密码
     * @param newPassword 新密码
     */
    int updatePassword(Long userId, String password, String newPassword);

    List<SysUserEntity> queryAllLevelMarkId();
    List<SysUserEntity> queryByLevelMarkId(String levelmarkid);

    List<SysUserEntity> queryUser();

    /*
    * 增加登录次数
    * */
    void updateLoginCount(String username,String password);

    void updateLoginStatus(String username,String password,String status);

    @TargetDataSource(name = "master")
    List<SysUserEntity> mysqlList();

    @TargetDataSource(name = "slaveAlpha")
    List<SysUserEntity> oracleList();

    Boolean sync();


    <param> List<SysUserEntity> queryIsLogin(Map<String,Object> map);

    /**
     * 查询本系统用户访问总次数
     */
    int queryLoginCount();

    /**
     * 查询最后一次被用户访问的时间
     */
    Date queryLastLogin();

    //更新密码错误次数
    void updateFailTimes(SysUserEntity user);

    //更新用户锁定时间，并将密码错误次数变为0
    void updateDateFail(SysUserEntity user);

    void updateDatePassword(SysUserEntity user);

    int resetPassword(Long userId, String password);
}
