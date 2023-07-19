package com.venus.repository;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.venus.entities.Order;
import com.venus.entities.Shop;

public interface OrderRepository extends JpaRepository<Order, Integer> {
	Page<Order> findByPriceBetweenAndCreatedAtBetweenAndOrderType(double min, double max, Date startDate, Date endDate,
			String type, Pageable pageable);

	Page<Order> findByShopAndPriceBetweenAndCreatedAtBetweenAndOrderType(Shop shop, double minPrice, double maxPrice,
			Date startDate, Date endDate, String type, Pageable pageable);

	Page<Order> findByPriceBetweenAndOrderType(double min, double max, String type, Pageable pageable);

	Page<Order> findByShopAndPriceBetweenAndOrderType(Shop shop, double min, double max, String type,
			Pageable pageable);

	Optional<Order> findByIdAndOrderType(int id, String type);
}
