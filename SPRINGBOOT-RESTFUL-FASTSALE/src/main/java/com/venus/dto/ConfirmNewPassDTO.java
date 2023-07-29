package com.venus.dto;

import lombok.Data;

@Data
public class ConfirmNewPassDTO {
	int id;
	String password;
	String repeatPassword;
}
