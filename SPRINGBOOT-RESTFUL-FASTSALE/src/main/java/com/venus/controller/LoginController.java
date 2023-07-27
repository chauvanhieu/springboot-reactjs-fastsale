package com.venus.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.venus.converter.ShopConverter;
import com.venus.converter.UserConverter;
import com.venus.dto.LoginRequest;
import com.venus.dto.ResponseLogin;
import com.venus.dto.TokenRequest;
import com.venus.entities.User;
import com.venus.repository.UserRepository;
import com.venus.service.BCryptService;
import com.venus.service.JwtService;

@RestController
@RequestMapping("/login")
@CrossOrigin
public class LoginController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserConverter userConverter;

	@Autowired
	ShopConverter shopConverter;

	@Autowired
	BCryptService bCryptService;

	@Autowired
	JwtService jwtService;

	@PostMapping
	public ResponseEntity<?> login(@RequestBody LoginRequest login) {
		String email = login.getEmail();
		String password = login.getPassword();

		try {

			Optional<User> user = userRepository.findByEmail(email);
			if (user.isPresent()) {
				if (user.get().getStatus() != 1) {
					return new ResponseEntity<>("Tài khoản đã bị vô hiệu hóa", HttpStatus.UNAUTHORIZED);
				}
				boolean check = bCryptService.checkPassword(password, user.get().getPassword());
				if (check) {
					String token = jwtService.generateTokenLogin(email);
					ResponseLogin res = new ResponseLogin();
					res.setUser(userConverter.toDTO(user.get()));
					res.setAccessToken(token);
					res.setShop(shopConverter.toDTO(user.get().getShop()));
					return new ResponseEntity<>(res, HttpStatus.OK);
				} else {
					return new ResponseEntity<>("Mật khẩu không chính xác", HttpStatus.UNAUTHORIZED);
				}
			} else {
				return new ResponseEntity<>("Tài khoản không tồn tại", HttpStatus.NOT_FOUND);
			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}

	}

	@PostMapping("/remember")
	public ResponseEntity<?> remember(@RequestBody TokenRequest item) {
		try {
			if (item.getToken() != "" && jwtService.validateTokenLogin(item.getToken())) {
				String email = jwtService.getEmailFromToken(item.getToken());
				Optional<User> user = userRepository.findByEmail(email);
				if (user.isPresent()) {

					String newToken = jwtService.generateTokenLogin(email);
					ResponseLogin res = new ResponseLogin();
					res.setUser(userConverter.toDTO(user.get()));
					res.setAccessToken(newToken);
					res.setShop(shopConverter.toDTO(user.get().getShop()));
					return new ResponseEntity<>(res, HttpStatus.OK);

				} else {
					return new ResponseEntity<>("Tài khoản không tồn tại", HttpStatus.NOT_FOUND);
				}
			} else {
				return new ResponseEntity<>("Tài khoản không tồn tại", HttpStatus.NOT_FOUND);
			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}

	}

}
