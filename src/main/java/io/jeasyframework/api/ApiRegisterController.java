package io.jeasyframework.api;

import io.jeasyframework.entity.UserEntity;
import io.jeasyframework.service.UserService;
import io.jeasyframework.utils.R;
import io.jeasyframework.utils.annotation.IgnoreAuth;
import io.jeasyframework.utils.validator.Assert;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 注册
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017-03-26 17:27
 */
//@RestController
@RequestMapping("/api")
@Api(value="注册接口",tags={"用户注册接口"},description = "用户注册")
public class ApiRegisterController {
    @Autowired
    private UserService userService;

    /**
     * 注册
     */
    //@IgnoreAuth
    @PostMapping("register")
    @ApiOperation(value = "注册")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", dataType="string", name = "mobile", value = "手机号", required = true),
            @ApiImplicitParam(paramType = "query", dataType="string", name = "password", value = "密码", required = true)
    })

    public R register(String mobile, String password){
        Assert.isBlank(mobile, "手机号不能为空");
        Assert.isBlank(password, "密码不能为空");

        userService.save(mobile, password);

        return R.ok();
    }

    /*public R register(String mobile, String password,@RequestBody @ApiParam(name="用户对象",value="传入json格式",required=true) UserEntity user){
        Assert.isBlank(mobile, "手机号不能为空");
        Assert.isBlank(password, "密码不能为空");

        userService.save(mobile, password);

        return R.ok();
    }*/
}
