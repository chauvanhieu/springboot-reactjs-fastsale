package com.venus.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.venus.dto.OrderDTO;
import com.venus.dto.OrderDetailDTO;
import com.venus.entities.Order;
import com.venus.entities.OrderDetail;
import com.venus.repository.OrderRepository;
import com.venus.repository.ShopRepository;
import com.venus.repository.UserRepository;

@Component
public class OrderConverter {

	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private OrderDetailConverter orderDetailConverter;
	@Autowired
	private ShopRepository shopRepository;
	@Autowired
	private UserRepository userRepository;

	public OrderDTO toDTO(Order order) {
		OrderDTO orderDTO = new OrderDTO();
		orderDTO.setId(order.getId());
		orderDTO.setShopId(order.getShop().getId());
		orderDTO.setUserId(order.getUser().getId());
		orderDTO.setPrice(order.getPrice());
		orderDTO.setCreatedAt(order.getCreatedAt());
		orderDTO.setOrderType(order.getOrderType());
		orderDTO.setStatus(order.getStatus());

		List<OrderDetailDTO> listOrderDetail = new ArrayList<>();
		if (order.getOrderDetails().size() > 0) {
			for (OrderDetail item : order.getOrderDetails()) {
				listOrderDetail.add(orderDetailConverter.toDTO(item));
			}
		}
		orderDTO.setOrderDetails(listOrderDetail);
		return orderDTO;
	}

	public Order toEntity(OrderDTO orderDTO) {
		Order order = orderRepository.findById(orderDTO.getId()).orElse(new Order());

		order.setPrice(orderDTO.getPrice());
		order.setCreatedAt(orderDTO.getCreatedAt());
		order.setOrderType(orderDTO.getOrderType());
		order.setShop(shopRepository.findById(orderDTO.getShopId()).orElse(null));
		order.setStatus(orderDTO.getStatus());
		order.setUser(userRepository.findById(orderDTO.getUserId()).orElse(null));
		List<OrderDetail> listOrderDetail = new ArrayList<>();
		if (orderDTO.getOrderDetails().size() > 0) {
			for (OrderDetailDTO item : orderDTO.getOrderDetails()) {
				listOrderDetail.add(orderDetailConverter.toEntity(item));
			}
		}
		order.setOrderDetails(listOrderDetail);
		return order;
	}
}
