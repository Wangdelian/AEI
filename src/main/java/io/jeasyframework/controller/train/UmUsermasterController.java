package io.jeasyframework.controller.train;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.entity.SysSwitchsiteEntity;
import io.jeasyframework.service.SysSwitchsiteService;
import io.jeasyframework.service.SysUserTokenService;
import io.jeasyframework.utils.*;
import io.jeasyframework.utils.encrypt.EncryUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import io.jeasyframework.entity.UmUsermasterEntity;
import io.jeasyframework.service.UmUsermasterService;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * ${comments}
 * 
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-11-07 09:41:06
 */
@RestController
@RequestMapping("/generator/umusermaster")
public class UmUsermasterController {
	@Autowired
	private UmUsermasterService umUsermasterService;
	@Autowired
	private SysSwitchsiteService sysSwitchsiteService;
	@Autowired
	private SiteConfig siteConfig;
	@Autowired
	private SysUserTokenService sysUserTokenService;



	@RequestMapping("/login")
	public ModelAndView nav(HttpServletRequest req) {
		ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/login","");
		ModelAndView view=mf.CreateModelAndView();
		return view;
	}


	@ResponseBody
	@RequestMapping(value = "/sys/login", method = RequestMethod.POST)
	public R login(HttpServletRequest _req, String username, String password, String captcha, String sitecode)throws IOException {
		System.out.println("用户名密码："+username+"---"+password);
		//String kaptcha = ShiroUtils.getKaptcha(Constants.KAPTCHA_SESSION_KEY);
		//if(false){
		//	return R.error("验证码不正确");
		//}
		if (sitecode==null)
		{
			sitecode="1";
		}
		if (sitecode.equals(""))
		{
			sitecode="1";
		}
		String siteurl=_req.getContextPath();
		if (siteurl.equals("/H1MQS"))
		{sitecode="1";}
		else if (siteurl.equals("/H2MQS"))
		{sitecode="2";}
		else if (siteurl.equals("/H3MQS"))
		{sitecode="3";}
		else if (siteurl.equals("/H4MQS"))
		{sitecode="4";}
		else if (siteurl.equals("/EA3MQS"))
		{sitecode="5";}
		else
		{sitecode="1";}
		if(false){
			return R.error("验证码不正确");
		}
		try{
			Subject subject = ShiroUtils.getSubject();
			//logintoken处理
			Date day=new Date();
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String LoginToken= EncryUtil.encrypt(username+"|"+password+"|"+df.format(day));
			ShiroUtils.setSessionAttribute("logintoken",LoginToken);
			//默认sse对象
			SysSwitchsiteEntity sse=sysSwitchsiteService.queryObject(Long.valueOf(sitecode));
			//存储系统切换对象
			ShiroUtils.setSessionAttribute("sse",sse);
			//sha256加密
			password = new Sha256Hash(password).toHex();
			UsernamePasswordToken token = new UsernamePasswordToken(username, password);
			subject.login(token);
		}catch (UnknownAccountException e) {
			return R.error(e.getMessage());
		}catch (IncorrectCredentialsException e) {
			return R.error(e.getMessage());
		}catch (LockedAccountException e) {
			return R.error(e.getMessage());
		}catch (AuthenticationException e) {
			return R.error("账户验证失败");
		}

		return R.ok();
	}


	@ResponseBody
	@RequestMapping(value = "/sys/tokenlogin", method = RequestMethod.GET)
	public void tokenlogin(HttpServletResponse req, String logintoken, String sitecode)
	{
		//logintoken="5dd98e3e29802c824f417b26575a872e";
		logintoken=EncryUtil.decrypt(logintoken);
		SysSwitchsiteEntity sse=sysSwitchsiteService.queryObject(Long.valueOf(sitecode));
		String[] aryLogin=logintoken.split("\\|");
		String loginname=aryLogin[0];
		String pwd=aryLogin[1];
		Date day=new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String LoginToken= EncryUtil.encrypt(loginname+"|"+pwd+"|"+df.format(day));
		ShiroUtils.setSessionAttribute("logintoken",LoginToken);
		//存储系统切换对象
		ShiroUtils.setSessionAttribute("sse",sse);
		try{
			Subject subject = ShiroUtils.getSubject();

			//sha256加密
			String password = new Sha256Hash(pwd).toHex();
			UsernamePasswordToken token = new UsernamePasswordToken(loginname, password);
			subject.login(token);
		}catch (UnknownAccountException e) {
			return ;
		}catch (IncorrectCredentialsException e) {
			return ;
		}catch (LockedAccountException e) {
			return  ;
		}catch (AuthenticationException e) {
			return  ;
		}
		//Subject subject = ShiroUtils.getSubject();
		//ShiroUtils.setSessionAttribute("pline","H3");
		//subject.login(token);
		try {
			//req.sendRedirect("/sys/user/searchlist");
			req.sendRedirect(sse.getSiteurl());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return ;
	}

	@RequestMapping(value = "/queryUsername", method = RequestMethod.POST)
	public R queryUsername(@RequestBody Map<String, Object> condition) {
		String username = condition.get("username").toString();
		UmUsermasterEntity umUsermasterEntity = umUsermasterService.queryByUserName(username);
		return R.ok().put("umUsermasterEntity", umUsermasterEntity);
	}



	@RequestMapping(value = "/sys/logout", method = RequestMethod.GET)
	public String logoutv2() {
		UmUsermasterEntity user =(UmUsermasterEntity) SecurityUtils.getSubject().getPrincipal();
		sysUserTokenService.logout(user.getUserid());
		return "redirect:/login";
		//return R.ok();
	}

	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<UmUsermasterEntity> umUsermasterList = umUsermasterService.queryList(query);
		int total = umUsermasterService.queryTotal(query);
		
		PageUtils pageUtil = new PageUtils(umUsermasterList, total, query.getLimit(), query.getPage());
		
		return R.ok().put("page", pageUtil);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{userid}")
	public R info(@PathVariable("userid") String userid){
		UmUsermasterEntity umUsermaster = umUsermasterService.queryObject(userid);
		
		return R.ok().put("umUsermaster", umUsermaster);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("generator:umusermaster:save")
	public R save(@RequestBody UmUsermasterEntity umUsermaster){
		umUsermasterService.save(umUsermaster);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("generator:umusermaster:update")
	public R update(@RequestBody UmUsermasterEntity umUsermaster){
		umUsermasterService.update(umUsermaster);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("generator:umusermaster:delete")
	public R delete(@RequestBody String[] userids){
		umUsermasterService.deleteBatch(userids);
		
		return R.ok();
	}
	
}
