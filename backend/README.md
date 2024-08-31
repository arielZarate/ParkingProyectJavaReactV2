

# parking backend



## Diagrama  de entidades 


```puml

+----------------+       +----------------+       +----------------+  
|    User        |<------|    Employee    |<------|    Admin        |  
|----------------|       |----------------|       |----------------|  
| - id: Long     |       | - email: String|       |                |  
| - firstName:   |       | - password:    |       |                |  
|   String       |       |   String       |       |                |  
| - lastName:    |       |                |       |                |  
|   String       |       +----------------+       +----------------+  
| - dni: String  |      
| - phone: String|
+----------------+      
        |        
        |        
        |        
        v        
+----------------+  
|   Member       |  
|----------------|  
| - vehicle:     |  
|   Vehicle      |  
| - contractType:|  
|   String       |  
| - paymentMethod|  
|   : String     |  
+----------------+  
        |        
        v        
+----------------+       +----------------+  
|    Vehicle     |<------|    Rate        |  
|----------------|       |----------------|  
| - id: Long     |       | - id: Long     |  
| - brand: String|       | - typeVehicle: |  
| - model: String|       |   TYPE_VEHICLE |  
| - typeVehicle: |       | - costPerHour: |  
|   TYPE_VEHICLE |       |   Double       |  
| - licencePlate:|       +----------------+  
|   String       |  
| - color: String|  
+----------------+  
        |        
        v        
+----------------+  
|    Parking     |  
|----------------|  
| - id: Long     |  
| - entryTime:   |  
|   LocalDateTime|  
| - exitTime:    |  
|   LocalDateTime|  
| - vehicle:     |  
|   Vehicle      |  
| - user: User   |  
| - cost: Double |  
+----------------+  


```


## Manejo de Relaciones 

1. Usar IDs (Long) directamente: 
 - Como estás haciendo ahora, guardas solo el ID del Vehicle y Employee en la entidad Parking. 
 - Esto significa que no estás aprovechando la capacidad de JPA para gestionar automáticamente 
 - las relaciones entre entidades. Cuando haces esto, debes gestionar manualmente las consultas 
 - y la integridad de las relaciones.
```java
package com.parking.backend.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.parking.backend.Enum.STATUS_PARKING;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;


@Entity
@Table(name = "Parking")
@Data
@NoArgsConstructor //constructor sin parametros
@AllArgsConstructor
@Builder //patron builder
public class Parking {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;


  @Column(name = "entryTime",nullable = true)
  private LocalDateTime entryTime;


  @Column(name = "exitTime",nullable = true)
  private LocalDateTime exitTime;


  @ManyToOne(fetch = FetchType.EAGER) //// Un parking está asociado a un solo vehículo
  @JoinColumn(name = "vehicle", nullable = false)
  //@JsonBackReference
  private Vehicle vehicle;


  @ManyToOne(fetch = FetchType.EAGER) // Un parking está gestionado por un solo empleado
  @JoinColumn(name = "employee",nullable = false)
  private Employee employee;



  // ===podria haber echo la relacion en Rate definiendo @OneToMany  es lo mismo=======0
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "rate",
          referencedColumnName = "id",  // esta es la id de la tabla de Rate
          nullable = false)
  private Rate rate;


  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false)
  private STATUS_PARKING status ;


  @Column(name = "hours" ,nullable = true)
  private Long hours;

  @Column(name = "cost", nullable = true) // Costo calculado del estacionamiento
  private Double cost=0.0;




  public void setEntryTime(LocalDateTime entryTime) {

    //truncatedTo(ChronoUnit.MINUTES):
    // Este método trunca el LocalDateTime a la precisión más cercana de minutos, eliminando los segundos y milisegundos.
    this.entryTime = entryTime.truncatedTo(ChronoUnit.MINUTES);
  }



  public void setExitTime(LocalDateTime exitTime) {
    this.exitTime = exitTime.truncatedTo(ChronoUnit.MINUTES);
  }


}

```

 ### ¿Funcionará tu Implementación Actual?
 Tu implementación actual funcionará en términos de guardar y recuperar datos, pero con las siguientes consideraciones:

