package com.venus.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.venus.converter.OrderConverter;
import com.venus.converter.OrderDetailConverter;
import com.venus.dto.OrderDTO;
import com.venus.dto.OrderDetailDTO;
import com.venus.dto.ResponseOutput;
import com.venus.entities.Order;
import com.venus.entities.OrderDetail;
import com.venus.entities.Product;
import com.venus.entities.Shop;
import com.venus.repository.OrderDetailRepository;
import com.venus.repository.OrderRepository;
import com.venus.repository.ProductRepository;
import com.venus.repository.ShopRepository;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	OrderRepository orderRepository;
	@Autowired
	OrderDetailRepository orderDetailRepository;
	@Autowired
	ProductRepository productRepository;
	@Autowired
	ShopRepository shopRepository;
	@Autowired
	OrderConverter orderConverter;
	@Autowired
	OrderDetailConverter orderDetailConverter;

	private static final int DEFAULT_PAGE = 1;
	private static final int DEFAULT_LIMIT = 999999;
	private static final double MIN_PRICE = Double.MIN_VALUE;
	private static final double MAX_PRICE = Double.MAX_VALUE;
	private static final String ORDER_TYPE = "EXPORT";

	@GetMapping
	public ResponseEntity<ResponseOutput<List<OrderDTO>>> getAll(
			@RequestParam(value = "page", defaultValue = "1") int page,
			@RequestParam(value = "limit", defaultValue = "999999") int limit,
			@RequestParam(value = "order_by", defaultValue = "desc") String orderBy,
			@RequestParam(value = "sort_by", defaultValue = "id") String sortBy,
			@RequestParam(value = "min_price", required = false) Optional<Double> minPrice,
			@RequestParam(value = "max_price", required = false) Optional<Double> maxPrice,
			@RequestParam(value = "shop_id", defaultValue = "0") int shopId,
			@RequestParam(value = "start_date", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
			@RequestParam(value = "end_date", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {

		try {
			if (page < 1) {
				page = DEFAULT_PAGE;
			}
			if (limit < 1) {
				limit = DEFAULT_LIMIT;
			}

			double min = minPrice.orElse(MIN_PRICE);
			double max = maxPrice.orElse(MAX_PRICE);
			if (min < 1) {
				min = MIN_PRICE;
			}
			if (max < 10) {
				max = MIN_PRICE;
			}

			Optional<Shop> shop = shopRepository.findById(shopId);

			Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(
					orderBy.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, sortBy.toLowerCase()));

			Page<Order> pageOrder;

			if (shopId == 0) {
				if (startDate != null && endDate != null) {
					pageOrder = orderRepository.findByPriceBetweenAndCreatedAtBetweenAndOrderType(min, max, startDate,
							endDate, ORDER_TYPE, pageable);
				} else {
					pageOrder = orderRepository.findByPriceBetweenAndOrderType(min, max, ORDER_TYPE, pageable);
				}
			} else {
				if (shop.isPresent()) {
					if (startDate != null && endDate != null) {
						pageOrder = orderRepository.findByShopAndPriceBetweenAndCreatedAtBetweenAndOrderType(shop.get(),
								min, max, startDate, endDate, ORDER_TYPE, pageable);
					} else {
						pageOrder = orderRepository.findByShopAndPriceBetweenAndOrderType(shop.get(), min, max,
								ORDER_TYPE, pageable);
					}
				} else {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			}

			if (pageOrder.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			List<OrderDTO> DTOs = new ArrayList<>();
			for (Order item : pageOrder) {
				DTOs.add(orderConverter.toDTO(item));
			}

			ResponseOutput<List<OrderDTO>> output = new ResponseOutput<>();
			output.setData(DTOs);
			output.setLimit(limit);
			output.setPage(page);
			output.setTotalPages(pageOrder.getTotalPages());

			return new ResponseEntity<>(output, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<OrderDTO> getOrderById(@PathVariable("id") int orderId) {
		try {

			Optional<Order> optionalOrder = orderRepository.findByIdAndOrderType(orderId, ORDER_TYPE);
			if (optionalOrder.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}

			Order order = optionalOrder.get();

			OrderDTO orderDTO = orderConverter.toDTO(order);

			return new ResponseEntity<>(orderDTO, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping
	public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO orderDTO) {
		try {

			Order order = orderConverter.toEntity(orderDTO);
			order.setOrderType(ORDER_TYPE);
			order.setCreatedAt(new Date());
			Order savedOrder = orderRepository.save(order);
			if (order.getOrderDetails().size() > 0) {
				order.getOrderDetails().forEach(item -> {
					item.setOrder(savedOrder);
					orderDetailRepository.save(item);
					Product product = item.getProduct();
					product.setAvailable(product.getAvailable() - item.getCount());
					productRepository.save(product);
				});
			}

			OrderDTO savedOrderDTO = orderConverter.toDTO(savedOrder);

			return new ResponseEntity<>(savedOrderDTO, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<OrderDTO> updateOrder(@PathVariable("id") int orderId, @RequestBody OrderDTO orderDTO) {
		try {

			Optional<Order> optionalOrder = orderRepository.findById(orderId);
			if (optionalOrder.isPresent()) {
				Order order = optionalOrder.get();

				for (OrderDetail item : order.getOrderDetails()) {
					orderDetailRepository.delete(item);
					Product p = item.getProduct();
					p.setAvailable(p.getAvailable() + item.getCount());
					productRepository.save(p);
				}

				// Cập nhật số lượng tồn kho sản phẩm và thêm chi tiết đơn hàng mới
				List<OrderDetailDTO> orderDetails = orderDTO.getOrderDetails();
				order.setOrderDetails(new ArrayList<>());
				for (OrderDetailDTO orderDetailDTO : orderDetails) {
					int productId = orderDetailDTO.getProductId();
					int count = orderDetailDTO.getCount();

					Optional<Product> optionalProduct = productRepository.findById(productId);
					if (optionalProduct.isPresent()) {
						Product product = optionalProduct.get();

						// Cập nhật số lượng tồn kho
						int available = product.getAvailable() - count;
						product.setAvailable(available);

						// Thêm chi tiết đơn hàng mới
						OrderDetail orderDetail = new OrderDetail();
						orderDetail.setOrder(order);
						orderDetail.setProduct(product);
						orderDetail.setCount(count);
						orderDetail.setStatus(orderDTO.getStatus());

						order.addOrderDetail(orderDetail);

						productRepository.save(product);
						orderDetailRepository.save(orderDetail);
					} else {
						return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
					}
				}

				// Cập nhật thông tin đơn hàng
				order.setPrice(orderDTO.getPrice());
				order.setCreatedAt(orderDTO.getCreatedAt());
				order.setOrderType(orderDTO.getOrderType());
				order.setStatus(orderDTO.getStatus());

				// Lưu cập nhật thông tin đơn hàng vào cơ sở dữ liệu

				Order o = orderRepository.save(order);

				return ResponseEntity.ok(orderConverter.toDTO(o));
			} else {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

}
