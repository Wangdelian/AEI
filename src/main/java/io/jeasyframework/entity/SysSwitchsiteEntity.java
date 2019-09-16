/*******************************************************
 *Copyright (c) 2018 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.entity
 *文件名：  SysSwitchsiteEntity
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2018-03-16 09:59
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2018-03-16 09:59
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.entity;
import java.io.Serializable;

public class SysSwitchsiteEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    //$column.comments
    private Long switchsiteId;
    //$column.comments
    private String switchsitecode;
    //$column.comments
    private String switchsitename;
    //$column.comments
    private String siteurl;
    //$column.comments
    private String loginName;
    //$column.comments
    private String loginPassword;
    //$column.comments
    private String dbkey;
    /**
     * 设置：${column.comments}
     */
    public void setSwitchsiteId(Long switchsiteId) {
        this.switchsiteId = switchsiteId;
    }
    /**
     * 获取：${column.comments}
     */
    public Long getSwitchsiteId() {
        return switchsiteId;
    }
    /**
     * 设置：${column.comments}
     */
    public void setSwitchsitecode(String switchsitecode) {
        this.switchsitecode = switchsitecode;
    }
    /**
     * 获取：${column.comments}
     */
    public String getSwitchsitecode() {
        return switchsitecode;
    }
    /**
     * 设置：${column.comments}
     */
    public void setSwitchsitename(String switchsitename) {
        this.switchsitename = switchsitename;
    }
    /**
     * 获取：${column.comments}
     */
    public String getSwitchsitename() {
        return switchsitename;
    }
    /**
     * 设置：${column.comments}
     */
    public void setSiteurl(String siteurl) {
        this.siteurl = siteurl;
    }
    /**
     * 获取：${column.comments}
     */
    public String getSiteurl() {
        return siteurl;
    }
    /**
     * 设置：${column.comments}
     */
    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }
    /**
     * 获取：${column.comments}
     */
    public String getLoginName() {
        return loginName;
    }
    /**
     * 设置：${column.comments}
     */
    public void setLoginPassword(String loginPassword) {
        this.loginPassword = loginPassword;
    }
    /**
     * 获取：${column.comments}
     */
    public String getLoginPassword() {
        return loginPassword;
    }
    /**
     * 获取：${column.comments}
     */
    public String getDbkey() {
        return dbkey;
    }

}
