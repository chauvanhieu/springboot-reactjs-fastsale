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

import com.venus.converter.ProductConverter;
import com.venus.dto.ProductDTO;
import com.venus.dto.ResponseOutput;
import com.venus.entities.Category;
import com.venus.entities.Product;
import com.venus.entities.Shop;
import com.venus.repository.CategoryRepository;
import com.venus.repository.ProductRepository;
import com.venus.repository.ShopRepository;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {
	@Autowired
	ProductRepository productRepository;
	@Autowired
	CategoryRepository categoryRepository;
	@Autowired
	ShopRepository shopRepository;
	@Autowired
	ProductConverter productConverter;

	private static final int DEFAULT_PAGE = 1;
	private static final int DEFAULT_LIMIT = 999999;
	private static final double MIN_PRICE = Double.MIN_VALUE;
	private static final double MAX_PRICE = Double.MAX_VALUE;

	@GetMapping
	public ResponseEntity<ResponseOutput<List<ProductDTO>>> getAll(
			@RequestParam(value = "keyword", defaultValue = "") String keyword,
			@RequestParam(value = "page", defaultValue = "1") int page,
			@RequestParam(value = "limit", defaultValue = "999999") int limit,
			@RequestParam(value = "category_id", defaultValue = "0") int categoryID,
			@RequestParam(value = "order_by", defaultValue = "desc") String orderBy,
			@RequestParam(value = "sort_by", defaultValue = "price") String sortBy,
			@RequestParam(value = "min_price", required = false) Optional<Double> minPrice,
			@RequestParam(value = "max_price", required = false) Optional<Double> maxPrice,
			@RequestParam(value = "shop_id", defaultValue = "0") int shopId) {

		try {

			if (page < 1) {
				page = DEFAULT_PAGE;
			}
			if (limit < 1) {
				limit = DEFAULT_LIMIT;
			}

			double min = minPrice.orElse(MIN_PRICE);
			double max = maxPrice.orElse(MAX_PRICE);
			if (min < 1) {
				min = MIN_PRICE;
			}
			if (max < 10) {
				max = MAX_PRICE;
			}

			Optional<Category> category = categoryRepository.findById(categoryID);
			Optional<Shop> shop = shopRepository.findById(shopId);
			if (shop.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}

			Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(
					orderBy.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, sortBy.toLowerCase()));

			Page<Product> pageProduct;

			if (category.isEmpty()) {
				if (shop.isEmpty()) {
					return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				} else {
					pageProduct = productRepository.findByShopAndNameContainingAndPriceBetween(shop.get(), keyword, min,
							max, pageable);
				}
			} else {
				if (category.get().getStatus() == 1) {
					if (shop.isEmpty()) {
						pageProduct = productRepository.findByCategoryAndNameContainingAndStatusAndPriceBetween(
								category.get(), keyword, 1, min, max, pageable);
					} else {
						pageProduct = productRepository.findByCategoryAndShopAndNameContainingAndStatusAndPriceBetween(
								category.get(), shop.get(), keyword, 1, min, max, pageable);
					}
				} else {
					return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				}
			}

			if (pageProduct.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			List<ProductDTO> DTOs = new ArrayList<>();
			for (Product item : pageProduct) {
				DTOs.add(productConverter.toDTO(item));
			}

			ResponseOutput<List<ProductDTO>> output = new ResponseOutput<List<ProductDTO>>();
			output.setData(DTOs);
			output.setLimit(limit);
			output.setPage(page);
			output.setTotalPages(pageProduct.getTotalPages());

			return new ResponseEntity<>(output, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<ProductDTO> getById(@PathVariable("id") int id) {
		Optional<Product> existingItemOptional = productRepository.findById(id);
		try {
			if (existingItemOptional.isPresent()) {
				ProductDTO DTO = productConverter.toDTO(existingItemOptional.get());
				return new ResponseEntity<>(DTO, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);

		}
	}

	@PostMapping
	public ResponseEntity<ProductDTO> create(@RequestBody ProductDTO item) {
		try {
			Product product = productRepository.save(productConverter.toEntity(item));
			return new ResponseEntity<>(productConverter.toDTO(product), HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<ProductDTO> update(@PathVariable("id") int id, @RequestBody ProductDTO item) {
		try {
			boolean exists = productRepository.existsById(id);

			if (exists) {
				Product product = productRepository.save(productConverter.toEntity(item));
				return new ResponseEntity<>(productConverter.toDTO(product), HttpStatus.OK);
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
			Optional<Product> existingItemOptional = productRepository.findById(id);
			if (existingItemOptional.isPresent()) {
				Product product = existingItemOptional.get();
				product.setStatus(0);
				productRepository.save(product);
			}
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

	@PostMapping("/restore/{id}")
	public ResponseEntity<HttpStatus> restore(@PathVariable("id") int id) {
		try {
			Optional<Product> existingItemOptional = productRepository.findById(id);
			if (existingItemOptional.isPresent()) {
				Product product = existingItemOptional.get();
				product.setStatus(1);
				productRepository.save(product);
			}
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
