package com.webapp.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int buyerid;
	private String prdtids;
	private long price;

	private String createddate;
	public String getCreateddate() {
		return createddate;
	}

	public void setCreateddate(String createddate) {
		this.createddate = createddate;
	}

	private int rating;
	private String feedback;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getBuyerid() {
		return buyerid;
	}
	public void setBuyerid(int buyerid) {
		this.buyerid = buyerid;
	}
	public String getPrdtids() {
		return prdtids;
	}
	public void setPrdtids(String prdtids) {
		this.prdtids = prdtids;
	}
	public long getPrice() {
		return price;
	}
	public void setPrice(long price) {
		this.price = price;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public String getFeedback() {
		return feedback;
	}
	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}
	
}
