package com.venus.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.venus.entities.Category;
import com.venus.entities.Shop;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

	Page<Category> findByNameContainingAndStatus(String name, int status, Pageable pageable);

	Page<Category> findByShopAndNameContainingAndStatus(Shop shop, String name, int status, Pageable pageable);

}
