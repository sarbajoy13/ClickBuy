package com.webapp.demo.model;

import java.util.List;

public class ProductDetail {
    private Products product;
    private List<Image> images;

    public ProductDetail(Products product, List<Image> images) {
        this.product = product;
        this.images = images;
    }

    public ProductDetail() {
    }

    public Products getProduct() {
        return product;
    }

    public void setProduct(Products product) {
        this.product = product;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }
}
