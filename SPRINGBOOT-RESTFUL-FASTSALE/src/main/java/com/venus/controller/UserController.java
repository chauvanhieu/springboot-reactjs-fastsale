package com.venus.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.venus.converter.UserConverter;
import com.venus.dto.ResponseOutput;
import com.venus.dto.UserDTO;
import com.venus.entities.Shop;
import com.venus.entities.User;
import com.venus.repository.ShopRepository;
import com.venus.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	UserRepository userRepository;
	@Autowired
	ShopRepository shopRepository;
	@Autowired
	UserConverter userConverter;
	private static final int DEFAULT_PAGE = 1;
	private static final int DEFAULT_LIMIT = 999999;

	@GetMapping
	public ResponseEntity<ResponseOutput<List<UserDTO>>> getAll(
			@RequestParam(value = "keyword", defaultValue = "") String keyword,
			@RequestParam(value = "page", defaultValue = "1") int page,
			@RequestParam(value = "limit", defaultValue = "999999") int limit,
			@RequestParam(value = "order_by", defaultValue = "desc") String orderBy,
			@RequestParam(value = "sort_by", defaultValue = "id") String sortBy,
			@RequestParam(value = "shop_id", defaultValue = "0") int shopId) {

		try {
			if (page < 1) {
				page = DEFAULT_PAGE;
			}

			if (limit < 1) {
				limit = DEFAULT_LIMIT;
			}

			Optional<Shop> shop = shopRepository.findById(shopId);

			Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(
					orderBy.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, sortBy.toLowerCase()));

			Page<User> pageUser;

			if (shop.isPresent()) {
				pageUser = userRepository.findByShopAndNameContaining(shop.get(), keyword, pageable);
			} else {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			List<UserDTO> DTOs = new ArrayList<>();
			for (User item : pageUser.getContent()) {
				DTOs.add(userConverter.toDTO(item));
			}

			ResponseOutput<List<UserDTO>> output = new ResponseOutput<>();
			output.setData(DTOs);
			output.setLimit(limit);
			output.setPage(page);
			output.setTotalPages(pageUser.getTotalPages());

			return new ResponseEntity<>(output, HttpStatus.OK);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<UserDTO> getById(@PathVariable("id") int id) {
		Optional<User> existingItemOptional = userRepository.findById(id);
		try {
			if (existingItemOptional.isPresent()) {
				UserDTO DTO = userConverter.toDTO(existingItemOptional.get());
				return new ResponseEntity<>(DTO, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);

		}
	}

	@PostMapping
	public ResponseEntity<?> create(@RequestBody UserDTO item) {
		System.out.println(item.getRole());
		try {

			Optional<User> existUser = userRepository.findByEmail(item.getEmail());
			if (existUser.isPresent()) {
				return new ResponseEntity<>("Email đã tồn tại", HttpStatus.CONFLICT);
			}

			User User = userRepository.save(userConverter.toEntity(item));
			return new ResponseEntity<>(userConverter.toDTO(User), HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody UserDTO item) {
		try {

			boolean exists = userRepository.existsById(id);

			if (exists) {
				User User = userRepository.save(userConverter.toEntity(item));
				return new ResponseEntity<>(userConverter.toDTO(User), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> delete(@PathVariable("id") int id) {
		try {
			Optional<User> existingItemOptional = userRepository.findById(id);
			if (existingItemOptional.isPresent()) {
				User User = existingItemOptional.get();
				User.setStatus(0);
				userRepository.save(User);
			}
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

	@PostMapping("/restore/{id}")
	public ResponseEntity<HttpStatus> restore(@PathVariable("id") int id) {
		try {
			Optional<User> existingItemOptional = userRepository.findById(id);
			if (existingItemOptional.isPresent()) {
				User User = existingItemOptional.get();
				User.setStatus(1);
				userRepository.save(User);
			}
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
