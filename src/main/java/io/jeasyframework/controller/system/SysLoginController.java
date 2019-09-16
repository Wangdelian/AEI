package io.jeasyframework.controller.system;

import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.entity.*;
import io.jeasyframework.service.SysLogService;
import io.jeasyframework.service.SysSwitchsiteService;
import io.jeasyframework.service.SysUserService;
import io.jeasyframework.service.SysUserTokenService;
import io.jeasyframework.utils.DateUtils;
import io.jeasyframework.utils.ModelAndViewFactory;
import io.jeasyframework.utils.R;
import io.jeasyframework.utils.ShiroUtils;
import io.jeasyframework.utils.annotation.SysLog;
import io.jeasyframework.utils.encrypt.EncryUtil;
import io.jeasyframework.utils.oauth2.TokenGenerator;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import static io.jeasyframework.utils.MD5Util.md5;
import static io.jeasyframework.utils.aop.SysLogAspect.makeLog;

/**
 * 登录相关
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年11月10日 下午1:15:31
 */
@Controller
public class SysLoginController {
	@Autowired
	private Producer producer;
	@Autowired
	private SiteConfig siteConfig;
	@Autowired
	private SysUserService sysUserService;
	@Autowired
	private SysUserTokenService sysUserTokenService;
	@Autowired
	private SysSwitchsiteService sysSwitchsiteService;
	@Autowired
	private SysLogService sysLogService;



	@RequestMapping("captcha.jpg")
	public void captcha(HttpServletResponse response)throws ServletException, IOException {
		response.setHeader("Cache-Control", "no-store, no-cache");
		response.setContentType("image/jpeg");

		//生成文字验证码
		String text = producer.createText();
		//生成图片验证码
		BufferedImage image = producer.createImage(text);

		//保存到shiro session
		ShiroUtils.setSessionAttribute(Constants.KAPTCHA_SESSION_KEY, text);
		ServletOutputStream out = response.getOutputStream();
		ImageIO.write(image, "jpg", out);
		out.flush();
	}

	@RequestMapping("/login")
	public ModelAndView nav(HttpServletRequest req,String userName, String password) {

		ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/login","");
		ModelAndView view=mf.CreateModelAndView();
		
			view.addObject("autoName",userName);
			view.addObject("autoPwd",password);


		return view;
	}

	/**
	 * 从浏览器登进来就转到登陆界面
	 * @param req
	 * @return
	 */
	@RequestMapping(value="/sys/homepage/main",method = RequestMethod.GET)
	public String mainUrl(HttpServletRequest req) {

		return "redirect:/login";
	}

	/**
	 * 从浏览器登进来就转到登陆界面
	 * @param req
	 * @return
	 */
	@RequestMapping(value="/",method = RequestMethod.GET)
	public String mainUrlNull(HttpServletRequest req) {

		return "redirect:/login";
	}

