/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.entity
 *文件名：  ODGroupCheckEntity
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017-08-31 14:42
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017-08-31 14:42
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.entity;
import java.util.Date;
public class ODGroupCheckEntity {
    private Short fId;

    private Object fStationname;

    private Object fPartcode;

    private Date fTime;

    private Object fObjectivecycle;

    private Object fRealitycycle;

    private Object fOkng;

    private Object fLineid;

    public Short getfId() {
        return fId;
    }

    public void setfId(Short fId) {
        this.fId = fId;
    }

    public Object getfStationname() {
        return fStationname;
    }

    public void setfStationname(Object fStationname) {
        this.fStationname = fStationname;
    }

    public Object getfPartcode() {
        return fPartcode;
    }

    public void setfPartcode(Object fPartcode) {
        this.fPartcode = fPartcode;
    }

    public Date getfTime() {
        return fTime;
    }

    public void setfTime(Date fTime) {
        this.fTime = fTime;
    }

    public Object getfObjectivecycle() {
        return fObjectivecycle;
    }

    public void setfObjectivecycle(Object fObjectivecycle) {
        this.fObjectivecycle = fObjectivecycle;
    }

    public Object getfRealitycycle() {
        return fRealitycycle;
    }

    public void setfRealitycycle(Object fRealitycycle) {
        this.fRealitycycle = fRealitycycle;
    }

    public Object getfOkng() {
        return fOkng;
    }

    public void setfOkng(Object fOkng) {
        this.fOkng = fOkng;
    }

    public Object getfLineid() {
        return fLineid;
    }

    public void setfLineid(Object fLineid) {
        this.fLineid = fLineid;
    }
}
