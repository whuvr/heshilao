package com.heshilao.web.wrapper;

/**
 * 防止xss攻击
 *
 * @author wuwanshun
 * @since p2p_cloud_v1.0
 */
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import org.springframework.web.util.HtmlUtils;

public class XssHttpServletRequestWrapper extends HttpServletRequestWrapper
{

    public XssHttpServletRequestWrapper(HttpServletRequest request)
    {
        super(request);
    }

    @Override
    public String getParameter(String name)
    {
        return clearXss(super.getParameter(name));
    }

    @Override
    public String getHeader(String name)
    {
        return clearXss(super.getHeader(name));
    }

    @Override
    public String[] getParameterValues(String name)
    {
        String[] values = super.getParameterValues(name);
        if (values == null)
        {
            return values;
        }
        String[] newValues = new String[values.length];

        for (int i = 0; i < values.length; i++)
        {
            newValues[i] = clearXss(values[i]);
        }

        return newValues;
    }

    /**
     * 处理字符转义
     * 
     * @param value
     * @return
     */
    private String clearXss(String value)
    {
        return HtmlUtils.htmlEscape(value);
    }

}