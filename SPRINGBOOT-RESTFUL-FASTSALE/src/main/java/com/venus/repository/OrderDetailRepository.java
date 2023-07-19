package com.venus.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.venus.entities.Order;
import com.venus.entities.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
	void deleteAllByOrder(Order order);

}
