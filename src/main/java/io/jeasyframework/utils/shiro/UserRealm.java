package io.jeasyframework.utils.shiro;

import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.entity.SysMenuEntity;
import io.jeasyframework.entity.SysUserEntity;
import io.jeasyframework.service.SysMenuService;
import io.jeasyframework.service.SysUserService;
import io.jeasyframework.utils.DateUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Set;

import static io.jeasyframework.utils.MD5Util.md5;

/**
 * 认证
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年11月10日 上午11:55:49
 */
@Component
public class UserRealm extends AuthorizingRealm {
	@Autowired
	private SiteConfig siteConfig;
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysMenuService sysMenuService;
    
    /**
     * 授权(验证权限时调用)
     */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		SysUserEntity user = (SysUserEntity)principals.getPrimaryPrincipal();
		Long userId = user.getUserId();

		//用户权限列表
		Set<String> permsSet = sysMenuService.getUserPermissions(userId);

		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		info.setStringPermissions(permsSet);
		return info;
	}

	/**
	 * 认证(登录时调用)
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken token) throws AuthenticationException {
		String username = (String) token.getPrincipal();
        String password = new String((char[]) token.getCredentials());
        
        //查询用户信息
        SysUserEntity user = sysUserService.queryByUserName(username);

        //账号不存在
        if(user == null) {
            throw new UnknownAccountException("用户名或密码错误!");
        }

        //错误次数过多，用户锁定
		if(user.getDateFail()!=null){
			Date beforeDate = new Date(new Date() .getTime() - Integer.parseInt(siteConfig.getLockTime())*60*1000);
			if(user.getDateFail().after(beforeDate)){
				throw new IncorrectCredentialsException("密码错误次数过多，账号将锁定"+siteConfig.getLockTime()+"分钟!");
			}
		}

        //密码错误,增加登录失败次数，达到5次将锁定用户5分钟
        if(!password.equals(user.getPassword())) {
        	//增加密码错误次数
        	if(user.getFailTimes()!=null && user.getFailTimes()<Integer.parseInt(siteConfig.getMaxFailTimes())-1){
        		user.setFailTimes(user.getFailTimes()+1);
				sysUserService.updateFailTimes(user);
			}
        	//锁定用户，密码错误次数变0
        	else{
				sysUserService.updateDateFail(user);
			}
            throw new IncorrectCredentialsException("用户名或密码错误!");
        }

		//账号禁用
		if(user.getStatus() == 0){
			throw new LockedAccountException("账号已被禁用,请联系管理员");
		}

        //获取用户目录权限
		List<Long> menuIdList = sysUserService.queryAllMenuId(user.getUserId());
		List<SysMenuEntity> menuEntities=sysMenuService.queryUserList(user.getUserId());
		if(menuEntities!=null){
			for(int i=0;i<menuEntities.size();i++){
				if(menuEntities.get(i).getUrl().equals(user.getUserextvalue4())){
					user.setMenuid((menuEntities.get(i).getMenuId()));
					break;
				}
			}
		}
		user.setsysMenuList(menuEntities);
		user.setMenuIdList(menuIdList);
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(user, password, getName());
        user.setFailTimes(0);
		sysUserService.updateFailTimes(user);
        return info;
	}

}
