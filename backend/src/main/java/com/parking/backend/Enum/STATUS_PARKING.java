package com.parking.backend.Enum;

public enum STATUS_PARKING {

    IN_PROGRESS("IN_PROGRESS"),
    COMPLETED("COMPLETED"),
    CANCELED("CANCELED");


    private String description;

    private STATUS_PARKING(String description){
        this.description=description;
    }


    public String getDescription(){
        return this.description;
    }



}
