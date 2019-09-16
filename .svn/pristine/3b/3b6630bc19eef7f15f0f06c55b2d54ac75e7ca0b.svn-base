package io.jeasyframework.dao.master;

import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.SysUserEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 系统用户
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年9月18日 上午9:34:11
 */

@Repository
public interface SysUserDao extends BaseDao<SysUserEntity> {

	/**
	 * 查询用户的所有权限
	 * @param userId  用户ID
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
	SysUserEntity queryByChineseName(String chinesename);
	/**
	 * 修改密码
	 */
	int updatePassword(Map<String, Object> map);

	/**
	 * 按时间和ID查询
	 */
	List<SysUserEntity> queryListByConditions(Map<String,Object> map);
	int queryTotalByConditions(Map<String,Object> map);
	List<SysUserEntity> queryListByTimeAndID(@Param("beginDate")Date beginDate, @Param("endDate")Date endDate, @Param("id")long id);

	List<SysUserEntity> queryListByTimeAndName(@Param("beginDate")Date beginDate, @Param("endDate")Date endDate,@Param("name")String name);

	/**
	 * 按时间查询数量
	 */
	int queryTotalByTimeAndId(@Param("beginDate")Date beginDate, @Param("endDate")Date endDate, @Param("id")long id);
	int queryTotalByTimeAndName(@Param("beginDate")Date beginDate, @Param("endDate")Date endDate, @Param("name")String name);

	List<SysUserEntity> queryAllLevelMarkId();
	List<SysUserEntity> queryByLevelMarkId(String levelmarkid);
	List<SysUserEntity> queryUser();
	List<SysUserEntity> queryListByLid(Map<String,Object> map);

	int deleteBatch(Long[] userIds);
	/*
    * 增加登录次数
    * */
	void updateLoginCount(Map map);

	void updateLoginStatus(Map map);

    List<SysUserEntity> mysqlList();

	<param> List<SysUserEntity> queryIsLogin(Map<String,Object> map);

	int queryLoginCount();

	Date queryLastLogin();

    void updateFailTimes(SysUserEntity user);

	void updateDateFail(SysUserEntity user);

    void updateDatePassword(SysUserEntity user);

    //重置密码
    int resetPassword(Map<String, Object> map);
}
