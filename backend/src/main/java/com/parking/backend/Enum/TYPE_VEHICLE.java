package com.parking.backend.Enum;



public enum TYPE_VEHICLE {
    CAR("Automóvil"),            // Automóvil con tarifa base
    MOTORCYCLE("Motocicleta"),  // Motocicleta con tarifa reducida
    TRUCK("Vehículo utilitario"), // Camión con tarifa aumentada
    BICYCLE("Bicicleta") ;        //Bicicleta

    private  String description;
   private TYPE_VEHICLE(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
