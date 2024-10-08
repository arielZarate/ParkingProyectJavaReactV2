package com.parking.backend.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.parking.backend.Enum.TYPE_VEHICLE;
import com.parking.backend.Exceptions.CustomException;
import com.parking.backend.Models.Vehicle;
import com.parking.backend.Repository.VehicleRepository;
import com.parking.backend.Utils.LicencePlateGenerator;

import jakarta.transaction.Transactional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    // Crear o actualizar un vehículo
    // @org.springframework.transaction.annotation.Transactional
    public Vehicle saveOrUpdateVehicle(Vehicle vehicle) {
        try {

            if (vehicle.getTypeVehicle() == TYPE_VEHICLE.BICYCLE) {
                if (vehicle.getLicencePlate() == null || vehicle.getLicencePlate().isEmpty()
                        || vehicle.getLicencePlate().equals(" ")) {
                    vehicle.setLicencePlate(LicencePlateGenerator.generateRandomLicencePlate());
                }
            }

            // Validar el vehículo antes de guardarlo
            validateVehicle(vehicle);

            // Buscar un vehículo existente por la placa
            Optional<Vehicle> existingVehicleOpt = vehicleRepository.findByLicencePlate(vehicle.getLicencePlate());
            if (existingVehicleOpt.isPresent()) {
                Vehicle existingVehicle = existingVehicleOpt.get();
                existingVehicle.setColor(vehicle.getColor());
                existingVehicle.setNote(vehicle.getNote());

                // Guardar el vehículo actualizado
                return vehicleRepository.save(existingVehicle);
            } else {
                // Si el vehículo no existe, créalo
                return vehicleRepository.save(vehicle);
            }

        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    // Método para verificar si un vehículo existe por ID
    public boolean existsById(Long id) {
        return vehicleRepository.existsById(id);
    }

    // Obtener un vehículo por placa
    public Optional<Vehicle> findByLicencePlate(String licencePlate) {
        try {
            return vehicleRepository.findByLicencePlate(licencePlate);
        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        }
    }

    // Obtener todos los vehículos
    public List<Vehicle> findAll() {
        try {
            return vehicleRepository.findAll();
        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // Obtener una tarifa por ID NO ES USUAL QUE SE BUSQUE POR ID MAS QUE NADA POR
    // TYPE DE VEHICULO
    @Transactional
    public Optional<Vehicle> findVehicleById(Long id) {
        try {
            return this.vehicleRepository.findById(id);
        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new CustomException(e.getMessage());
        }
    }

    // Eliminar un vehículo por ID
    @Transactional
    public boolean deleteById(Long id) {
        // Buscar el vehículo por ID
        Optional<Vehicle> vehicleOptional = findVehicleById(id);

        // Verificar si el vehículo está presente
        if (vehicleOptional.isPresent()) {
            // Eliminar el vehículo
            vehicleRepository.delete(vehicleOptional.get());
            return true; // El vehículo se eliminó correctamente
        } else {
            return false; // El vehículo no se encontró
        }
    }

    // ==============Validar los campos del vehículo========================
    private void validateVehicle(Vehicle vehicle) throws CustomException {
        if (vehicle.getTypeVehicle() == null) {
            throw new CustomException("El tipo de vehículo no puede ser nulo.");
        }
        if (vehicle.getTypeVehicle() != TYPE_VEHICLE.BICYCLE &&
                (vehicle.getLicencePlate() == null || vehicle.getLicencePlate().isEmpty())) {
            throw new CustomException("La placa del vehículo no puede ser nula o vacía.");
        }

        // Eliminar todos los espacios y convertir a mayúsculas
        // String trimmedLicencePlate = vehicle.getLicencePlate().replaceAll("\\s+",
        // "").toUpperCase();

        String trimmedLicencePlate = "";
        if (vehicle.getTypeVehicle() == TYPE_VEHICLE.BICYCLE) {
            trimmedLicencePlate = vehicle.getLicencePlate().replaceAll("\\s+", "").toUpperCase();
            // Validar que la patente tenga exactamente 13 caracteres

            if (trimmedLicencePlate.length() < 8 || trimmedLicencePlate.length() > 14
                    || !trimmedLicencePlate.contains("-")) {
                throw new CustomException(
                        "La placa del vehículo tipo BICYCLE debe tener entre 8 y 13 caracteres  y contener -.");
            }
            // Validar que la patente comience con "BICYCLE-" y el resto sea alfanumérico
            if (!trimmedLicencePlate.startsWith("BICYCLE-")
                    || !trimmedLicencePlate.substring(6).matches("[A-Z0-9-]+")) {
                throw new CustomException(
                        "La placa del vehículo tipo BICYCLE debe comenzar con 'BICYCLE-' seguido de 6 caracteres alfanuméricos.");
            }
            // si es false y es auto / camioneta o moto
        } else {

            // Eliminar espacios y convertir a mayúsculas
            trimmedLicencePlate = vehicle.getLicencePlate().replaceAll("\\s+", "").toUpperCase();
            // Validar que la placa solo contenga letras y números para otros tipos de
            // vehículos
            /**
             * if (!trimmedLicencePlate.matches("[A-Z0-9]+")) {
             * throw new CustomException("La placa del vehículo solo puede contener letras y
             * números, sin caracteres especiales.");
             * }
             */

            // Validar que la placa solo contenga letras y números, y tenga una longitud
            // total entre 4 y 8 caracteres
            if (!trimmedLicencePlate.matches("[A-Z0-9]{4,8}")) {
                throw new CustomException(
                        "La placa del vehículo debe tener entre 4 y 8 caracteres y contener solo letras y números.");
            }

            // Validar que no haya más de 4 letras y no más de 4 números
            int letterCount = 0;
            int numberCount = 0;

            for (char c : trimmedLicencePlate.toCharArray()) {
                if (Character.isLetter(c)) {
                    letterCount++;
                } else if (Character.isDigit(c)) {
                    numberCount++;
                }
            }

            if (letterCount > 4) {
                throw new CustomException("La placa del vehículo no puede contener más de 4 letras.");
            }

            if (numberCount > 4) {
                throw new CustomException("La placa del vehículo no puede contener más de 4 números.");
            }

            // Validar el tamaño de la placa para otros tipos de vehículos
            if (trimmedLicencePlate.length() < 6 || trimmedLicencePlate.length() > 8) {
                throw new CustomException("La placa del vehículo debe tener entre 6 y 8 caracteres.");
            }

        }
        // Asignar la placa recortada al vehículo
        vehicle.setLicencePlate(trimmedLicencePlate);

    }

    // fin de la clase
}
