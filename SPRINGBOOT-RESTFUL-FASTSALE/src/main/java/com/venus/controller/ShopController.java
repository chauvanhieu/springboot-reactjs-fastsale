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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.venus.converter.ShopConverter;
import com.venus.dto.ResponseOutput;
import com.venus.dto.ShopDTO;
import com.venus.entities.Shop;
import com.venus.repository.ShopRepository;

@RestController
@RequestMapping("/api/shops")
@CrossOrigin
public class ShopController {
	@Autowired
	ShopRepository shopRepository;
	@Autowired
	ShopConverter shopConverter;
	private static final int DEFAULT_PAGE = 1;
	private static final int DEFAULT_LIMIT = 999999;

	@GetMapping
	public ResponseEntity<ResponseOutput<List<ShopDTO>>> getAll(
			@RequestParam(value = "keyword", defaultValue = "") String keyword,
			@RequestParam(value = "page", defaultValue = "1") int page,
			@RequestParam(value = "limit", defaultValue = "999999") int limit,
			@RequestParam(value = "order_by", defaultValue = "desc") String orderBy,
			@RequestParam(value = "sort_by", defaultValue = "id") String sortBy) {

		try {

			if (page < 1) {
				page = DEFAULT_PAGE;
			}

			if (limit < 1) {
				limit = DEFAULT_LIMIT;
			}

			Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(
					orderBy.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, sortBy.toLowerCase()));

			Page<Shop> pageShop = shopRepository.findByNameContainingAndStatus(keyword, 1, pageable);
			if (pageShop.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			List<ShopDTO> DTOs = new ArrayList<>();
			for (Shop item : pageShop.getContent()) {
				DTOs.add(shopConverter.toDTO(item));
			}

			ResponseOutput<List<ShopDTO>> output = new ResponseOutput<List<ShopDTO>>();
			output.setData(DTOs);
			output.setLimit(limit);
			output.setPage(page);
			output.setTotalPages(pageShop.getTotalPages());

			return new ResponseEntity<>(output, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<ShopDTO> getById(@PathVariable("id") int id) {
		Optional<Shop> existingItemOptional = shopRepository.findById(id);
		try {
			if (existingItemOptional.isPresent()) {
				ShopDTO DTO = shopConverter.toDTO(existingItemOptional.get());
				return new ResponseEntity<>(DTO, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody ShopDTO item) {
		try {

			boolean exists = shopRepository.existsById(id);

			if (exists) {
				Shop Shop = shopRepository.save(shopConverter.toEntity(item));
				return new ResponseEntity<>(shopConverter.toDTO(Shop), HttpStatus.OK);
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
			Optional<Shop> existingItemOptional = shopRepository.findById(id);
			if (existingItemOptional.isPresent()) {
				Shop Shop = existingItemOptional.get();
				Shop.setStatus(0);
				shopRepository.save(Shop);
			}
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

	@PostMapping
	public ResponseEntity<ShopDTO> create(@RequestBody ShopDTO item) {
		try {
			Shop shop = shopRepository.save(shopConverter.toEntity(item));
			return new ResponseEntity<>(shopConverter.toDTO(shop), HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}

	@PostMapping("/restore/{id}")
	public ResponseEntity<HttpStatus> restore(@PathVariable("id") int id) {
		try {
			Optional<Shop> existingItemOptional = shopRepository.findById(id);
			if (existingItemOptional.isPresent()) {
				Shop Shop = existingItemOptional.get();
				Shop.setStatus(1);
				shopRepository.save(Shop);
			}
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
