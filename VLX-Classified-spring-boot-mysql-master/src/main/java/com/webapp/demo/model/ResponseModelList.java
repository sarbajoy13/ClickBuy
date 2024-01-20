package com.webapp.demo.model;

import java.util.List;

public class ResponseModelList<T> extends ResponseModel {

    private List<T> results;

    public ResponseModelList(boolean success, List<T> results) {
        super(success);
        this.results = results;
    }

    public ResponseModelList(boolean success, String message, List<T> results) {
        super(success, message);
        this.results=results;
    }

    public List<T> getResults() {
        return results;
    }

    public void setResults(List<T> results) {
        this.results = results;
    }
}