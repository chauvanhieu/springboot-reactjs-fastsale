package com.venus.controller;

import java.util.Optional;

import javax.servlet.annotation.MultipartConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.venus.service.UploadService;

@RestController
@MultipartConfig
@RequestMapping("/upload")
public class UploadController {

	@Autowired
	UploadService uploadService;
	
	@PostMapping
	public ResponseEntity<?> uploadProductImage(@RequestParam("img") Optional<MultipartFile> file){
		try {
			if(file.isEmpty()) {
				return new ResponseEntity<>("",HttpStatus.OK); 
			}
				String imageURL = uploadService.save(file.get());
				return new ResponseEntity<>(imageURL,HttpStatus.OK); 
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
