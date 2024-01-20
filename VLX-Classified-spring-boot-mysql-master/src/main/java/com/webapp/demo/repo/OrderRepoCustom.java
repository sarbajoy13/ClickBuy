package com.webapp.demo.repo;

import com.webapp.demo.model.Orders;

import java.util.List;

public interface OrderRepoCustom {

    List<Orders> findByBuyerid(int id);
}
