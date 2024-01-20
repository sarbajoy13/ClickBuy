package com.webapp.demo.model;

import java.util.List;

public class OrderRequest {
	private int buyerid;
	private List<Integer> prdtids;
	private long price;
	private long buyercardno;
	public int getBuyerid() {
		return buyerid;
	}
	public void setBuyerid(int buyerid) {
		this.buyerid = buyerid;
	}
	public List<Integer> getPrdtids() {
		return prdtids;
	}
	public void setPrdtids(List<Integer> prdtids) {
		this.prdtids = prdtids;
	}
	public long getPrice() {
		return price;
	}
	public void setPrice(long price) {
		this.price = price;
	}
	public long getBuyercardno() {
		return buyercardno;
	}
	public void setBuyercardno(long buyercardno) {
		this.buyercardno = buyercardno;
	}
}
