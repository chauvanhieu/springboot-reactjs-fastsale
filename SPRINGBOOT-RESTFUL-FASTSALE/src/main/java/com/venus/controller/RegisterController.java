package com.venus.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.venus.converter.ShopConverter;
import com.venus.converter.UserConverter;
import com.venus.dto.RegisterDTO;
import com.venus.dto.ResponseLogin;
import com.venus.dto.ShopDTO;
import com.venus.dto.UserDTO;
import com.venus.entities.Shop;
import com.venus.entities.User;
import com.venus.repository.ShopRepository;
import com.venus.repository.UserRepository;
import com.venus.service.BCryptService;
import com.venus.service.JwtService;

@RestController
@RequestMapping("/register")
public class RegisterController {
	@Autowired
	UserRepository userRepository;

	@Autowired
	ShopRepository shopRepository;

	@Autowired
	UserConverter userConverter;

	@Autowired
	BCryptService bCryptService;

	@Autowired
	JwtService jwtService;

	@Autowired
	ShopConverter shopConverter;

	@PostMapping
	public ResponseEntity<?> login(@RequestBody RegisterDTO item) {

		try {

			Optional<User> user = userRepository.findByEmail(item.getEmail());
			if (user.isPresent()) {
				return new ResponseEntity<>("Tài khoản đã tồn tại : " + item.getEmail(), HttpStatus.CONFLICT);
			}

			UserDTO userDTO = new UserDTO();
			userDTO.setEmail(item.getEmail());
			userDTO.setName(item.getUsername());
			userDTO.setPassword(bCryptService.hashPassword(item.getPassword()));
			userDTO.setRole("ROLE_ADMIN");
			userDTO.setStatus(1);

			ShopDTO shopDTO = new ShopDTO();
			shopDTO.setName(item.getShopName());
			shopDTO.setStatus(1);
			Shop shop = shopRepository.save(shopConverter.toEntity(shopDTO));
			userDTO.setShopId(shop.getId());

			User newUser = userRepository.save(userConverter.toEntity(userDTO));

			String token = jwtService.generateTokenLogin(newUser.getEmail());

			ResponseLogin res = new ResponseLogin();
			res.setUser(userConverter.toDTO(newUser));
			res.setAccessToken(token);
			res.setShop(shopConverter.toDTO(newUser.getShop()));
			return new ResponseEntity<>(res, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}

	}
}
