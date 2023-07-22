package com.venus.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.venus.entities.Category;
import com.venus.entities.Shop;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

	Page<Category> findByNameContaining(String name, Pageable pageable);

	Page<Category> findByShopAndNameContaining(Shop shop, String name, Pageable pageable);

}
