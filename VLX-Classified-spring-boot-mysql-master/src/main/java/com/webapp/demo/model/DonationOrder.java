package com.webapp.demo.model;

import java.util.List;

public class DonationOrder {
    private int buyerid;
    private List<Integer> prdtids;

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
}
