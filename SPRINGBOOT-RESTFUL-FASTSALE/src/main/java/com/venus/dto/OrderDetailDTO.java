package com.venus.dto;

import lombok.Data;

@Data
public class OrderDetailDTO {

	private int id;
	private int orderId;
	private int productId;
	private String productName;
	private double price;
	private int count;
	private int status;

}
