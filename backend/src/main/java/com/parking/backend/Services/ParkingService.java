package com.parking.backend.Services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.parking.backend.Enum.STATUS_PARKING;
import com.parking.backend.Enum.TYPE_VEHICLE;
import com.parking.backend.Exceptions.CustomException;
import com.parking.backend.Models.Employee;
import com.parking.backend.Models.Parking;
import com.parking.backend.Models.Rate;
import com.parking.backend.Models.Vehicle;
import com.parking.backend.Repository.ParkingRepository;

@Service

public class ParkingService {

    @Autowired
    private ParkingRepository parkingRepository;

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private RateService rateService;

    @Autowired
    private EmployeeService employeeService;

    public Optional<Parking> getParkingById(Long id) {
        try {
            return this.parkingRepository.findById(id);
        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new CustomException(e.getMessage());
        }
    }

    @Transactional
    public List<Parking> findAllParking() {
        try {
            return this.parkingRepository.findAll();
        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // Método para encontrar parkings por estado
    @Transactional
    public List<Parking> findParkingByStatus(STATUS_PARKING status) {
        try {
            return parkingRepository.findByStatus(status);
        } catch (Exception e) {
            throw new CustomException("Error al buscar parkings por estado: " + e.getMessage());
        }

    }

    /// me devuelve todos los parking por la licencia
    @Transactional
    public List<Parking> getParkingByLicencePlate(String licencePlate) {

        try {
            // System.out.println("back:"+ licencePlate);
            String formatterLicencePlate = licencePlate.trim().toUpperCase();
            // System.out.println("patente qe ingresa es "+ formatterLicencePlate);
            return parkingRepository.findByVehicleLicencePlate(formatterLicencePlate);
        } catch (Exception e) {
            // Lanzar una CustomException con un mensaje más específico
            throw new CustomException("Error al buscar el parking por matrícula: " + e.getMessage());
        }
    }

    @Transactional
    public Parking saveParking(Vehicle vehicle, long employeeId) {
        try {

            // ====== Verificar si el vehículo ya está en el parking ======
            List<Parking> existingParkings = getParkingByLicencePlate(vehicle.getLicencePlate());
            // como el vehiculo ya puede haber estado en el parking busco solo aquel que
            // esta en estado IN_PROGRESS
            for (Parking parkings : existingParkings) {
                if (parkings.getStatus() == STATUS_PARKING.IN_PROGRESS) {
                    throw new CustomException("El vehículo con matrícula " + vehicle.getLicencePlate().toUpperCase()
                            + " ya está en el parking.");
                }
            }

            // ======guardar o actualizar vehiculo=====================
            Vehicle newVehicle = vehicleService.saveOrUpdateVehicle(vehicle);
            if (newVehicle == null) {
                throw new CustomException("Vehiculo no creado");
            }

            // ======Buscar el empleado por id================
            Optional<Employee> employeeOptional = employeeService.findById(employeeId);

            if (employeeOptional.isEmpty()) {
                throw new CustomException("Empleado con id " + employeeId + " no encontrado, verifique");
            }
            Employee employee = employeeOptional.get();

            // ==========Buscar la tarifa por tipo de vehiculo==================
            Optional<Rate> rateoptional = rateService.getRateByTypeVehicle(newVehicle.getTypeVehicle());

            if (rateoptional.isEmpty()) {
                throw new CustomException("Tarifa por vehiculo no encontrada ");
            }
            Rate rate = rateoptional.get();
            // ===============Guardar datos==================================
            Parking parking = new Parking();// aca creo el objeto no en el controller
            parking.setVehicle(newVehicle);
            parking.setEmployee(employee);
            parking.setRate(rate);
            parking.setEntryTime(LocalDateTime.now());
            parking.setStatus(STATUS_PARKING.IN_PROGRESS);
            parking.setHours(1L);
            parking.setCost(0.0); // Asignar costo inicial si es necesario

            return parkingRepository.save(parking);

        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    @Transactional
    public Parking finalizeParking(String licencePlate) {
        try {

            String formatterLicencePlate = licencePlate.trim().toUpperCase();
            // Buscar los registros de parking asociados al licencia
            List<Parking> parkings = getParkingByLicencePlate(formatterLicencePlate);
            if (parkings == null || parkings.isEmpty()) {
                throw new CustomException(
                        "No se encontraron registros de parking para el vehículo con matrícula: " + licencePlate);
            }

            Parking parkingInProgress = null;
            for (Parking parking : parkings) {
                if (parking.getStatus() == STATUS_PARKING.IN_PROGRESS) {
                    parkingInProgress = parking;
                    break;
                }
            }

            if (parkingInProgress == null) {
                throw new CustomException(
                        "No hay parkings en progreso para el vehículo con matrícula: " + licencePlate);
            }

            // Establecer la hora de salida
            parkingInProgress.setExitTime(LocalDateTime.now());
            parkingInProgress.setStatus(STATUS_PARKING.COMPLETED);
            // TIEMPO DE PARKING
            parkingInProgress.setHours(converterToHours(parkingInProgress));

            // Calcular el costo
            calculateCost(parkingInProgress);

            // No es necesario hacer nada más con la lista de parkings en el vehículo
            // porque la lista ya está gestionada a través de la relación bidireccional

            // Actualizar el registro de parking
            return parkingRepository.save(parkingInProgress);

        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // Método para eliminar un registro de parking por ID
    @Transactional
    public boolean deleteParking(Long id) {
        try {
            Optional<Parking> parkingOptional = parkingRepository.findById(id);
            if (parkingOptional.isPresent()) {
                parkingRepository.deleteById(id);
                return true;
            } else {
                return false;
            }
        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // no esta implementado
    /*
     * @Transactional
     * public Parking updateLicencePlate(String oldLicencePlate,String
     * newLicencePlate) {
     * try {
     * String formatterLicencePlate=oldLicencePlate.trim().toUpperCase();
     * // Buscar los registros de parking asociados al licencia
     * List<Parking> parkings = getParkingByLicencePlate(formatterLicencePlate);
     * if (parkings == null || parkings.isEmpty()) {
     * throw new
     * CustomException("No se encontraron registros de parking para el vehículo con matrícula: "
     * + oldLicencePlate);
     * }
     * 
     * 
     * 
     * Parking parkingInProgress = null;
     * for (Parking parking : parkings) {
     * if (parking.getStatus() == STATUS_PARKING.IN_PROGRESS) {
     * parkingInProgress = parking;
     * break;
     * }
     * }
     * 
     * if (parkingInProgress == null) {
     * throw new
     * CustomException("No hay parkings en progreso para el vehículo con matrícula: "
     * + oldLicencePlate);
     * }
     * 
     * // Establecer la hora de salida
     * parkingInProgress.getVehicle().setLicencePlate(newLicencePlate);
     * // Guardar los cambios en la base de datos
     * return parkingRepository.save(parkingInProgress);
     * 
     * } catch (Exception e) {
     * throw new RuntimeException("Error al actualizar la matrícula: " +
     * e.getMessage());
     * }
     * }
     * 
     */

    // ====================METODOS PAGEABLE============================

    @Transactional
    private Sort convertedSorted(String sort) {
        // este metodo recibe un string en este formato "id,desc"

        String sortParams[] = sort.split(",");// separa el struing por la , y lo pasa a array
        String sortField = sortParams[0];
        String sortDirection = sortParams[1];

        // ========ordenamos=======
        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        Sort sortingObj = Sort.by(direction, sortField);

        return sortingObj;
    }

    @Transactional
    public Page<Parking> findAllParking(int page, int size, String sort) {

        try {
            // este metodo separa el string en 2 parametros necesarios direcction y tipo de
            // sorting
            Sort sortingObj = convertedSorted(sort);
            // =========================
            PageRequest pageable = PageRequest.of(page, size, sortingObj);

            return parkingRepository.findAll(pageable);
        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    /// me devuelve todos los parking por la licencia pero paginados
    @Transactional
    public Page<Parking> getParkingByLicencePlate(String licencePlate, int page, int size, String sort) {
        try {
            // System.out.println("back:"+ licencePlate);
            // Ordenación basada en el string "sort"
            Sort sortedObj = convertedSorted(sort);

            // Paginación
            PageRequest pageable = PageRequest.of(page, size, sortedObj);

            // Normaliza la matrícula (sin espacios, en mayúsculas)
            String formatterLicencePlate = licencePlate.trim().toUpperCase();

            // Llamada al repositorio para devolver los resultados paginados
            return parkingRepository.findByVehicleLicencePlate(formatterLicencePlate, pageable);
        } catch (Exception e) {
            // Lanzar una CustomException con un mensaje más específico
            throw new CustomException("Error al buscar el parking por matrícula: " + e.getMessage());
        }
    }

    // con el uso de este metodo ya no usare el findAllParking
    @Transactional
    public Page<Parking> findParkingWithOptionalFilters(STATUS_PARKING status, TYPE_VEHICLE typeVehicle, int page,
            int size, String sort) {
        try {
            // Convertir el parámetro de ordenación a un objeto Sort
            Sort sortingObj = convertedSorted(sort);
            // Crear el objeto de paginación
            PageRequest pageable = PageRequest.of(page, size, sortingObj);

            if (status != null && typeVehicle != null) {
                // Filtrar por estado y tipo de vehículo
                return parkingRepository.findByStatusAndVehicleTypeVehicle(status, typeVehicle, pageable);
            }else if(status !=null)
             {
             // Filtrar solo por estado
             return parkingRepository.findByStatus(status, pageable);
             }else if(typeVehicle !=null)
              {
              // Filtrar solo por tipo de vehículo
             return parkingRepository.findByVehicleTypeVehicle(typeVehicle, pageable);
              }else {

                return parkingRepository.findAll(pageable);
            }

        } catch (Exception e) {
            // Lanzar una CustomException con un mensaje más específico
            throw new CustomException("Error al Obtener los parking : " + e.getMessage());
        }
    }

    @Transactional
    public Page<Parking> findParkingsByStatus(STATUS_PARKING status, int page, int size, String sort) {
        try {
            if (status == null) {
                throw new CustomException("El estado no puede ser null o undefined");
            }
        
            // Convertir el parámetro de ordenación a un objeto Sort
            Sort sortingObj = convertedSorted(sort);
            // Crear el objeto de paginación
            PageRequest pageable = PageRequest.of(page, size, sortingObj);

            return parkingRepository.findByStatus(status, pageable);
        } catch (Exception e) {
            // Lanzar una CustomException con un mensaje más específico
            throw new CustomException("Error al Obtener los parking por estado : " + e.getMessage());

        }
    }


    
    @Transactional
    public Page<Parking> findParkingsByTypeVehicle(TYPE_VEHICLE typeVehicle, int page, int size, String sort) {
        try {
            if (typeVehicle == null) {
                throw new CustomException("El tipo de Vehiculo no puede ser null o undefined");
            }
            // Convertir el parámetro de ordenación a un objeto Sort
            Sort sortingObj = convertedSorted(sort);
            // Crear el objeto de paginación
            PageRequest pageable = PageRequest.of(page, size, sortingObj);

            return parkingRepository.findByVehicleTypeVehicle(typeVehicle, pageable);
        } catch (Exception e) {
            // Lanzar una CustomException con un mensaje más específico
            throw new CustomException("Error al Obtener los parking por tipo de vehiculo : " + e.getMessage());

        }
    }
    // ===============================================================

    // throw new CustomException("No se encontró el parking con ID: " + id);
    // este metodo calcula es costo
    private void calculateCost(Parking parking) {
        // esto calcula el tiempo
        long hours = converterToHours(parking);
        System.out.println("las horas transcurridas son " + hours);
        // Calcular el costo
        double cost = 0.0;
        if (hours <= 0) { // Si las horas son 0 o menos, cobrar una hora completa
            cost = parking.getRate().getCostPerHour() * 1.0;
        } else {
            cost = parking.getRate().getCostPerHour() * hours;
        }
        parking.setCost(cost);
    }

    private Long converterToHours(Parking parking) {

        try {
            if (parking.getEntryTime() == null || parking.getExitTime() == null) {
                throw new IllegalStateException("Horas de entrada o salida no establecidas");
            }
            // Calcular la duración en horas decimales
            double durationInHours = java.time.Duration.between(parking.getEntryTime(), parking.getExitTime())
                    .toMinutes() / 60.0;

            // Redondear al entero más cercano

            return Math.round(durationInHours);

        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