	/**
	 * userRealm版本
	 */
	@SysLog(value = "用户登录",type = "登入")
	@ResponseBody
	@RequestMapping(value = "/sys/login", method = RequestMethod.POST)
	public R login(HttpServletRequest _req,String username, String password, String captcha,String sitecode)throws IOException {
		SysLogEntity sysLog = makeLog("用户登录","登入",password,true);
		sysLog.setUsername(username);
		String chinesName = "";

		//密码是否过期,0未过期
		String expired = "0";
		//String kaptcha = ShiroUtils.getKaptcha(Constants.KAPTCHA_SESSION_KEY);
		/*if(!kaptcha.equals(captcha)){
			return R.error("验证码不正确");
		}*/
		if(false){
			//保存系统日志
			sysLog.setResult("失败");
			sysLogService.save(sysLog);
			return R.error("验证码不正确");
		}
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
		try{
			//查询该用户的状态 ，status为0就表示禁用 ，不能登录
			SysUserEntity user = sysUserService.queryByUserName(username);
			if(user!=null){
				chinesName = user.getChineseName();
			}
			sysLog.setChineseName(chinesName);

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
			//password = new Sha256Hash(password).toHex();
			UsernamePasswordToken token = new UsernamePasswordToken(username, password);

			//判断密码是否超过三个月
			if(user.getDatePassword()!=null){
				if(user.getDatePassword().before(DateUtils.getBackMonthDate(new Date(),Integer.parseInt(siteConfig.getPasswordExpireTime())))){
					expired = "1";
				}
			}else{
				//密码更新日期为空，设置当前时间为密码更新时间
				sysUserService.updateDatePassword(user);
			}

			Integer userStatus = user.getStatus();
			int status = userStatus.intValue();
			//System.out.println("==================状态："+userStatus);
			if(status==1) {
				subject.login(token);
			}else{
				//保存系统日志
				sysLog.setResult("失败");
				sysLogService.save(sysLog);
				return R.error("此账号为禁用状态，请联系管理员！");
			}

		}catch (UnknownAccountException e) {
			//保存系统日志
			sysLog.setResult("失败");
			sysLogService.save(sysLog);
			return R.error(e.getMessage());
		}catch (IncorrectCredentialsException e) {
			//保存系统日志
			sysLog.setResult("失败");
			sysLogService.save(sysLog);
			return R.error(e.getMessage());
		}catch (LockedAccountException e) {
			//保存系统日志
			sysLog.setResult("失败");
			sysLogService.save(sysLog);
			return R.error(e.getMessage());
		}catch (NullPointerException e) {
			//保存系统日志
			sysLog.setResult("失败");
			sysLogService.save(sysLog);
			return R.error("用户名或密码错误!");
		}
		catch (AuthenticationException e) {
			//保存系统日志
			sysLog.setResult("失败");
			sysLogService.save(sysLog);
			return R.error("账户验证失败");
		}
		sysUserService.updateLoginCount(username,password);

		//判断是否为默认密码，是则需要进入密码修改页面
		if(md5("123456").equals(password)){
			expired = "1";
		}

		//保存系统日志
		sysLog.setResult("成功");
		sysLogService.save(sysLog);
		return R.ok().put("expired",expired);
	}

	@ResponseBody
	@RequestMapping(value = "/sys/tokenlogin", method = RequestMethod.GET)
	public void tokenlogin(HttpServletResponse req,String logintoken, String sitecode)
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

	/*@RequestMapping(value = "logout", method = RequestMethod.GET)
	public String logout() {
		ShiroUtils.logout();
		return "redirect:login.html";
	}*/

	/**OAuth2Realm版本**/

/*	@ResponseBody
    @RequestMapping(value = "/sys/login", method = RequestMethod.POST)
	public R loginv2(String username, String password, String captcha,HttpServletRequest req)throws IOException {
		String kaptcha = ShiroUtils.getKaptcha(Constants.KAPTCHA_SESSION_KEY);
		if(*//*!captcha.equalsIgnoreCase(kaptcha)*//*false){
			return R.error("验证码不正确");
		}

		//用户信息
		SysUserEntity user = sysUserService.queryByUserName("admin");

		//账号不存在、密码错误
		if(user == null || !user.getPassword().equals(new Sha256Hash("admin", user.getSalt()).toHex())) {
			return R.error("账号或密码不正确");
		}

		//账号锁定
		if(user.getStatus() == 0){
			return R.error("账号已被锁定,请联系管理员");
		}

		//生成token，并保存到数据库
		R r = sysUserTokenService.createToken(user.getUserId());
		//查询token实体
		SysUserTokenEntity tokenEntity = sysUserTokenService.queryByUserId(user.getUserId());
		//将token写入session
		//req.getSession().setAttribute("token",tokenEntity.getToken());
		ShiroUtils.setSessionAttribute("token",tokenEntity.getToken());
		return R.ok(r);
	}*/


	@SysLog(value = "用户退出登录",type = "登出")
	@RequestMapping(value = "/sys/logout", method = RequestMethod.GET)
	public String logoutv2() {
		SysUserEntity user =(SysUserEntity) SecurityUtils.getSubject().getPrincipal();
		sysUserTokenService.logout(user.getUserId());
		ShiroUtils.logout();
		return "redirect:/login";
		//return R.ok();
	}



}
