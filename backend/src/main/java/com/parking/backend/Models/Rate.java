package com.parking.backend.Models;

import com.parking.backend.Enum.TYPE_VEHICLE;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "Rate")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Rate implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Enumerated(EnumType.STRING)
    @Column(name="type_vehicle",nullable = false)
    private TYPE_VEHICLE typeVehicle;

    @Column(name="cost_per_hour",nullable = false)
    private  Double costPerHour;



}

