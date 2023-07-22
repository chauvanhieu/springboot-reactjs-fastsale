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

import com.venus.converter.CategoryConverter;
import com.venus.dto.CategoryDTO;
import com.venus.dto.ResponseOutput;
import com.venus.entities.Category;
import com.venus.entities.Shop;
import com.venus.repository.CategoryRepository;
import com.venus.repository.ShopRepository;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	@Autowired
	CategoryRepository categoryRepository;
	@Autowired
	ShopRepository shopRepository;
	@Autowired
	CategoryConverter categoryConverter;

	private static final int DEFAULT_PAGE = 1;
	private static final int DEFAULT_LIMIT = 999999;

	@GetMapping
	public ResponseEntity<ResponseOutput<List<CategoryDTO>>> getAll(
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

			Page<Category> pageCategory;

			if (shop.isEmpty()) {
				pageCategory = categoryRepository.findByNameContaining(keyword, pageable);
			} else {
				pageCategory = categoryRepository.findByShopAndNameContaining(shop.get(), keyword, pageable);
			}
			if (pageCategory.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			List<CategoryDTO> DTOs = new ArrayList<>();
			for (Category item : pageCategory.getContent()) {
				DTOs.add(categoryConverter.toDTO(item));
			}

			ResponseOutput<List<CategoryDTO>> output = new ResponseOutput<List<CategoryDTO>>();
			output.setData(DTOs);
			output.setLimit(limit);
			output.setPage(page);
			output.setTotalPages(pageCategory.getTotalPages());

			return new ResponseEntity<>(output, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<CategoryDTO> getById(@PathVariable("id") int id) {
		Optional<Category> existingItemOptional = categoryRepository.findById(id);
		try {
			if (existingItemOptional.isPresent()) {
				CategoryDTO DTO = categoryConverter.toDTO(existingItemOptional.get());
				return new ResponseEntity<>(DTO, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);

		}
	}

	@PostMapping
	public ResponseEntity<CategoryDTO> create(@RequestBody CategoryDTO item) {
		try {
			Category category = categoryRepository.save(categoryConverter.toEntity(item));
			return new ResponseEntity<>(categoryConverter.toDTO(category), HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<CategoryDTO> update(@PathVariable("id") int id, @RequestBody CategoryDTO item) {
		try {
			boolean exists = categoryRepository.existsById(id);

			if (exists) {
				Category category = categoryRepository.save(categoryConverter.toEntity(item));
				return new ResponseEntity<>(categoryConverter.toDTO(category), HttpStatus.OK);
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
			Optional<Category> existingItemOptional = categoryRepository.findById(id);
			if (existingItemOptional.isPresent()) {
				Category category = existingItemOptional.get();
				category.setStatus(0);
				categoryRepository.save(category);
			}
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

	@PostMapping("/restore/{id}")
	public ResponseEntity<HttpStatus> restore(@PathVariable("id") int id) {
		try {
			Optional<Category> existingItemOptional = categoryRepository.findById(id);
			if (existingItemOptional.isPresent()) {
				Category category = existingItemOptional.get();
				category.setStatus(1);
				categoryRepository.save(category);
			}
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
