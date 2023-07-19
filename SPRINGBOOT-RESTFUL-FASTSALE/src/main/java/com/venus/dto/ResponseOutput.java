package com.venus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseOutput<T> {
	int page;
	int limit;
	int totalPages;
	T data;
}
