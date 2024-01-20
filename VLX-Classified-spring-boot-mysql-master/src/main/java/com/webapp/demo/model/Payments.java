package com.webapp.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class Payments {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int buyerid;
	private int prdtid;
	private long buyercardno;
	private long price;
	private int sellerid;
	private long sellercardno;
	private LocalDate date;

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

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

	public int getPrdtid() {
		return prdtid;
	}

	public void setPrdtid(int prdtid) {
		this.prdtid = prdtid;
	}

	public long getBuyercardno() {
		return buyercardno;
	}

	public void setBuyercardno(long buyercardno) {
		this.buyercardno = buyercardno;
	}

	public long getPrice() {
		return price;
	}

	public void setPrice(long price) {
		this.price = price;
	}

	public int getSellerid() {
		return sellerid;
	}

	public void setSellerid(int sellerid) {
		this.sellerid = sellerid;
	}

	public long getSellercardno() {
		return sellercardno;
	}

	public void setSellercardno(long sellercardno) {
		this.sellercardno = sellercardno;
	}
}
