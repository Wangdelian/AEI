package io.jeasyframework.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2019-07-10 09:08:52
 */
public class SysUserPasswordEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//$column.comments
	private Object id;
	//$column.comments
	private Long userId;
	//$column.comments
	private Object password;
	//$column.comments
	private Object createTime;

	/**
	 * 设置：${column.comments}
	 */
	public void setId(Object id) {
		this.id = id;
	}
	/**
	 * 获取：${column.comments}
	 */
	public Object getId() {
		return id;
	}
	/**
	 * 设置：${column.comments}
	 */
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	/**
	 * 获取：${column.comments}
	 */
	public Long getUserId() {
		return userId;
	}
	/**
	 * 设置：${column.comments}
	 */
	public void setPassword(Object password) {
		this.password = password;
	}
	/**
	 * 获取：${column.comments}
	 */
	public Object getPassword() {
		return password;
	}
	/**
	 * 设置：${column.comments}
	 */
	public void setCreateTime(Object createTime) {
		this.createTime = createTime;
	}
	/**
	 * 获取：${column.comments}
	 */
	public Object getCreateTime() {
		return createTime;
	}
}
