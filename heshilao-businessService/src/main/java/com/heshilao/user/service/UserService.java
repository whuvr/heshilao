package com.heshilao.user.service;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;

import com.alibaba.dubbo.config.annotation.Service;
import com.heshilao.user.mapper.UserMapper;
import com.heshilao.user.model.UserReq;
import com.heshilao.user.model.UserRes;
import com.heshilao.utils.PasswordEncryption;

@Service
public class UserService implements IUserService
{
    @Resource
    UserMapper userMapper;
    
    @Override
    public UserRes doLogin(UserReq userReq)
    {
        UserReq dbModel = userMapper.selectByUEP(userReq.getUsername());
        if (dbModel == null)
        {
            return null;
        }
        if (!PasswordEncryption.encrypt(dbModel.getUsername(), userReq.getPassword()).equals(dbModel.getPassword()))
        {
            return null;
        }
        UserRes userRes = new UserRes();
        BeanUtils.copyProperties(dbModel, userRes);
        return userRes;
    }
    
}
