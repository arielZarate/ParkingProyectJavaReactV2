package com.parking.backend.Services;

import com.parking.backend.Enum.TYPE_VEHICLE;
import com.parking.backend.Models.Rate;
import com.parking.backend.Repositories.RateRepository;
import org.apache.catalina.filters.RemoteIpFilter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class RateServiceTest {

    @Autowired
    private RateService rateService;
    @Autowired
    private RateRepository rateRepository;
    @BeforeEach
    void setUp() {
        // Clean up the database before each test

     // rateRepository.deleteAll();;
    }

   /*
   *  @Test
    @DisplayName("Test para crear o actualizar una tarifa")
    void testCreateOrUpdateRate() {
        Rate rate = new Rate();
        rate.setTypeVehicle(TYPE_VEHICLE.CAR);
        rate.setCostPerHour(20.0);

        List<Rate> listRates = rateService.saveOrUpdateRate(rate);

        assertNotNull(listRates, "La tarifa guardada no debería ser nula");


        for (Rate rates : listRates){
            assertEquals(TYPE_VEHICLE.CAR, rates.getTypeVehicle(), "El tipo de vehículo debería ser 'Car'");
            assertEquals(20.0, rates.getCostPerHour(), "El costo por hora debería ser 10.0");
        }


        for (Rate rates : listRates){
            System.out.println("Tarifa: " + rates);
        }

    }
   * */



    @Test
    @DisplayName("Test para crear o actualizar una lista de tarifas")
    void testCreateOrUpdateRateList() {
        Rate rate1 = new Rate();
        rate1.setTypeVehicle(TYPE_VEHICLE.CAR);
        rate1.setCostPerHour(20.0);

        Rate rate2 = new Rate();
        rate2.setTypeVehicle(TYPE_VEHICLE.BICYCLE);
        rate2.setCostPerHour(10.0);

        ArrayList<Rate> rates = new ArrayList<>();
        rates.add(rate1);
        rates.add(rate2);

        //ahora agrego la lista al metodo
        List<Rate> savedRates = rateService.saveOrUpdateRate(rates);

        assertNotNull(savedRates, "Las tarifas guardadas no deberían ser nulas");
        assertEquals(2, savedRates.size(), "El tamaño de la lista de tarifas guardadas debería ser 2");

        Rate savedRate1 = savedRates.get(0);
        assertEquals(rate1.getTypeVehicle(), savedRate1.getTypeVehicle(), "El tipo de vehículo debería ser 'Car'");

        Rate savedRate2 = savedRates.get(1);
        assertEquals(rate2.getTypeVehicle(), savedRate2.getTypeVehicle(), "El tipo de vehículo debería ser 'Bike'");

        for (Rate elem : savedRates )
        {
            System.out.println("Rate :" + elem);
        }


    }


    @Test
    void findAll() {

        List<Rate> listRates=rateService.findAll();

        assertNotNull(listRates,"las tarifas no deben estar en null");
        for (Rate elem : listRates )
        {
            System.out.println("Rate :" + elem);
        }


    }
}