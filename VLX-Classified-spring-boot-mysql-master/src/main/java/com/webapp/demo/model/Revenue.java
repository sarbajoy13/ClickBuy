package com.webapp.demo.model;

import java.time.LocalDate;
import java.util.List;

public class Revenue {
    private List<LocalDate> listofdates;
    private List<Integer> noofsell;

    public Revenue(List<LocalDate> listofdates, List<Integer> noofsell) {
        this.listofdates = listofdates;
        this.noofsell = noofsell;
    }

    public List<LocalDate> getListofdates() {
        return listofdates;
    }

    public void setListofdates(List<LocalDate> listofdates) {
        this.listofdates = listofdates;
    }

    public List<Integer> getNoofsell() {
        return noofsell;
    }

    public void setNoofsell(List<Integer> noofsell) {
        this.noofsell = noofsell;
    }
}
