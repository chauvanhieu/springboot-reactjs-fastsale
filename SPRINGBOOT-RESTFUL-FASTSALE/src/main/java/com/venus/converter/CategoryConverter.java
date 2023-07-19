package com.venus.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.venus.dto.CategoryDTO;
import com.venus.entities.Category;
import com.venus.repository.CategoryRepository;
import com.venus.repository.ShopRepository;

@Component
public class CategoryConverter {

	@Autowired
	private CategoryRepository categoryRepository;
	@Autowired
	private ShopRepository shopRepository;

	public CategoryDTO toDTO(Category category) {
		CategoryDTO categoryDTO = new CategoryDTO();
		categoryDTO.setId(category.getId());
		categoryDTO.setName(category.getName());
		categoryDTO.setShopId(category.getShop().getId());
		categoryDTO.setStatus(category.getStatus());
		return categoryDTO;
	}

	public Category toEntity(CategoryDTO categoryDTO) {
		Category category = categoryRepository.findById(categoryDTO.getId()).orElse(new Category());

		category.setName(categoryDTO.getName());
		category.setShop(shopRepository.findById(categoryDTO.getShopId()).orElse(null));
		category.setStatus(categoryDTO.getStatus());
		return category;
	}
}
