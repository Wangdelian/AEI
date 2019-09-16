package io.jeasyframework.controller.train;

import com.github.pagehelper.PageHelper;
import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.controller.AbstractController;
import io.jeasyframework.entity.ChReconditionEntity;
import io.jeasyframework.entity.ChTraincheckinfoEntity;
import io.jeasyframework.entity.LevelMarkEntity;
import io.jeasyframework.service.ChReconditionService;
import io.jeasyframework.service.ChTraincheckinfoService;
import io.jeasyframework.service.LevelMarkService;
import io.jeasyframework.utils.*;
import io.jeasyframework.utils.annotation.SysLog;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * ${comments}
 *
 * @date 2019-03-25 11:35:25
 */
@RestController
@RequestMapping("/train/systeminfo")
public class SysteminfoController extends AbstractController {
	@Autowired
	private ChTraincheckinfoService chTraincheckinfoService;
	@Autowired
	private LevelMarkService levelMarkService;
	@Autowired
	private ChReconditionService chReconditionService;
	@Autowired
	private SiteConfig siteConfig;


    @RequestMapping("/searchlist")
    public ModelAndView searchlist(HttpServletRequest req) {
        String webTitle = siteConfig.getWebTitle();
        ModelAndViewFactory mf = new ModelAndViewFactory(req, siteConfig, "template/Systeminfo/systeminfoList", this.getUserSkin());
        ModelAndView view = mf.CreateModelAndView();
        return view;
    }

	/**
	 * 列表
	 */
	@RequestMapping(value = "/list/{pageNum}", method = RequestMethod.POST)
	public R list(@RequestBody Map<String, Object> params, @PathVariable("pageNum") int pageNum){
		PageHelper.startPage(pageNum, siteConfig.getPagesize());
		//查询列表数据
		Query query = new Query(params);

		List<LevelMarkEntity> chReconditionList = levelMarkService.querySystemList(query);
		int total = levelMarkService.querySystemTotal(query);
		int size = chReconditionList.size();
		if(size>0){
			JSONObject temp;
			List<ChTraincheckinfoEntity> tempList;
			for(int i=0;i<size;i++){
				//获取系统数据状态,登录次数，最后登录时间,系统状态
				String result = HttpContextUtils.doGet(chReconditionList.get(i).getUrl() + "/api/querySysteminfo");
				System.out.println("结果——————————————————————————");

				if(result !=null && result.length()>2){
					System.out.println(result);
					temp = JSONObject.fromObject(result);
					//登录次数
					chReconditionList.get(i).setCount(temp.get("count").toString());
					//最后登录时间
					chReconditionList.get(i).setLastLogin(temp.get("lastLogin").toString());
					//数据状态
					chReconditionList.get(i).setDataStatus(temp.get("dataStatus").toString());
					//运行状态
					chReconditionList.get(i).setStatus("正常");
				}else{
					chReconditionList.get(i).setDataStatus("异常");
					chReconditionList.get(i).setStatus("异常");
				}
			}
		}

		PageUtils pageUtil = new PageUtils(chReconditionList, total, query.getLimit(), query.getPage());

		return R.ok().put("page", pageUtil);
	}
}
