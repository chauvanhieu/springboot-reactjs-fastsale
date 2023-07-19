package com.venus.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.venus.dto.UserDTO;
import com.venus.entities.User;
import com.venus.repository.ShopRepository;
import com.venus.repository.UserRepository;
import com.venus.service.BCryptService;

@Component
public class UserConverter {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ShopRepository shopRepository;
	@Autowired
	private BCryptService bCryptService;

	public UserDTO toDTO(User user) {
		UserDTO userDTO = new UserDTO();
		userDTO.setId(user.getId());
		userDTO.setName(user.getName());
		userDTO.setEmail(user.getEmail());
		userDTO.setShopId(user.getShop().getId());
		userDTO.setStatus(user.getStatus());
		userDTO.setRole(user.getRole());
		userDTO.setPassword(user.getPassword());
		return userDTO;
	}

	public User toEntity(UserDTO userDTO) {
		User user = userRepository.findById(userDTO.getId()).orElse(new User());
		user.setName(userDTO.getName());
		user.setEmail(userDTO.getEmail());
		user.setShop(shopRepository.findById(userDTO.getShopId()).orElse(null));
		user.setStatus(userDTO.getStatus());
		String password = bCryptService.hashPassword(userDTO.getPassword());
		user.setPassword(password);

		user.setRole(userDTO.getRole());

		return user;
	}
}
