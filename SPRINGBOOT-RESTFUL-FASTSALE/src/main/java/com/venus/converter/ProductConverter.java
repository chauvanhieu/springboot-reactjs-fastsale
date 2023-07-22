package com.venus.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.venus.dto.ProductDTO;
import com.venus.entities.Product;
import com.venus.repository.CategoryRepository;
import com.venus.repository.ProductRepository;
import com.venus.repository.ShopRepository;

@Component
public class ProductConverter {

	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private CategoryRepository categoryRepository;
	@Autowired
	private ShopRepository shopRepository;

	public ProductDTO toDTO(Product product) {
		ProductDTO productDTO = new ProductDTO();
		productDTO.setId(product.getId());
		productDTO.setName(product.getName());
		productDTO.setPrice(product.getPrice());
		productDTO.setCategoryId(product.getCategory().getId());
		productDTO.setAvailable(product.getAvailable());
		productDTO.setImportPrice(product.getImportPrice());
		productDTO.setShopId(product.getShop().getId());
		productDTO.setStatus(product.getStatus());
		productDTO.setBarCode(product.getBarCode());
		return productDTO;
	}

	public Product toEntity(ProductDTO productDTO) {
		Product product = productRepository.findById(productDTO.getId()).orElse(new Product());
		product.setBarCode(productDTO.getBarCode());
		product.setName(productDTO.getName());
		product.setPrice(productDTO.getPrice());
		product.setCategory(categoryRepository.findById(productDTO.getCategoryId()).orElse(null));
		product.setAvailable(productDTO.getAvailable());
		product.setImportPrice(productDTO.getImportPrice());
		product.setShop(shopRepository.findById(productDTO.getShopId()).orElse(null));
		product.setStatus(productDTO.getStatus());
		return product;
	}
}
