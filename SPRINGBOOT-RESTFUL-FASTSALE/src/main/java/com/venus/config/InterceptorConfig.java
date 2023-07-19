package com.venus.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.venus.interceptor.AdminAuthInterceptor;
import com.venus.interceptor.UserAuthInterceptor;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

	@Autowired
	private UserAuthInterceptor userAuthInterceptor;

	@Autowired
	private AdminAuthInterceptor AdminAuthInterceptor;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(userAuthInterceptor).addPathPatterns("/api/**").addPathPatterns("/api/**")
				.addPathPatterns("/api/**").addPathPatterns("/api/**").excludePathPatterns("/login");

		registry.addInterceptor(AdminAuthInterceptor).addPathPatterns("/api/orders/**").addPathPatterns("/api/users/**")
				.addPathPatterns("/api/shops/**").excludePathPatterns("/login");
		;
	}
}
