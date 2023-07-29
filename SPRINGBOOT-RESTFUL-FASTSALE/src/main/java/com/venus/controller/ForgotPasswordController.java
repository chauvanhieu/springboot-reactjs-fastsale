package com.venus.controller;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.venus.dto.EmailForgot;
import com.venus.entities.User;
import com.venus.repository.UserRepository;
import com.venus.service.BCryptService;
import com.venus.service.MailService;

@RestController
@RequestMapping("/forgot-password")
public class ForgotPasswordController {

	public static String generateRandomString() {
		String uuid = UUID.randomUUID().toString().replace("-", "");
		return uuid.substring(0, 10);
	}

	@Autowired
	UserRepository userRepository;
	@Autowired
	BCryptService bCryptService;
	@Autowired
	MailService mailService;

	@PostMapping
	public ResponseEntity<?> getEmail(@RequestBody EmailForgot email) {
		try {
			Optional<User> user = userRepository.findByEmail(email.getEmail());
			if (user.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}

			String newPassword = generateRandomString();
			User u = user.get();
			u.setPassword(bCryptService.hashPassword(newPassword));
			userRepository.save(u);
			mailService.send(email.getEmail(), "[FAST-SALE] RESET YOUR PASSWORD",
					"Mật khẩu của bạn là : " + newPassword);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

}
