package com.webapp.demo.model;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// @Data to get getters and setters
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String username;
	private String email;
	private String password;
	private String contact;
	private String address;
	private boolean primemember;
	private String role;
	//@Column(name = "credit_card")
	private long creditCard;
	public boolean isPrimemember() {
		return primemember;
	}
	public void setPrimemember(boolean primemember) {
		this.primemember = primemember;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	 
	public long getCreditCard() {
		return creditCard;
	}
	public void setCreditCard(long creditCard) {
		this.creditCard = creditCard;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}

	public User(String email, String password, String role) {
		this.email = email;
		this.password = password;
		this.role = role;
	}
}