- Relaciones Manuales: No tendrás relaciones automáticas entre las entidades Parking, Vehicle, y Employee. Tendrás que hacer consultas manuales para obtener los objetos Vehicle y Employee a partir de sus IDs cuando los necesites.
- Consultas Adicionales: Si necesitas acceder a un Vehicle o Employee desde un Parking, 
- tendrás que realizar consultas adicionales en la base de datos para obtener las entidades 
- correspondientes a partir de los IDs almacenados.


### Implementacion de Parking
 ```java 


public class ParkingService {


    @Autowired
    private ParkingRepository parkingRepository;

    @Autowired
    private  VehicleService vehicleService;

    @Autowired
    private RateService rateService;


    @Autowired
    private EmployeeService employeeService;


    @Transactional
    public Parking saveParking(Parking parking ,Vehicle vehicle, long employeeId) {


        //======1.vehicle=====================
        Vehicle newVehicle= vehicleService.saveOrUpdateVehicle(vehicle);
        if(newVehicle == null)
        {
            throw  new CustomException("Vehiculo no creado");
        }
        Long idVehicle= newVehicle.getId();//id del vehiculo

        //======2. employee================
        Optional<Employee> employeeOptional = employeeService.findById(employeeId);

        if(employeeOptional.isEmpty())
        {
            throw  new CustomException("Empleado no encomtrado, verifique");
        }
        Employee employee=employeeOptional.get();

        //===============Guardar datos==================================
        parking.setVehicleID(idVehicle);
        parking.setUserID(employee.getId());
        parking.setEntryTime(LocalDateTime.now());
        //hora de salida no la seteo aun
        parking.setCost(0.0); // Asignar costo inicial si es necesario

        return parkingRepository.save(parking);
    }



    @Transactional
    public Parking finalizeParking(String licencePlate) {
        // Obtener el registro de parking
        Optional<Vehicle> optionalVehicle = vehicleService.findByLicencePlate(licencePlate);
        if (optionalVehicle.isEmpty()) {
            throw new CustomException("Vehiculo no encontrado");
        }
        Vehicle vehicle = optionalVehicle.get();

        // Buscar el registro de parking asociado al vehículo
        Optional<Parking> optionalParking = parkingRepository.findByVehicleID(vehicle.getId());
        if (optionalParking.isEmpty()) {
            throw new CustomException("Registro de parking no encontrado");
        }
        Parking parking = optionalParking.get();


        // Establecer la hora de salida
        parking.setExitTime(LocalDateTime.now());

        // Calcular el costo
        calculateCost(parking);

        // Actualizar el registro de parking
        return parkingRepository.save(parking);
    }




    //este metodo calcula es costo
    private void calculateCost(Parking parking) {
        if (parking.getExitTime() == null) {
            throw new IllegalStateException("Hora de salida no establecida");
        }

        //esto calcula el tiempo
        long hours = java.time.Duration.between(parking.getEntryTime(), parking.getExitTime()).toHours();
        // Obtener la tarifa según el tipo de vehículo
        Vehicle vehicle = vehicleService.findById(parking.getVehicleID()).orElseThrow(() -> new CustomException("Vehículo no encontrado"));
        Rate rate = rateService.getRateByTypeVehicle(vehicle.getTypeVehicle()).orElseThrow(() -> new CustomException("Tarifa no encontrada"));

        // Calcular el costo
        double cost = rate.getCostPerHour() * hours;
        parking.setCost(cost);
    }


}
 ```

2. Usar Entidades con @ManyToOne y @OneToMany: 
 - Si usas las anotaciones de JPA como @ManyToOne y @OneToMany, JPA se encarga de manejar las relaciones
   automáticamente. Esto incluye la carga automática de las entidades relacionadas, 
  la gestión de las claves foráneas, y la eliminación en cascada, si está configurada.
  Además, permite realizar consultas más complejas y trabajar directamente con las entidades relacionadas en el código.

  ### Relación Correcta Según Tu Modelo
  Si deseas modelar las relaciones entre Parking, Vehicle, y Employee de una manera que JPA pueda 
  manejar automáticamente, deberías modificar tu entidad Parking para usar las anotaciones de relación. 
  Aquí está cómo se vería tu entidad Parking con relaciones JPA:
  
