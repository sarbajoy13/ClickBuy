package com.webapp.demo.repo;

import com.webapp.demo.model.Products;

import java.util.List;

public interface ProductRepoCustom {

    List<Products> findByCategory(String category);
    List<Products> findByCreatedby(int id);
}
