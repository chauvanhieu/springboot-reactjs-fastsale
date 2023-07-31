package com.venus.service;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadService {

	@Autowired
	private ServletContext servletContext;
	@Autowired
	HttpServletRequest request;

	public  String getBaseUrl() {
        String scheme = request.getScheme(); // http or https
        String serverName = request.getServerName();
        int serverPort = request.getServerPort();
        String contextPath = request.getContextPath();

        // Xây dựng base URL từ các thành phần thu thập được
        StringBuilder baseUrl = new StringBuilder();
        baseUrl.append(scheme).append("://").append(serverName);
        
        // Nếu port không phải là 80 (http) hoặc 443 (https), thêm cổng vào baseURL
        if ((scheme.equals("http") && serverPort != 80) || (scheme.equals("https") && serverPort != 443)) {
            baseUrl.append(":").append(serverPort);
        }

        baseUrl.append(contextPath);

        return baseUrl.toString();
    }
	
	
	public String save(MultipartFile file) {
		try {
			if (file.isEmpty()) {
				return "";
			}
			String originalFilename = file.getOriginalFilename();
			String extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
			String randomName = UUID.randomUUID().toString() + extension;
			String realPath = servletContext.getRealPath("/images/");

			Path path = Paths.get(realPath + File.separator + randomName);
			Files.createDirectories(path.getParent());
			Files.write(path, file.getBytes());

			return getBaseUrl() + "/images/" + randomName;
		} catch (IOException e) {
			throw new RuntimeException("Could not store file " + file.getOriginalFilename(), e);
		}
	}

}