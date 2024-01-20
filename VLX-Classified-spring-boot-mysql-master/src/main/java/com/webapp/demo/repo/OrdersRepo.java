package com.webapp.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webapp.demo.model.Orders;

@Repository
public interface OrdersRepo extends JpaRepository<Orders, Integer>, OrderRepoCustom{

}
