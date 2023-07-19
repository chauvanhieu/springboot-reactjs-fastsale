package com.venus.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

/**
 * The persistent class for the shop database table.
 * 
 */
@Entity
@NamedQuery(name = "Shop.findAll", query = "SELECT s FROM Shop s")
public class Shop implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	private int status;

	// bi-directional many-to-one association to Category
	@OneToMany(mappedBy = "shop")
	private List<Category> categories;

	// bi-directional many-to-one association to User
	@OneToMany(mappedBy = "shop")
	private List<User> users;

	// bi-directional many-to-one association to Product
	@OneToMany(mappedBy = "shop")
	private List<Product> products;

	public Shop() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public List<Category> getCategories() {
		return this.categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

	public Category addCategory(Category category) {
		getCategories().add(category);
		category.setShop(this);

		return category;
	}

	public Category removeCategory(Category category) {
		getCategories().remove(category);
		category.setShop(null);

		return category;
	}

	public List<User> getUsers() {
		return this.users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public User addUser(User user) {
		getUsers().add(user);
		user.setShop(this);

		return user;
	}

	public User removeUser(User user) {
		getUsers().remove(user);
		user.setShop(null);

		return user;
	}

	public List<Product> getProducts() {
		return this.products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public Product addProduct(Product product) {
		getProducts().add(product);
		product.setShop(this);

		return product;
	}

	public Product removeProduct(Product product) {
		getProducts().remove(product);
		product.setShop(null);

		return product;
	}

}