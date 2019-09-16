package io.jeasyframework.entity;


import org.hibernate.validator.constraints.NotBlank;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 角色
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年9月18日 上午9:27:38
 */
public class SysRoleEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	/**
	 * 角色ID
	 */
	private Long roleId;

	/**
	 * 角色父ID
	 */
	private Long roleParentId;
	/**
	 * 父角色名称
	 */
	private String roleParentName="无";
	/**
	 * 角色类型
	 */
	private String roleType;

	/**
	 * 角色图标
	 */
	private String roleIcon;

	/**
	 * 角色排序
	 */
	private Long roleSeq;

	/**
	 * 角色名称
	 */
	@NotBlank(message="角色名称不能为空")
	private String roleName;

	/**
	 * 备注
	 */
	private String remark;
	
	/**
	 * 创建者ID
	 */
	private Long createUserId;
	
	private List<Long> menuIdList;
	
	/**
	 * 创建时间
	 */
	private Date createTime;

	//zTree属性
	private String name;
	private Boolean open;
	private String icon;
	private String iconOpen;
	private String iconClose;
	private Boolean checked;

	/**
	 * 设置：
	 * @param roleId 
	 */
	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	/**
	 * 获取：
	 * @return Long
	 */
	public Long getRoleId() {
		return roleId;
	}

	/**\
	 * 父角色名称
	 * @return
	 */
	public String getRoleParentName() {
		return roleParentName;
	}

	public void setRoleParentName(String roleParentName) {
		this.roleParentName = roleParentName;
	}

	/**

	 * 设置：角色父ID
	 * @param roleParentId
	 */
	public void setRoleParentId(Long roleParentId) {
		this.roleParentId = roleParentId;
	}

	/**
	 * 获取：角色父ID
	 * @return Long
	 */
	public Long getRoleParentId() {
		return roleParentId;
	}

	/**
	 * 设置：角色类型
	 * @param roleType 角色类型
	 */
	public void setRoleType(String roleType) {
		this.roleType = roleType;
	}

	/**
	 * 获取：角色类型
	 * @return String
	 */
	public String getRoleType() {
		return roleType;
	}

	/**
	 * 设置：角色图标
	 * @param roleIcon 角色图标
	 */
	public void setRoleIcon(String roleIcon) {
		this.roleIcon = roleIcon;
	}

	/**
	 * 获取：角色图标
	 * @return String
	 */
	public String getRoleIcon() {
		return roleIcon;
	}

	/**
	 * 设置：角色排序
	 * @param roleSeq 角色排序
	 */
	public void setRoleSeq(Long roleSeq) {
		this.roleSeq = roleSeq;
	}

	/**
	 * 获取：角色图标
	 * @return String
	 */
	public Long getRoleSeq() {
		return roleSeq;
	}
	
	/**
	 * 设置：角色名称
	 * @param roleName 角色名称
	 */
	public void setRoleName(String roleName) {
		this.roleName = roleName ==null?"":roleName.trim();
	}

	/**
	 * 获取：角色名称
	 * @return String
	 */
	public String getRoleName() {
		return roleName;
	}
	
	/**
	 * 设置：备注
	 * @param remark 备注
	 */
	public void setRemark(String remark) {
		this.remark = remark ==null?"":remark.trim();
	}

	/**
	 * 获取：备注
	 * @return String
	 */
	public String getRemark() {
		return remark;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
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

	/**
	 * 设置：name
	 */
	public void setname(String name) {
		this.name = name;
	}
	/**
	 * 获取：name
	 */
	public String getname() {
		return name;
	}

	/**
	 * 设置：open
	 */
	public void setopen(Boolean open) {
		this.open = open;
	}
	/**
	 * 获取：open
	 */
	public Boolean  getopen() {
		return open;
	}

	/**
	 * 设置：icon
	 */
	public void seticon(String icon) {
		this.icon = icon;
	}
	/**
	 * 获取：icon
	 */
	public String  geticon() {
		return icon;
	}

	/**
	 * 设置：iconOpen
	 */
	public void seticonOpen(String iconOpen) {
		this.iconOpen = iconOpen;
	}
	/**
	 * 获取：iconOpen
	 */
	public String  geticonOpen() {
		return iconOpen;
	}

	/**
	 * 设置：iconClose
	 */
	public void seticonClose(String iconClose) {
		this.iconClose = iconClose;
	}
	/**
	 * 获取：iconClose
	 */
	public String  geticonClose() {
		return iconClose;
	}

	/**
	 * 设置：checked
	 */
	public void setchecked(Boolean checked) {
		this.checked = checked;
	}
	/**
	 * 获取：checked
	 */
	public Boolean  getchecked() {
		return checked;
	}
	
}
