package com.venus.dto;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class OrderDTO {

	private int id;
	private int shopId;
	private int userId;
	private double price;
	private Date createdAt;
	private String orderType;
	private List<OrderDetailDTO> OrderDetails;
	private int status;

}
