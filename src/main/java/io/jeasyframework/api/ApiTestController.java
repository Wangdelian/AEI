package io.jeasyframework.api;

import io.jeasyframework.entity.SysUserEntity;
import io.jeasyframework.entity.UserEntity;
import io.jeasyframework.service.SysUserService;
import io.jeasyframework.utils.R;
import io.jeasyframework.utils.ShiroUtils;
import io.jeasyframework.utils.annotation.IgnoreAuth;
import io.jeasyframework.utils.annotation.LoginUser;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * API测试接口
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017-03-23 15:47
 */
@RestController
@RequestMapping("/api")
@Api(value="测试接口",tags={"用户测试接口"},description = "测试接口")
public class ApiTestController {

    /**
     * 忽略Token验证测试
     */
    @IgnoreAuth
    @GetMapping("notToken")
    @ApiOperation(value = "忽略Token验证测试")
    public R notToken(){
        return R.ok().put("msg", "ok");
    }


}
