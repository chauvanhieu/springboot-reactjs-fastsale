package com.venus.dto;

import lombok.Data;

@Data
public class UserDTO {

	private int id;
	private String name;
	private String email;
	private String password;
	private int shopId;
	private String role;
	private int status;

	// Constructors, Getters and Setters
}
