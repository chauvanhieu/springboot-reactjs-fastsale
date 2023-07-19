package com.venus.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.venus.entities.Shop;

public interface ShopRepository extends JpaRepository<Shop, Integer> {
	Page<Shop> findByNameContainingAndStatus(String name, int status, Pageable pageable);

}
