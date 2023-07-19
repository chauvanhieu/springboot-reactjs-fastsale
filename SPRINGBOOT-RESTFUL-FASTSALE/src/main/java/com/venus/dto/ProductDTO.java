package com.venus.dto;

import lombok.Data;

@Data
public class ProductDTO {

	private int id;
	private String name;
	private double price;
	private int categoryId;
	private int available;
	private double importPrice;
	private int shopId;
	private int status;

	// Constructors, Getters and Setters
}
