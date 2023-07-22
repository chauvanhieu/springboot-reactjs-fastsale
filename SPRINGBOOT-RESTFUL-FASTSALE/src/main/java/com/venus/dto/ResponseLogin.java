package com.venus.dto;

import lombok.Data;

@Data
public class ResponseLogin {
	UserDTO user;
	ShopDTO shop;
	String accessToken;
}
