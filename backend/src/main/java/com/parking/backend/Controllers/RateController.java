package com.parking.backend.Controllers;


import com.parking.backend.Dto.RateDto;
import com.parking.backend.Exceptions.CustomException;
import com.parking.backend.Models.Rate;
import com.parking.backend.Enum.TYPE_VEHICLE;
import com.parking.backend.Repositories.RateRepository;
import com.parking.backend.Services.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rates")
public class RateController {


    @Autowired
    private RateService rateService;


    // Crear o actualizar una tarifa
    @PostMapping
    public ResponseEntity<List<RateDto>> createOrUpdateRate(@RequestBody List<RateDto> ratesDto) {

        //convertir RateDto a Rate
        List<Rate> rates = new ArrayList<>();
        for (RateDto rateDto : ratesDto) {
            Rate rate = rateDto.toRate();
            rates.add(rate);
        }
        // Guardar o actualizar tarifas
        List<Rate> savedRate = this.rateService.saveOrUpdateRate(rates);


        List<RateDto> savedRatesDto=new ArrayList<>();
        for(Rate rate :savedRate){

            RateDto rateDto=RateDto.fromRate(rate);
            savedRatesDto.add(rateDto);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(savedRatesDto);
    }

    // Obtener una tarifa por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getRateById(@PathVariable Long id) {
        Optional<Rate> rate = rateService.findById(id);
        if (rate.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarifa por id "+id+ " no encontrada");
        }
        RateDto rateDto=RateDto.fromRate(rate.get());
        return ResponseEntity.status(HttpStatus.OK).body(rateDto);

    }

    // Obtener una tarifa por tipo de vehículo
    @GetMapping("/typeVehicle/{type}")
    public ResponseEntity<?> getRateByTypeVehicle(@PathVariable TYPE_VEHICLE type) {
        Optional<Rate> rateOpt = rateService.getRateByTypeVehicle(type);

        // Convertir Rate a RateDto
        RateDto rateDto = RateDto.fromRate(rateOpt.get());
        return rateOpt.map(rate -> ResponseEntity.status(HttpStatus.OK).body(rateDto))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());

    }

    // Obtener todas las tarifas
    @GetMapping
    public ResponseEntity<List<RateDto>> getAllRates() {
        List<Rate> rates = rateService.findAll();
        List<RateDto> rateDtos = new ArrayList<>();
        for (Rate rate : rates) {
            rateDtos.add(RateDto.fromRate(rate));
        }
        return new ResponseEntity<>(rateDtos, HttpStatus.OK);
    }

    // Eliminar una tarifa por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRateById(@PathVariable Long id) {
     //el service me devuelve true/false
        boolean rateDeleted=  this.rateService.deleteById(id);
        if(!rateDeleted)
        {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarifa con id "+ id +" no encontrado.");
        }
        return ResponseEntity.ok().body("Tarifa Eliminada correctamente");
    }

}
