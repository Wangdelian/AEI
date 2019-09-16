package io.jeasyframework.controller.system;
import com.github.pagehelper.PageHelper;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.entity.ScheduleJobEntity;
import io.jeasyframework.service.ScheduleJobLogService;
import io.jeasyframework.service.ScheduleJobService;
import io.jeasyframework.task.*;
import io.jeasyframework.utils.*;
import io.jeasyframework.utils.annotation.SysLog;
import io.jeasyframework.utils.validator.ValidatorUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

/**
 * 定时任务
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年11月28日 下午2:16:40
 */
@RestController
@RequestMapping("/sys/schedule")
public class ScheduleJobController {
	@Autowired
	private ScheduleJobService scheduleJobService;
	@Autowired
	private SiteConfig siteConfig;
	@Autowired
	private TestTask testTask;
 	/**
	 * 初始化定时任务列表
	 */
	@RequestMapping("/searchlist")
	public ModelAndView searchlist(HttpServletRequest req) {
		String webTitle=siteConfig.getWebTitle();
		ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/SyetemMgr/scheduleJobList","");
		//ModelAndView view=mf.CreateModelAndView("","skin1");
		ModelAndView view=mf.CreateModelAndView();
		//total 是模板的全局变量，可以直接访问
		//view.addObject("message","Hello Spring Boot Beetl!");
		return view;
	}
	/**
	 * 查询所有定时任务
	 */
	@RequestMapping(value = "/list/{page}",method = RequestMethod.POST)
	public  R list(@RequestParam Map<String, Object> params,@RequestBody Map<String,Object> condition,@PathVariable int page){
		String beanName1 = (String) condition.get("scheduleName1");
		String methodName1 = (String)condition.get("methodName1");

		PageHelper.startPage(page,10);
		Query query=new Query(params);
		query.put("beanName1",beanName1);
		query.put("methodName1",methodName1);
		List<ScheduleJobEntity> scheduleJobList=scheduleJobService.queryListCase(query);
		int total = scheduleJobService.queryTotal(query);
		PageUtils pageUtil = new PageUtils(scheduleJobList, total, query.getLimit(), query.getPage());

		return R.ok().put("page", pageUtil);
	}



	/**
	 * 定时任务信息
	 */
	@RequestMapping("/info/{jobId}")
	@RequiresPermissions("sys:schedule:info")
	public R info(@PathVariable("jobId") Long jobId){
		ScheduleJobEntity schedule = scheduleJobService.queryObject(jobId);

		return R.ok().put("schedule", schedule);
	}
	
	/**
	 * 保存定时任务
	 */
	@SysLog("保存定时任务")
	@RequestMapping("/save")
	@RequiresPermissions("sys:schedule:save")
	public R save(@RequestBody ScheduleJobEntity scheduleJob){

		boolean bool=true;
		//获取spring bean
		try {
			Object bean =  SpringContextUtils.getBean(scheduleJob.getBeanName());
			Class clazz=bean.getClass();
			Method[] m1=clazz.getDeclaredMethods();
			for(Method me:m1){

				if(me.getName().equals(scheduleJob.getBeanName())){
					bool=false;
				}
			}
			if (bool){
				return R.error("方法有错");
			}}
		catch(Exception ex){
			return R.error("beanName有错");
		}

		ValidatorUtils.validateEntity(scheduleJob);
		
		scheduleJobService.save(scheduleJob);
		
		return R.ok();
	}
	/**
	 * 初始化修改定时任务
	 */
	@RequestMapping("/edit/{jobId}")
	public ModelAndView editsheduleJob(HttpServletRequest req,@PathVariable("jobId") Long jobId) {

		String webTitle=siteConfig.getWebTitle();
		ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"/template/SyetemMgr/eidtschedule","");
		ModelAndView view=mf.CreateModelAndView();
		view.addObject("jobId",jobId);
		return view;
	}

	/**
	 * 新增定时任务
	 */
	@SysLog("新增定时任务")
	@RequestMapping("/add")
	public ModelAndView addsheduleJob(HttpServletRequest req){

		ModelAndViewFactory mf=new ModelAndViewFactory(req,siteConfig,"template/SyetemMgr/newscheduleJob","");
		ModelAndView view=mf.CreateModelAndView();

		return view;
	}
	/**
	 * 修改定时任务
	 */
	@SysLog("修改定时任务")
	@RequestMapping("/update")
	@RequiresPermissions("sys:schedule:update")
	public R update(@RequestBody ScheduleJobEntity scheduleJob){
		boolean bool=true;
		//获取spring bean
		try {
			Object bean =  SpringContextUtils.getBean(scheduleJob.getBeanName());
			Class clazz=bean.getClass();
			Method[] m1=clazz.getDeclaredMethods();
			for(Method me:m1){
				if(me.getName().equals(scheduleJob.getBeanName())){
					bool=false;
				}
			}
			if (bool){
				return R.error("方法有错");
			}}
		catch(Exception ex){
			return R.error("beanName有错");
		}

		ValidatorUtils.validateEntity(scheduleJob);

		scheduleJobService.update(scheduleJob);
		
		return R.ok();
	}

	/**
	 * 批量删除定时任务
	 */
	@SysLog("删除定时任务")
	@RequestMapping("/delete/{jobIds}")
	@RequiresPermissions("sys:schedule:delete")
	public R delete(@PathVariable Long[] jobIds){
		scheduleJobService.deleteBatch(jobIds);

		return R.ok();
	}
	/**
	 * 删除定时任务
	 */
	@SysLog("删除定时任务")
	@RequestMapping(value="/deleteOne/{jobId}",method = RequestMethod.POST)
	@RequiresPermissions("sys:schedule:delete")
	public R deleteOne(@PathVariable Long jobId){


		scheduleJobService.deleteOne(jobId);
		return R.ok();
	}
	/**
	 * 立即执行任务
	 */
	@SysLog("立即执行任务")
	@RequestMapping("/run")
	@RequiresPermissions("sys:schedule:run")
	public R run(@RequestBody Long[] jobIds){
		scheduleJobService.run(jobIds);
		
		return R.ok();
	}
	
	/**
	 * 暂停定时任务
	 */
	@SysLog("暂停定时任务")
	@RequestMapping("/pause")
	@RequiresPermissions("sys:schedule:pause")
	public R pause(@RequestBody Long[] jobIds){
		scheduleJobService.pause(jobIds);
		
		return R.ok();
	}
	
	/**
	 * 恢复定时任务
	 */
	@SysLog("恢复定时任务")
	@RequestMapping("/resume")
	@RequiresPermissions("sys:schedule:resume")
	public R resume(@RequestBody Long[] jobIds){
		scheduleJobService.resume(jobIds);
		
		return R.ok();
	}
}
