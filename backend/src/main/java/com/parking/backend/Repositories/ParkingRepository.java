package com.parking.backend.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.parking.backend.Enum.STATUS_PARKING;
import com.parking.backend.Enum.TYPE_VEHICLE;
import com.parking.backend.Models.Parking;

@Repository
public interface ParkingRepository extends JpaRepository<Parking, Long> {

        Optional<Parking> findByVehicleId(Long vehicleId);

        /**
         * METODO VIEJO QUE TRAIA UNA LISTA
         * 
         * @Query("SELECT p FROM Parking p JOIN p.vehicle v WHERE LOWER(v.licencePlate)
         * = LOWER(:licencePlate)")
         * List<Parking> findByVehicleLicencePlate(@Param("licencePlate") String
         * licencePlate);
         * 
         */

        List<Parking> findByVehicleLicencePlate(String licencePlate);

        List<Parking> findByStatus(STATUS_PARKING status);

        // Paginado

        // Page<Parking> findByVehicleLicencePlate(String licencePlate,Pageable
        // pageable);

        // metodo para paginar todos los parkings
        @SuppressWarnings("null")
        Page<Parking> findAll(Pageable pageable);

        // metodo para paginar los aprkings por la matricula
        Page<Parking> findByVehicleLicencePlate(String licencePlate, Pageable pageable);

        Page<Parking> findByStatusAndVehicleTypeVehicle(STATUS_PARKING status, TYPE_VEHICLE type_vehicle, Pageable pageable);


        /**
         * 
         * 
        Page<Parking> findByStatus(STATUS_PARKING status, Pageable pageable);

        @Query("SELECT p FROM Parking p WHERE p.vehicle.typeVehicle := typeVehicle")
        Page<Parking> findByTypeVehicle(@Param("typeVehicle")
         TYPE_VEHICLE typeVehicle, Pageable pageable);
         * 
         */

}

