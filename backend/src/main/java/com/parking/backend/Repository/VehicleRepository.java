package com.parking.backend.Repository;

import com.parking.backend.Models.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle,Long> {

  Optional<Vehicle> findByLicencePlate(String licence);

}
