package com.heshilao.user.mapper;

import org.apache.ibatis.annotations.Select;

import com.heshilao.user.model.UserReq;

public interface UserMapper
{

    @Select("select * from base_user where username=#{username} or phone=#{username}")
    UserReq selectByUEP(String username);
    
}
