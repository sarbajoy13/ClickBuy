package com.webapp.demo.model;

public class ResponseModel {

    private boolean success;
    private String message;

    public ResponseModel(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public ResponseModel() {
    }

    public ResponseModel(boolean success) {
        this.success = success;
        this.message = "";
    }

    public boolean isResponseType() {
        return success;
    }

    public void setResponseType(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}