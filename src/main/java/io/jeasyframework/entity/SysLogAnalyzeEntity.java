package io.jeasyframework.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 系统日志分析
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017-03-08 10:40:56
 */
public class SysLogAnalyzeEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	//登录名
	private String username;

	//用户名称
	private String chineseName;

	//用户操作
	private String success;

	//操作类型
	private String fail;

	public void setUsername(String username) {
		this.username = username;
	}

	public void setChineseName(String chineseName) {
		this.chineseName = chineseName;
	}

	public void setSuccess(String success) {
		this.success = success;
	}

	public void setFail(String fail) {
		this.fail = fail;
	}

	public String getUsername() {
		return username;
	}

	public String getChineseName() {
		return chineseName;
	}

	public String getSuccess() {
		return success;
	}

	public String getFail() {
		return fail;
	}
}
