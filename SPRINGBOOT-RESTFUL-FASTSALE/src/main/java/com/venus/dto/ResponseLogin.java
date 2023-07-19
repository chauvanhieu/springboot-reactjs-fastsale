package com.venus.dto;

import lombok.Data;

@Data
public class ResponseLogin {
	UserDTO user;
	String accessToken;
}
