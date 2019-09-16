/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.entity
 *文件名：  LayUINavEntity 
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2017/08/01 09:38
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2017/08/01 09:38
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.entity;

import java.util.List;

public class LayUINavEntity {
    /**
     * 菜单名称
     */
    private String title;

    /**
     * 菜单图标
     */
    private String ico;

    /**
     * 是否展开（true表示展开，false表示折叠）
     */
    private String spread;

    /**
     * 字菜单集合
     */
    private List<LayUINavChildren> children;

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
     * 获取是否展开标识
     * @return 返回String
     */
    public String getSpread()
    {
        return this.spread;
    }

    /**
     * 设置是否展开标识
     * @param spread
     */
    public void setSpread(String spread)
    {
        this.spread=spread;
    }

    /**
     * 获取子菜单列表
     * @return 返回List<LayUINavChildren>
     */
    public List<LayUINavChildren> getChildren()
    {
        return this.children;
    }

    /**
     * 设置子菜单列表
     * @param children
     */
    public void setChildren(List<LayUINavChildren> children)
    {
        this.children=children;
    }
}
