package io.jeasyframework.controller;

import io.jeasyframework.entity.SysSwitchsiteEntity;
import io.jeasyframework.entity.SysUserEntity;
import io.jeasyframework.utils.ShiroUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

/**
 * Controller公共组件
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年11月9日 下午9:42:26
 */
public abstract class AbstractController {
	protected Logger logger = LoggerFactory.getLogger(getClass());

	protected SysUserEntity getUser() {
		return ShiroUtils.getUserEntity();
	}

	protected Long getUserId() {
		return getUser().getUserId();
	}

	protected boolean isOwnerToken(Long token)
	{
		SysUserEntity user=this.getUser();
		List<Long> menuIdList=user.getMenuIdList();
		if (menuIdList==null)
		{
			return false;
		}
		if (menuIdList.size()>0)
		{
			for (int i=0;i<menuIdList.size();i++)
			{
				if (menuIdList.get(i)==token)
				{
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 获取用户语言代码
	 * @return String 语言代码
	 */
	protected String getUserLangCode()  {
		return getUser().getSkin();
	}

	/**
	 * 获取用户皮肤Skin
	 * @return String 皮肤
	 */
	protected String getUserSkin()  {
		return getUser().getSkin();
	}

	/**
	 * 获取当前选中生产线信息
	 * @return
	 */
	protected String getCurProductLine()
	{
		return String.valueOf(ShiroUtils.getSessionAttribute("pline"));
	}

	/**
	 * 设置/切换生产线
	 * @param pline 生产线名称
	 */
	protected void setCurProductLine(String pline)
	{
		ShiroUtils.setSessionAttribute("pline",pline);
	}

	protected String getLoginToken()
	{
		return String.valueOf(ShiroUtils.getSessionAttribute("logintoken"));
	}

	/**
	 * 获取当前切换系统对象
	 * @return
	 */
	protected SysSwitchsiteEntity getCurSwitchSite()
	{
		return (SysSwitchsiteEntity)ShiroUtils.getSessionAttribute("sse");
	}
}
