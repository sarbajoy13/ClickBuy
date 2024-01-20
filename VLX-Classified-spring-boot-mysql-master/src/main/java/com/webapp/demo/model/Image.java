package com.webapp.demo.model;

import javax.persistence.*;

@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int productId;

    @Lob
    private Byte[] image;

    public Image() {
    }

    public Image(int id, int productId, Byte[] image) {
        this.id = id;
        this.productId = productId;
        this.image = image;
    }

    public Image(int productId, Byte[] image) {
        this.productId = productId;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public Byte[] getImage() {
        return image;
    }

    public void setImage(Byte[] image) {
        this.image = image;
    }
}
