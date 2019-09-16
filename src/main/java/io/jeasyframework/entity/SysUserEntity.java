package io.jeasyframework.entity;

import io.jeasyframework.utils.validator.group.AddGroup;
import io.jeasyframework.utils.validator.group.UpdateGroup;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 系统用户
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年9月18日 上午9:28:55
 */
public class SysUserEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	/**
	 * 用户ID
	 */
	private Long userId;

	/**
	 * 用户名
	 */
	@NotBlank(message="用户名不能为空", groups = {AddGroup.class, UpdateGroup.class})
	private String username;

	/**
	 * 密码
	 */
	@NotBlank(message="密码不能为空", groups = AddGroup.class)
	private transient String password;

	private transient String newPass1;
	private transient String newPass2;

	/**
	 * 邮箱
	 */
	@Email(message="邮箱格式不正确", groups = {AddGroup.class, UpdateGroup.class})
	private String email;

	/**
	 * 手机号
	 */
	private String mobile;

	/**
	 * 状态  0：禁用   1：正常
	 */
	private Integer status;
	
	/**
	 * 角色ID列表
	 */
	private List<Long> roleIdList;

	private List<Long> menuIdList;
	
	/**
	 * 创建者ID
	 */
	private Long createUserId;

	/**
	 * 创建时间
	 */
	private Date createTime;

	/**
	 * 中文名称
	 */
	private String chineseName;

	/**
	 * 登录显示首页
	 */
	private Long menuid;

	/**
	 * 最后I次登录时间
	 */
	private Date dateLastLogin;

	/**
	 * 最后修改密码时间
	 */
	private Date datePassword;

	/**
	 * 登录失败达到5次，开始锁定用户时间
	 */
	private Date dateFail;

	/**
	 * 登陆失败次数
	 */
	private Integer failTimes;

	/**
	 * 模板/皮肤名称
	 */
	private String skin;

	/**
	 * 用户图标
	 */
	private String userPhoto;

	/**
	 * 扩展属性1
	 */
	private String userextvalue1;

	/**
	 * 扩展属性2 用户登录次数字段
	 */
	private String userextvalue2;

	/**
	 * 扩展属性3
	 */
	private String userextvalue3;

	/**
	 * 扩展属性4
	 */
	private String userextvalue4;

	/**
	 * 扩展属性5
	 */
	private String userextvalue5;

	/**
	 * 用户菜单权限列表
	 */
	private List<SysMenuEntity> sysMenuList;

	private List<SysRoleEntity> sysRoleList;

	private String levelmarkid;

	//部门名称，所属部门
	private String abname;

	//部门名称,所有级别
	private String abnameTotal;

	//部门ID,所有级别
	private String levelmarkidTotal;

	private Short sex;
	/**
	 * 盐
	 */
	private String salt;

	//用户机构队列
	private List<String> userlevelmark;
	//角色名称
	private String roleName;

	private String menuname;

	public String getLevelmarkidTotal() {
		return levelmarkidTotal;
	}

	public void setLevelmarkidTotal(String levelmarkidTotal) {
		this.levelmarkidTotal = levelmarkidTotal;
	}

	public String getMenuname() {
		return menuname;
	}

	public void setMenuname(String menuname) {
		this.menuname = menuname;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public List<String> getUserlevelmark() {
		return userlevelmark;
	}

	public void setUserlevelmark(List<String> userlevelmark) {
		this.userlevelmark = userlevelmark;
	}

	/**
	 * 设置：最后I次登录时间
	 * @param dateLastLogin 最后I次登录时间
	 */
	public void setDateLastLogin(Date dateLastLogin) {
		this.dateLastLogin = dateLastLogin;
	}

	/**
	 * 获取：最后I次登录时间
	 * @return Date
	 */
	public Date getDateLastLogin() {
		return dateLastLogin;
	}

	/**
	 * 获取：中文名称
	 * @return String
	 */
	public String getChineseName() {
		return chineseName;
	}

	/**
	 * 设置：中文名称
	 * @param chineseName 中文名称
	 */
	public void setChineseName(String chineseName) {
		this.chineseName = chineseName==null?"":chineseName.trim();
	}

	/**
	 * 获取：模板/皮肤
	 * @return String
	 */
	public String getSkin() {
		return skin;
	}

	/**
	 * 设置：模板/皮肤
	 * @param skin 模板/皮肤
	 */
	public void setSkin(String skin) {
		this.skin = skin;
	}

	/**
	 * 获取：用户图标
	 * @return String
	 */
	public String getUserPhoto() {
		return userPhoto;
	}

	/**
	 * 设置：用户图标
	 * @param userPhoto 用户图标
	 */
	public void setUserPhoto(String userPhoto) {
		this.userPhoto = userPhoto;
	}

	/**
	 * 设置：
	 * @param userId 
	 */
	public void setUserId(Long userId) {
		this.userId = userId;
	}

	/**
	 * 获取：
	 * @return Long
	 */
	public Long getUserId() {
		return userId;
	}
	
	/**
	 * 设置：用户名
	 * @param username 用户名
	 */
	public void setUsername(String username) {
		this.username = username==null?"":username.trim();
	}

	/**
	 * 获取：用户名
	 * @return String
	 */
	public String getUsername() {
		return username;
	}
	
	/**
	 * 设置：密码
	 * @param password 密码
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * 获取：密码
	 * @return String
	 */
	public String getPassword() {
		return password;
	}
	
	/**
	 * 设置：邮箱
	 * @param email 邮箱
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * 获取：邮箱
	 * @return String
	 */
	public String getEmail() {
		return email;
	}
	
	/**
	 * 设置：手机号
	 * @param mobile 手机号
	 */
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	/**
	 * 获取：手机号
	 * @return String
	 */
	public String getMobile() {
		return mobile;
	}
	
	/**
	 * 设置：状态  0：禁用   1：正常
	 * @param status 状态  0：禁用   1：正常
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}

	/**
	 * 获取：状态  0：禁用   1：正常
	 * @return Integer
	 */
	public Integer getStatus() {
		return status;
	}



	public void setFailTimes(Integer failTimes) {
		this.failTimes = failTimes;
	}


	public Integer getFailTimes() {
		return failTimes;
	}
	
	/**
	 * 设置：创建时间
	 * @param createTime 创建时间
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * 获取：创建时间
	 * @return Date
	 */
	public Date getCreateTime() {
		return createTime;
	}

	public List<Long> getRoleIdList() {
		return roleIdList;
	}

	public void setRoleIdList(List<Long> roleIdList) {
		this.roleIdList = roleIdList;
	}

	public List<Long> getMenuIdList() {
		return menuIdList;
	}

	public void setMenuIdList(List<Long> menuIdList) {
		this.menuIdList = menuIdList;
	}

	public Long getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(Long createUserId) {
		this.createUserId = createUserId;
	}

	public List<SysMenuEntity> getsysMenuList() {
		return sysMenuList;
	}

	public void setsysMenuList(List<SysMenuEntity> sysMenuList) {
		this.sysMenuList = sysMenuList;
	}

	public List<SysRoleEntity> getsysRoleList() {
		return sysRoleList;
	}

	public void setsysRoleList(List<SysRoleEntity> sysRoleList) {
		this.sysRoleList = sysRoleList;
	}

	/**
	 * 设置：扩展属性1
	 * @param userextvalue1 扩展属性1
	 */
	public void setUserextvalue1(String userextvalue1) {
		this.userextvalue1 = userextvalue1;
	}

	/**
	 * 获取：扩展属性1
	 * @return String
	 */
	public String getUserextvalue1() {
		return userextvalue1;
	}

	/**
	 * 设置：扩展属性2
	 * @param userextvalue2 扩展属性2
	 */
	public void setUserextvalue2(String userextvalue2) {
		this.userextvalue2 = userextvalue2;
	}

	/**
	 * 获取：扩展属性2
	 * @return String
	 */
	public String getUserextvalue2() {
		return userextvalue2;
	}


	public void setDatePassword(Date datePassword) {
		this.datePassword = datePassword;
	}


	public Date getDatePassword() {
		return datePassword;
	}

	public void setDateFail(Date dateFail) {
		this.dateFail = dateFail;
	}


	public Date getDateFail() {
		return dateFail;
	}

	/**
	 * 设置：扩展属性3
	 * @param userextvalue3 扩展属性3
	 */
	public void setUserextvalue3(String userextvalue3) {
		this.userextvalue3 = userextvalue3;
	}

	/**
	 * 获取：扩展属性3
	 * @return String
	 */
	public String getUserextvalue3() {
		return userextvalue3;
	}

	/**
	 * 设置：扩展属性4
	 * @param userextvalue4 扩展属性4
	 */
	public void setUserextvalue4(String userextvalue4) {
		this.userextvalue4 = userextvalue4;
	}

	/**
	 * 获取：扩展属性4
	 * @return String
	 */
	public String getUserextvalue4() {
		return userextvalue4;
	}

	/**
	 * 设置：扩展属性5
	 * @param userextvalue5 扩展属性5
	 */
	public void setUserextvalue5(String userextvalue5) {
		this.userextvalue5 = userextvalue5;
	}

	/**
	 * 获取：扩展属性5
	 * @return String
	 */
	public String getUserextvalue5() {
		return userextvalue5;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public String getLevelmarkid() {
		return levelmarkid;
	}

	public void setLevelmarkid(String levelmarkid) {
		this.levelmarkid = levelmarkid;
	}

	public String getAbname() {
		return abname;
	}

	public void setAbnameTotal(String abnameTotal) {
		this.abnameTotal = abnameTotal;
	}

	public String getAbnameTotal() {
		return abnameTotal;
	}

	public void setAbname(String abname) {
		this.abname = abname;
	}

	public Short getSex() {
		return sex;
	}

	public void setSex(Short sex) {
		this.sex = sex;
	}
	public String getNewPass1() {
		return newPass1;
	}

	public void setNewPass1(String newPass1) {
		this.newPass1 = newPass1;
	}

	public String getNewPass2() {
		return newPass2;
	}

	public void setNewPass2(String newPass2) {
		this.newPass2 = newPass2;
	}

	public Long getMenuid() {
		return menuid;
	}

	public void setMenuid(Long menuid) {
		this.menuid = menuid;
	}

	@Override
	public String toString() {
		return "SysUserEntity{" +
				"userId=" + userId +
				", username='" + username + '\'' +
				", password='" + password + '\'' +
				", newPass1='" + newPass1 + '\'' +
				", newPass2='" + newPass2 + '\'' +
				", email='" + email + '\'' +
				", mobile='" + mobile + '\'' +
				", status=" + status +
				", roleIdList=" + roleIdList +
				", menuIdList=" + menuIdList +
				", createUserId=" + createUserId +
				", createTime=" + createTime +
				", chineseName='" + chineseName + '\'' +
				", dateLastLogin=" + dateLastLogin +
				", skin='" + skin + '\'' +
				", userPhoto='" + userPhoto + '\'' +
				", userextvalue1='" + userextvalue1 + '\'' +
				", userextvalue2='" + userextvalue2 + '\'' +
				", userextvalue3='" + userextvalue3 + '\'' +
				", userextvalue4='" + userextvalue4 + '\'' +
				", userextvalue5='" + userextvalue5 + '\'' +
				", sysMenuList=" + sysMenuList +
				", sysRoleList=" + sysRoleList +
				", levelmarkid='" + levelmarkid + '\'' +
				", abname=" + abname +
				", abnameTotal=" + abnameTotal +
				", sex=" + sex +
				", salt='" + salt + '\'' +
				", userlevelmark=" + userlevelmark +
				'}';
	}
}
