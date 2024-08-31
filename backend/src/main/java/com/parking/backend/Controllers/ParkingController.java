package com.parking.backend.Controllers;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parking.backend.Enum.STATUS_PARKING;
import com.parking.backend.Models.Parking;
import com.parking.backend.Models.Vehicle;
import com.parking.backend.Services.ParkingService;

@RestController
@RequestMapping("/api/parking")
@CrossOrigin(origins = "http://localhost:3000")
public class ParkingController {

@Autowired
    private ParkingService parkingService;



    @GetMapping
    public ResponseEntity<List<Parking>> getAllParking(){
        List<Parking> parkings= parkingService.findAllParking();
     //   return ResponseEntity.ok().body(parking);
        return new ResponseEntity<>(parkings, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getParkingById(@PathVariable Long id){
        Optional<Parking> parkingOpt= parkingService.getParkingById(id);

        if(parkingOpt.isPresent())
        {
            return new ResponseEntity<>(parkingOpt.get(), HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Parking por id: " +id+ "no encontrado");
    }



    @PostMapping("/save/{employeeId}")
    public ResponseEntity<?> saveParking(
            @RequestBody Vehicle vehicle,
            @PathVariable Long employeeId) {

            Parking savedParking = parkingService.saveParking( vehicle, employeeId);
            return  ResponseEntity.status(HttpStatus.CREATED).body(savedParking);

    }



    @GetMapping("/licencePlate/{licencePlate}")
    public ResponseEntity<List<?>> getParkingByLicence(@PathVariable String licencePlate){

        List<Parking> parking= parkingService.getParkingByLicencePlate(licencePlate);

        return  ResponseEntity.status(HttpStatus.OK).body(parking);
    }



    @GetMapping("/status/{status}")
    public ResponseEntity<List<?>> getParkingByStatus(@PathVariable STATUS_PARKING status){

        List<Parking> parking= parkingService.findParkingByStatus(status);

        return  ResponseEntity.status(HttpStatus.OK).body(parking);
    }



    @PostMapping("/finalize/{licencePlate}")
    public ResponseEntity<?> finalizeParking(@PathVariable String licencePlate) {
        Parking finalizedParking = parkingService.finalizeParking(licencePlate);
            return new ResponseEntity<>(finalizedParking, HttpStatus.OK);

    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteParking(@PathVariable Long id) {
        boolean deleteParking = parkingService.deleteParking(id);
        if (!deleteParking) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("parking con id " +id + " no encontrado");
        }
        return ResponseEntity.ok().body("parking con id :"  + id + " eliminado correctamente");

    }



  /*
  *   // Método para actualizar un parking existente
  *         //no esta implementado porque no se si es valido tenerlo
    @PutMapping("/updatedLicence/{licencePlate}")
    public ResponseEntity<Parking> updateLicenceParking(@PathVariable String oldLicencePlate , RequestBody String newLicencePlate){
            // Llamar al servicio para actualizar el parking
            Parking updatedParkingResult = parkingService.updateLicencePlate(oldLicencePlate,newLicencePlate);
            // Devolver el parking actualizado y un estado HTTP 200 OK
            return ResponseEntity.ok(updatedParkingResult);

    }

  * */
}
