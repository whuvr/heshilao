package com.heshilao.web.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.heshilao.redis.IRedisService;
import com.heshilao.user.model.UserReq;
import com.heshilao.user.model.UserRes;
import com.heshilao.user.service.IUserService;
import com.heshilao.web.controller.BaseController;

/**
 * 用户Controller
 * 
 * @author zf
 * @since p2p_cloud_v1.0
 */
@Controller
@RequestMapping("/users")
public class UserController extends BaseController
{
    @Reference
    private IUserService userService;

    @Reference
    private IRedisService redisService;
    
    @RequestMapping(value = "/login")
    @ResponseBody
    public UserRes login(@Validated UserReq userReq, BindingResult bindingResult)
    {
        logger.info(redisService.getValue("a") + "");
        UserRes userRes = userService.doLogin(userReq);
        return userRes;
    }
}
