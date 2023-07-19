package com.venus.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerInterceptor;

import com.venus.service.JwtService;

@Service
public class AdminAuthInterceptor implements HandlerInterceptor {

	@Autowired
	private JwtService jwtService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		if (jwtService.isLogined() == false) {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "TOKEN KHÔNG KHẢ DỤNG, ĐĂNG NHẬP ĐỂ SỬ DỤNG");
			return false;
		}

		if (jwtService.acceptRole("ROLE_ADMIN") == false) {
			response.sendError(HttpServletResponse.SC_FORBIDDEN, "Dành cho ROLE_ADMIN");
			return false;
		}
		return true;
	}
}
