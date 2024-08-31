package com.parking.backend.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.parking.backend.Enum.STATUS_PARKING;
import com.parking.backend.Models.Parking;


@Repository
public interface ParkingRepository extends JpaRepository<Parking,Long > {

    Optional<Parking> findByVehicleId(Long vehicleId);


    // Método para encontrar un parking en progreso
   

    /**
       METODO VIEJO QUE TRAIA UNA LISTA 
    
        @Query("SELECT p FROM Parking p JOIN p.vehicle v WHERE LOWER(v.licencePlate) = LOWER(:licencePlate)")
        List<Parking> findByVehicleLicencePlate(@Param("licencePlate") String licencePlate);
 
     */

      // Page<Parking> findByVehicleLicencePlate(String licencePlate,Pageable pageable);



     List<Parking> findByVehicleLicencePlate(String licencePlate);

    List<Parking> findByStatus(STATUS_PARKING status);
}





