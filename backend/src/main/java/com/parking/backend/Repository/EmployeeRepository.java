package com.parking.backend.Repository;

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



