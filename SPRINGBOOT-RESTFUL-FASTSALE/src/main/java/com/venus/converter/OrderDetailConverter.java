package com.venus.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.venus.dto.OrderDetailDTO;
import com.venus.entities.OrderDetail;
import com.venus.repository.OrderDetailRepository;
import com.venus.repository.OrderRepository;
import com.venus.repository.ProductRepository;

@Component
public class OrderDetailConverter {

	@Autowired
	private OrderDetailRepository orderDetailRepository;
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private ProductRepository productRepository;

	public OrderDetailDTO toDTO(OrderDetail orderDetail) {
		OrderDetailDTO orderDetailDTO = new OrderDetailDTO();
		orderDetailDTO.setId(orderDetail.getId());
		orderDetailDTO.setPrice(orderDetail.getProduct().getPrice());
		orderDetailDTO.setProductName(orderDetail.getProduct().getName());
		orderDetailDTO.setOrderId(orderDetail.getOrder().getId());
		orderDetailDTO.setProductId(orderDetail.getProduct().getId());
		orderDetailDTO.setCount(orderDetail.getCount());
		orderDetailDTO.setStatus(orderDetail.getStatus());
		return orderDetailDTO;
	}

	public OrderDetail toEntity(OrderDetailDTO orderDetailDTO) {
		OrderDetail orderDetail = orderDetailRepository.findById(orderDetailDTO.getId()).orElse(new OrderDetail());

		orderDetail.setOrder(orderRepository.findById(orderDetailDTO.getOrderId()).orElse(null));
		orderDetail.setProduct(productRepository.findById(orderDetailDTO.getProductId()).orElse(null));
		orderDetail.setCount(orderDetailDTO.getCount());
		orderDetail.setStatus(orderDetailDTO.getStatus());
		return orderDetail;
	}
}
