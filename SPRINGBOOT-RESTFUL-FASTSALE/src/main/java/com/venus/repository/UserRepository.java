package com.venus.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.venus.entities.Shop;
import com.venus.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	Page<User> findByNameContainingOrEmailContainingAndStatus(String name, String email, int status, Pageable pageable);

	Page<User> findByShopAndNameContaining(Shop shop, String name, Pageable pageable);

	Optional<User> findByEmail(String email);

	Optional<User> findByEmailAndPassword(String email, String password);
}
