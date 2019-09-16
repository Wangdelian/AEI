/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.config
 *文件名：  SiteConfig 
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017/06/20 16:26
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017/06/20 16:26
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import lombok.Data;

/**
 * Created by daixirui on 2017/6/20.
 */
@Data
@Component
@ConfigurationProperties(prefix = "web.config")
public class SiteConfig {
    private String webTitle;
    private String authorName;
    private String authorUrl;
    private int pagesize;
    private String version;
    private String config01;
    private String config02;
    private String config03;
    private String mileage;
    private String passwordExpireTime;
    private String maxFailTimes;
    private String lockTime;


    public String getWebTitle() {
        return webTitle;
    }

    public int getPagesize() {
        return pagesize;
    }

    public String getAuthorUrl() {
        return authorUrl;
    }

    public String getAuthorName() {
        return authorName;
    }

    public String getVersion() {
        return version;
    }

    public String getConfig01() {
        return config01;
    }

    public void setConfig01(String config01) {
        this.config01 = config01;
    }

    public String getConfig02() {
        return config02;
    }

    public void setConfig02(String config02) {
        this.config02 = config02;
    }

    public String getConfig03() {
        return config03;
    }

    public void setConfig03(String config03) {
        this.config03 = config03;
    }

    public String getMileage() {
        return mileage;
    }

    public void setMileage(String mileage) {
        this.mileage = mileage;
    }

    public String getLockTime() {
        return lockTime;
    }

    public void setLockTime(String lockTime) {
        this.lockTime = lockTime;
    }

    public String getMaxFailTimes() {
        return maxFailTimes;
    }

    public void setMaxFailTimes(String maxFailTimes) {
        this.maxFailTimes = maxFailTimes;
    }

    public String getPasswordExpireTime() {
        return passwordExpireTime;
    }

    public void setPasswordExpireTime(String passwordExpireTime) {
        this.passwordExpireTime = passwordExpireTime;
    }
}
