package com.webapp.demo.repo;

import com.webapp.demo.model.Orders;
import com.webapp.demo.model.Products;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class OrderRepoImpl implements OrderRepoCustom{

    @Autowired
    OrdersRepo ordersRepo;

    @Override
    public List<Orders> findByBuyerid(int id){
        List<Orders> ordersList = ordersRepo.findAll();
        List<Orders> selectedOrders = new ArrayList<>();
        for(Orders item : ordersList){
            if(item.getBuyerid() == id){
                selectedOrders.add(item);
            }
        }
        return selectedOrders;
    }
}
