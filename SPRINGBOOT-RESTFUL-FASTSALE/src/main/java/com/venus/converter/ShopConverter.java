package com.venus.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.venus.dto.ShopDTO;
import com.venus.entities.Shop;
import com.venus.repository.ShopRepository;

@Component
public class ShopConverter {

	@Autowired
	private ShopRepository shopRepository;

	public ShopDTO toDTO(Shop shop) {
		ShopDTO shopDTO = new ShopDTO();
		shopDTO.setId(shop.getId());
		shopDTO.setName(shop.getName());

		shopDTO.setStatus(shop.getStatus());
		return shopDTO;
	}

	public Shop toEntity(ShopDTO shopDTO) {
		Shop shop = shopRepository.findById(shopDTO.getId()).orElse(new Shop());

		shop.setName(shopDTO.getName());

		shop.setStatus(shopDTO.getStatus());
		return shop;
	}
}
