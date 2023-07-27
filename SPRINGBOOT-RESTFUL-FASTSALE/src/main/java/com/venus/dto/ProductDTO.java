package com.venus.dto;

import lombok.Data;

@Data
public class ProductDTO {

	private int id;
	private String name;
	private double price;
	private int categoryId;
	private String categoryName;
	private int available;
	private double importPrice;
	private int shopId;
	private int status;
	private String barcode;
	// Constructors, Getters and Setters
}
