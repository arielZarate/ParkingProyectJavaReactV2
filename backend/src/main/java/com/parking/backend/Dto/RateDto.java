package com.parking.backend.Dto;


import com.parking.backend.Enum.TYPE_VEHICLE;
import com.parking.backend.Models.Rate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RateDto {
    private Long id;
    private String typeVehicle; // Usar String para representar el Enum
    private Double costPerHour;


//clase wrapper

  //peudo agregar validaciones aca

//    Este enfoque asegura que la API devuelva datos en el formato RateDto, proporcionando una
//    capa de abstracción entre el modelo interno y la representación pública.
//    Así, puedo cambiar la implementación interna sin afectar a los consumidores de tu API.


    // Método estático para convertir de Rate a RateDto
    public static RateDto fromRate(Rate rate) {
        return RateDto.builder()
                .id(rate.getId())
                .typeVehicle(rate.getTypeVehicle().name()) // Convertir el Enum a String
                .costPerHour(rate.getCostPerHour())
                .build();
    }

    // Método para convertir de RateDto a Rate
    public Rate toRate() {
        return Rate.builder()
                .id(this.id)
                .typeVehicle(TYPE_VEHICLE.valueOf(this.typeVehicle)) // Convertir de String a Enum
                .costPerHour(this.costPerHour)
                .build();
    }






}