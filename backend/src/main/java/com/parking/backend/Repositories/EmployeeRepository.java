package com.parking.backend.Repositories;

import com.parking.backend.Models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface EmployeeRepository extends  JpaRepository<Employee,Long>{

    //aca  puedo agregar los metodos que quiera
    // Encuentra un empleado por su email
    Optional<Employee> findByEmail(String email);
}



//**
// Métodos Predefinidos
//Al extender JpaRepository, tienes acceso a varios métodos útiles sin necesidad de definirlos explícitamente, como:
//
//findAll(): Obtiene todos los empleados.
//findById(Long id): Busca un empleado por su ID.
//save(Employee employee): Guarda o actualiza un empleado.
//deleteById(Long id): Elimina un empleado por su ID.
// *//