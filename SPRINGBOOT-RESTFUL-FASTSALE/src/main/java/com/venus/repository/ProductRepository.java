package com.venus.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.venus.entities.Category;
import com.venus.entities.Product;
import com.venus.entities.Shop;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	Page<Product> findByNameContainingAndStatusAndPriceBetweenAndShop(String name, int status, double min, double max,
			Shop shop, Pageable pageable);

	Page<Product> findByCategoryAndNameContainingAndStatusAndPriceBetweenAndShop(Category category, String name,
			int status, double min, double max, Shop shop, Pageable pageable);

	Page<Product> findByShopAndNameContainingAndStatusAndPriceBetween(Shop shop, String name, int status, double min,
			double max, Pageable pageable);

	Page<Product> findByNameContainingAndStatusAndPriceBetween(String name, int status, double min, double max,
			Pageable pageable);

	Page<Product> findByCategoryAndNameContainingAndStatusAndPriceBetween(Category category, String name, int status,
			double min, double max, Pageable pageable);

	Page<Product> findByCategoryAndShopAndNameContainingAndStatusAndPriceBetween(Category category, Shop shop,
			String name, int status, double min, double max, Pageable pageable);
}
