package com.heshilao.web.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.heshilao.user.model.UserRes;


/**
 * 
 * Controller的基类
 *
 * @author zhufeng
 * @since p2p_cloud_v1.0
 */
public class BaseController
{
    protected Logger logger = LoggerFactory.getLogger(getClass());

    @Resource
    protected HttpServletRequest request;
    
    @Resource
    protected HttpServletResponse response;
    
    @Resource
    protected HttpSession session;

    protected UserRes getLoginUser()
    {
        return (UserRes) request.getSession().getAttribute("");
    }

    protected String getRemoteIP()
    {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
        {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
        {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
        {
            ip = request.getRemoteAddr();
        }
        if (ip != null && ip.length() > 0)
        {
            String[] ipArray = ip.split(",");
            if (ipArray != null && ipArray.length > 1)
            {
                return ipArray[0];
            }
            return ip;
        }

        return "未知IP";
    }
    
    
}
