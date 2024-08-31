package com.parking.backend.Services;

import com.parking.backend.Enum.COLOR;
import com.parking.backend.Enum.STATUS_PARKING;
import com.parking.backend.Enum.TYPE_VEHICLE;
import com.parking.backend.Models.Employee;
import com.parking.backend.Models.Parking;
import com.parking.backend.Models.Rate;
import com.parking.backend.Models.Vehicle;
import com.parking.backend.Repositories.ParkingRepository;
import com.parking.backend.Repositories.VehicleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


//@DataJpaTest
//@SpringJUnitConfig
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//@Import(ParkingService.class)  //ota forma de importar
class ParkingServiceTest {


    //===========Repositorio=================
    @Autowired
    private ParkingRepository parkingRepository;

    @Autowired
    private VehicleRepository vehicleRepository;


    //========services=================
    @Autowired
    private ParkingService parkingService;
    @Autowired
    private  VehicleService vehicleService;

    @Autowired
    private RateService rateService;

    @Autowired
    private EmployeeService employeeService;

   @BeforeEach
    void setUp() {
        // Clean up the database before each test
      //  parkingRepository.deleteAll();
    }



    @Test
    @DisplayName("Test para guardar un parking")
    public void testSaveParking() {

        // Crear y guardar un vehículo
        Vehicle vehicle = new Vehicle();
        vehicle.setLicencePlate("pit011");
        vehicle.setTypeVehicle(TYPE_VEHICLE.CAR);
        vehicle.setColor(COLOR.BROWN);
        vehicle.setNote("Vehiclo con espejo derecho roto");


        Parking savedParking=parkingService.saveParking(vehicle,1L);


        // Assert
        assertNotNull(savedParking, "El parking guardado no debería ser nulo");
        assertNotNull(savedParking.getId(), "El id del parking guardado no debería ser nulo");
        assertEquals(vehicle.getLicencePlate(), savedParking.getVehicle().getLicencePlate(), "La matrícula del parking debería ser " +vehicle.getLicencePlate());
        assertEquals(STATUS_PARKING.IN_PROGRESS, savedParking.getStatus(), "El estado del parking debería ser IN_PROGRESS");

        System.out.println("Datos del parking creado: \n" + savedParking);
    }







    @Test
    @DisplayName("Test para traer todos los parking")
    void findAllParking() {

        // Arrange
      //  Parking parking1 = new Parking();
      //  parking1.setEntryTime(LocalDateTime.now());
      //  parking1.setStatus(STATUS_PARKING.IN_PROGRESS);
      //  parkingRepository.save(parking1);


        // Act
        List<Parking> result = parkingService.findAllParking();
        // Assert
        assertNotNull(result);
        assertFalse(result.isEmpty(),"La lista esta vacia");
     //   assertEquals(2, result.size());

        System.out.println("**********parking Datos<********\n"+ result);
    }

   @Test
   @DisplayName("Test para obtener un parking por ID")
    void getParkingById() {

       Long id=1L;
      Optional<Parking> opt =parkingService.getParkingById(id);

         assertTrue(opt.isPresent(),"El parking deberia estar presente con el id: "+ id);
          assertEquals(1,opt.get().getId(),"El id del parking deberia coindidir con el id proporcionado ");

       System.out.println("parking encontrado: " + opt.get());

    }

    @Test
    @DisplayName("Test para obtener parkings por matrícula")
    void getParkingByLicencePlate() {

        String licencePlate = "pit011";  // Matrícula que estás buscando
        List<Parking> listParking = parkingService.getParkingByLicencePlate(licencePlate);


        //Assert
        assertNotNull(listParking, "La lista de parking no deberia ser nula");
        assertFalse(listParking.isEmpty(), "la lista no deberia estar vacia ");


        // Verificar que todos los objetos en la lista tengan la matrícula correcta
        for (Parking parking : listParking) {
            assertEquals(licencePlate.toUpperCase(), parking.getVehicle().getLicencePlate(),
                    "La matrícula debería coincidir con " + licencePlate);
        }


        // Opcional: Puedes imprimir los resultados para inspección visual
        System.out.println("Parkings encontrados con matrícula " + licencePlate + ": " + listParking);

    }


    @Test
    @DisplayName("Test para finalizar un parking")
    void testFinalizeParking() {

       String licence="pit011";

      Parking finalizedParking= parkingService.finalizeParking(licence.toUpperCase());

        System.out.println("Parking Finalizado: \n" +finalizedParking);
        // Verificaciones
        assertNotNull(finalizedParking);
        assertEquals(STATUS_PARKING.COMPLETED, finalizedParking.getStatus());
        assertNotNull(finalizedParking.getExitTime());
        assertTrue(finalizedParking.getHours() == 0L,"El parking debe tener 0hs ya que recien ingreso");




    }
}