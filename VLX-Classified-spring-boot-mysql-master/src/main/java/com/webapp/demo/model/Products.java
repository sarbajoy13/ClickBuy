package com.webapp.demo.model;

import javax.persistence.*;

@Entity
public class Products {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String brand;
	private String description;
	private int usedyr;
	private String category;
	private boolean old;
	private String condi;
	private boolean donation;
	private long price;
	private boolean negotiable;
	private String loc;
	private String createddate;
	private int createdby;
	private String status;

	@Lob
	private Byte[] image;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getUsedyr() {
		return usedyr;
	}

	public void setUsedyr(int usedyr) {
		this.usedyr = usedyr;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public boolean isOld() {
		return old;
	}

	public void setOld(boolean old) {
		this.old = old;
	}

	public String getCondi() {
		return condi;
	}

	public void setCondi(String condi) {
		this.condi = condi;
	}

	public long getPrice() {
		return price;
	}

	public void setPrice(long price) {
		this.price = price;
	}

	public boolean isNegotiable() {
		return negotiable;
	}

	public void setNegotiable(boolean negotiable) {
		this.negotiable = negotiable;
	}

	public String getLoc() {
		return loc;
	}

	public void setLoc(String loc) {
		this.loc = loc;
	}

	public String getCreateddate() {
		return createddate;
	}

	public void setCreateddate(String createddate) {
		this.createddate = createddate;
	}

	public int getCreatedby() {
		return createdby;
	}

	public void setCreatedby(int createdby) {
		this.createdby = createdby;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Byte[] getImage() {
		return image;
	}

	public void setImage(Byte[] image) {
		this.image = image;
	}

	public boolean isDonation() {
		return donation;
	}

	public void setDonation(boolean donation) {
		this.donation = donation;
	}
}
