package io.jeasyframework.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2019-03-25 11:35:25
 */
public class ChReconditionEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//关键字
	private Long fId;
	//组织机构ID
	private String levelmarkid;
	//检修地点
	private Object fReconditionsite;
	//设备名称
	private Object fDevicename;
	//设备ID
	private Object fDeviceId;
	//检修类型
	private Object fReconditiontype;
	//检修时间
	private Object fReconditiontime;
	//检修部位
	private Object fReconditionpart;
	//检修状态
	private Object fReconditionstatus;
	//处理内容
	private Object fDisposecontent;
	//处理结果
	private Object fDisposeresult;
	//记录人员
	private Object fRecordpersonnel;
	//记录时间
	private Object fRecordtime;
	//备注
	private Object fRemark;
	//备用字段1 0为有效，1为已删除
	private Object fReserve1;
	//备用字段2
	private Object fReserve2;
	//备用字段3
	private Object fReserve3;
	//备用字段4
	private Object fReserve4;
	//备用字段5
	private Object fReserve5;

	/**
	 * 设置：关键字
	 */
	public void setFId(Long fId) {
		this.fId = fId;
	}
	/**
	 * 获取：关键字
	 */
	public Long getFId() {
		return fId;
	}
	/**
	 * 设置：
	 */
	public void setLevelmarkid(String levelmarkid) {
		this.levelmarkid = levelmarkid;
	}
	/**
	 * 获取
	 */
	public String getLevelmarkid() {
		return levelmarkid;
	}
	/**
	 * 设置：检修地点
	 */
	public void setFReconditionsite(Object fReconditionsite) {
		this.fReconditionsite = fReconditionsite;
	}
	/**
	 * 获取：检修地点
	 */
	public Object getFReconditionsite() {
		return fReconditionsite;
	}
	/**
	 * 设置：设备名称
	 */
	public void setFDeviceId(Object fDeviceId) {
		this.fDeviceId = fDeviceId;
	}
	/**
	 * 获取：设备名称
	 */
	public Object getFDeviceId() {
		return fDeviceId;
	}
	/**
	 * 设置：设备名称
	 */
	public void setFDevicename(Object fDevicename) {
		this.fDevicename = fDevicename;
	}
	/**
	 * 获取：设备名称
	 */
	public Object getFDevicename() {
		return fDevicename;
	}
	/**
	 * 设置：检修类型
	 */
	public void setFReconditiontype(Object fReconditiontype) {
		this.fReconditiontype = fReconditiontype;
	}
	/**
	 * 获取：检修类型
	 */
	public Object getFReconditiontype() {
		return fReconditiontype;
	}
	/**
	 * 设置：检修时间
	 */
	public void setFReconditiontime(Object fReconditiontime) {
		this.fReconditiontime = fReconditiontime;
	}
	/**
	 * 获取：检修时间
	 */
	public Object getFReconditiontime() {
		return fReconditiontime;
	}
	/**
	 * 设置：检修部位
	 */
	public void setFReconditionpart(Object fReconditionpart) {
		this.fReconditionpart = fReconditionpart;
	}
	/**
	 * 获取：检修部位
	 */
	public Object getFReconditionpart() {
		return fReconditionpart;
	}
	/**
	 * 设置：检修状态
	 */
	public void setFReconditionstatus(Object fReconditionstatus) {
		this.fReconditionstatus = fReconditionstatus;
	}
	/**
	 * 获取：检修状态
	 */
	public Object getFReconditionstatus() {
		return fReconditionstatus;
	}
	/**
	 * 设置：处理内容
	 */
	public void setFDisposecontent(Object fDisposecontent) {
		this.fDisposecontent = fDisposecontent==null?"":fDisposecontent.toString().trim();
	}
	/**
	 * 获取：处理内容
	 */
	public Object getFDisposecontent() {
		return fDisposecontent;
	}
	/**
	 * 设置：处理结果
	 */
	public void setFDisposeresult(Object fDisposeresult) {
		this.fDisposeresult = fDisposeresult ==null?"":fDisposeresult.toString().trim();
	}
	/**
	 * 获取：处理结果
	 */
	public Object getFDisposeresult() {
		return fDisposeresult;
	}
	/**
	 * 设置：记录人员
	 */
	public void setFRecordpersonnel(Object fRecordpersonnel) {
		this.fRecordpersonnel = fRecordpersonnel ==null?"":fRecordpersonnel.toString().trim();
	}
	/**
	 * 获取：记录人员
	 */
	public Object getFRecordpersonnel() {
		return fRecordpersonnel;
	}
	/**
	 * 设置：记录时间
	 */
	public void setFRecordtime(Object fRecordtime) {
		this.fRecordtime = fRecordtime;
	}
	/**
	 * 获取：记录时间
	 */
	public Object getFRecordtime() {
		return fRecordtime;
	}
	/**
	 * 设置：备注
	 */
	public void setFRemark(Object fRemark) {
		this.fRemark = fRemark ==null?"":fRemark.toString().trim();
	}
	/**
	 * 获取：备注
	 */
	public Object getFRemark() {
		return fRemark;
	}
	/**
	 * 设置：备用字段1
	 */
	public void setFReserve1(Object fReserve1) {
		this.fReserve1 = fReserve1;
	}
	/**
	 * 获取：备用字段1
	 */
	public Object getFReserve1() {
		return fReserve1;
	}
	/**
	 * 设置：备用字段2
	 */
	public void setFReserve2(Object fReserve2) {
		this.fReserve2 = fReserve2;
	}
	/**
	 * 获取：备用字段2
	 */
	public Object getFReserve2() {
		return fReserve2;
	}
	/**
	 * 设置：备用字段3
	 */
	public void setFReserve3(Object fReserve3) {
		this.fReserve3 = fReserve3;
	}
	/**
	 * 获取：备用字段3
	 */
	public Object getFReserve3() {
		return fReserve3;
	}
	/**
	 * 设置：备用字段4
	 */
	public void setFReserve4(Object fReserve4) {
		this.fReserve4 = fReserve4;
	}
	/**
	 * 获取：备用字段4
	 */
	public Object getFReserve4() {
		return fReserve4;
	}
	/**
	 * 设置：备用字段5
	 */
	public void setFReserve5(Object fReserve5) {
		this.fReserve5 = fReserve5;
	}
	/**
	 * 获取：备用字段5
	 */
	public Object getFReserve5() {
		return fReserve5;
	}
}
