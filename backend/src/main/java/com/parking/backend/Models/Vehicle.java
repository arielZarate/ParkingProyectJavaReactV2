package com.parking.backend.Models;


import com.parking.backend.Enum.COLOR;
import com.parking.backend.Enum.TYPE_VEHICLE;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Vehicle")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(name="type_vehicle",nullable = false)
    private TYPE_VEHICLE typeVehicle;
    @Column(name="licence_plate",nullable = false,unique = true)
    private String licencePlate;
    @Enumerated(EnumType.STRING)
    @Column(name="color",nullable = true)
    private COLOR color;
    @Column(name="note",nullable = true)
    private String note;



    //@OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  // @JsonManagedReference
     //private List<Parking> parkings;


    // Constructor por defecto
   // public Vehicle() {}  creado con LOMBOK

    // Constructor completo (sin id, ya que se genera automáticamente)
    public Vehicle(TYPE_VEHICLE typeVehicle, String licencePlate, COLOR color,String note) {
        this.typeVehicle = typeVehicle;
        this.licencePlate = licencePlate;
        this.color = color;
        this.note=note;
    }

    // Constructor con campos obligatorios
    public Vehicle(TYPE_VEHICLE typeVehicle, String licencePlate) {
        this.typeVehicle = typeVehicle;
        this.licencePlate = licencePlate;
    }

    // Constructor con tipo de vehículo, placa, color
    public Vehicle(TYPE_VEHICLE typeVehicle, String licencePlate, COLOR color) {
        this.typeVehicle = typeVehicle;
        this.licencePlate = licencePlate;
        this.color = color;
    }


    // Constructor con tipo de vehículo, placa y note
    public Vehicle(TYPE_VEHICLE typeVehicle, String licencePlate, String note) {
        this.typeVehicle = typeVehicle;
        this.licencePlate = licencePlate;
        this.note = note;
    }







}
