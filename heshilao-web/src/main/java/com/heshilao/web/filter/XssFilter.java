package com.heshilao.web.filter;

/**
 * 防止xss攻击
 *
 * @author zf
 * @since heshilao_v1.0
 */
import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.heshilao.web.wrapper.XssHttpServletRequestWrapper;

public class XssFilter implements Filter
{

    @Override
    public void destroy()
    {
        // TODO Auto-generated method stub

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException
    {
        chain.doFilter(new XssHttpServletRequestWrapper((HttpServletRequest) request), response);
    }

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
		
	}

    
}