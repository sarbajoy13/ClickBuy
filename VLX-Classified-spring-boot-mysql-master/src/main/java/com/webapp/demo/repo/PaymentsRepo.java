package com.webapp.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webapp.demo.model.Payments;

import java.util.List;

@Repository
public interface PaymentsRepo extends JpaRepository<Payments, Integer>{
    List<Payments> findBySellerid(int sellerid);
}
