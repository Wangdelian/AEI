/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.entity
 *文件名：  LayUINavChildren 
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017/08/01 09:43
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017/08/01 09:43
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.entity;

public class LayUINavChildren {
    /**
     * 菜单名称
     */
    private String title;

    /**
     * 菜单图标
     */
    private String ico;

    /**
     * 菜单链接
     */
    private String href;

    /**
     * 是否选中
     */
    private String isSelected;

    /**
     * 获取菜单标题
     * @return 返回String
     */
    public String getTitle() {
        return title;
    }

    /**
     * 设置菜单标题
     * @param title
     */
    public void setTitle(String title)
    {
        this.title=title;
    }

    /**
     * 获取菜单图标
     * @return 返回String
     */
    public String getIco()
    {
        return this.ico;
    }

    /**
     * 设置菜单图标
     * @param ico
     */
    public void setIco(String ico)
    {
        this.ico=ico;
    }

    /**
     * 获取菜单链接
     * @return 返回String
     */
    public String getHref()
    {
        return this.href;
    }

    /**
     * 设置菜单链接
     * @param href
     */
    public void setHref(String href)
    {
        this.href=href;
    }

    /**
     * 获取是否选中标识
     * @return 返回String
     */
    public String getIsSelected()
    {
        return this.isSelected;
    }

    /**
     * 设置是否选中标识
     * @param isSelected
     */
    public void setIsSelected(String isSelected)
    {
        this.isSelected=isSelected;
    }
}
