package com.parking.backend.Controllers;


import com.parking.backend.Models.Vehicle;
import com.parking.backend.Services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {


    @Autowired
    private VehicleService vehicleService;

    // Obtener todos los vehículos
    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        List<Vehicle> vehicles = vehicleService.findAll();
        return new ResponseEntity<>(vehicles, HttpStatus.OK);
    }


    // Crear o actualizar un vehículo
    @PostMapping
    public ResponseEntity<Vehicle> createOrUpdateVehicle(@RequestBody Vehicle vehicle) {
    Vehicle savedVehicle = this.vehicleService.saveOrUpdateVehicle(vehicle);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedVehicle);
    }


    // Obtener un vehículo por placa
    @GetMapping("/licencePlate/{licencePlate}")
    public ResponseEntity<?> getVehicleByLicencePlate(@PathVariable String licencePlate) {
        Optional<Vehicle> vehicle = vehicleService.findByLicencePlate(licencePlate.toUpperCase());
        if (vehicle.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vehiculo  por licencia no encontrado");
        }
        return ResponseEntity.status(HttpStatus.OK).body(vehicle.get());
    }


    // Obtener un vehículo por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getVehicleById(@PathVariable Long id) {
        Optional<Vehicle> vehicle = vehicleService.findVehicleById(id);
        if (vehicle.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vehiculo por id "+ id + "no encontrado");
        }
        return ResponseEntity.status(HttpStatus.OK).body(vehicle.get());
    }



    // Eliminar un vehículo por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVehicleById(@PathVariable Long id) {
        boolean vehicleDeleted = this.vehicleService.deleteById(id);
        if (!vehicleDeleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vehículo con id " +id + " no encontrado");
        }
        return ResponseEntity.ok().body("Vehículo con id :"  + id + " eliminado correctamente");
    }


}