```java 
 @Entity
@Table(name = "Parking")
public class Parking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "entryTime", nullable = true)
    private LocalDateTime entryTime;

    @Column(name = "exitTime", nullable = true)
    private LocalDateTime exitTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_ID", nullable = false)
    private Vehicle vehicle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_ID", nullable = false)
    private Employee employee;

    @Column(name = "cost", nullable = true)
    private Double cost = 0.0;

    // Getters y setters
}


```


### Ventajas de Usar Relaciones JPA
- Simplicidad en el Código: No necesitas hacer consultas manuales para obtener Vehicle y Employee desde Parking; JPA lo hace por ti.

- Integridad Referencial: JPA se asegura de que las claves foráneas se manejen correctamente y que las relaciones sean coherentes.

- Consultas Avanzadas: Puedes realizar consultas más avanzadas usando JPQL o el Criteria API de JPA, lo que te permite obtener datos relacionados sin tener que escribir consultas SQL manuales.


### Relaciones 

1. Relación Parking - Vehicle:

- Un Parking tiene un solo Vehicle asociado. Esto significa que cada vez que un vehículo se estaciona, hay un registro único en la tabla Parking que está vinculado a ese vehículo específico.
- Un Vehicle puede tener muchos Parking asociados. Esto representa que un mismo vehículo puede haber sido estacionado varias veces en diferentes momentos, por lo que la tabla Parking puede tener múltiples registros relacionados con el mismo vehículo.
  Esta relación es una relación "uno a muchos" (@ManyToOne desde Parking a Vehicle y @OneToMany desde Vehicle a Parking).

2. Relación Parking - Employee:

- Un Parking tiene un solo Employee que lo gestiona. Esto significa que cada registro en la tabla Parking está gestionado por un único empleado.
- Un Employee puede gestionar muchos Parking. Esto representa que un empleado puede haber gestionado varios estacionamientos en diferentes momentos.
  Esta relación es también una relación "uno a muchos" (@ManyToOne desde Parking a Employee y @OneToMany desde Employee a Parking).



## Uso del Patrón Builder
 Usando LOMBOK `@Builder`
 Cuando usas @Builder, Lombok genera un constructor privado y una clase estática Builder que te permite construir instancias de la clase de manera fluida y sin tener que preocuparte por la combinación exacta de parámetros.

Aquí está cómo podrías ajustar tu clase Employee para usar @Builder en lugar de los constructores sobrecargados:

```java
  package com.parking.backend.Models;

import com.parking.backend.Enum.ROLE;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "Employee")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee extends User implements Serializable {

  @Column(name = "email", nullable = false, unique = true)
  private String email;

  @Column(name = "password", nullable = false)
  private String password;

  // No necesitas los constructores sobrecargados si usas Builder
  // Puedes construir un objeto Employee usando el patrón Builder
}


```

### Cómo Usar el Builder
Para crear una instancia de Employee usando el patrón Builder, usarías el método estático builder() proporcionado por Lombok. Aquí tienes un ejemplo de cómo usarlo:

```java
  // Usando el patrón Builder para crear una instancia de Employee
Employee employee = Employee.builder()
        .id(1L)
        .fullName("John Doe")
        .dni("12345678")
        .phoneNumber("555-1234")
        .roleUser(ROLE.USER)
        .email("john.doe@example.com")
        .password("securepassword")
        .build();


```

## Ventajas del Patrón Builder
1. Flexibilidad: Puedes construir objetos sin tener que preocuparte por el orden o la combinación de parámetros en el constructor.
2. Legibilidad: El código es más legible porque cada parámetro se establece explícitamente en una línea separada.
3. Inmutabilidad: Puedes construir objetos inmutables si haces que todos los campos sean final y proporcionas un constructor que no los modifica después de la construcción.