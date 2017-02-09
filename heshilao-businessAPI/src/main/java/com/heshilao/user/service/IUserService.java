package com.heshilao.user.service;

import com.heshilao.user.model.UserReq;
import com.heshilao.user.model.UserRes;

public interface IUserService
{

    public UserRes doLogin(UserReq userReq);

}
