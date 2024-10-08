package com.parking.backend.Services;

import com.parking.backend.Exceptions.CustomException;
import com.parking.backend.Models.Employee;
import com.parking.backend.Repository.EmployeeRepository;
import com.parking.backend.Security.JwtTokenUtil;
import com.parking.backend.Utils.ValidateEmployee;

import jakarta.transaction.Transactional;

import com.parking.backend.Enum.ROLE;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Employee> findAll() {
        try {
            return employeeRepository.findAll();

        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

  
    public Optional<Employee> findById(long id) {
        try {
            return this.employeeRepository.findById(id);
        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new CustomException(e.getMessage());
        }
    }

    public Optional<Employee> findEmployeeByEmail(String email) {
        try {
            return employeeRepository.findByEmail(email);
        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new CustomException(e.getMessage());
        }

    }

    @org.springframework.transaction.annotation.Transactional
    public boolean deleteById(Long id) {
        try {
            Optional<Employee> userOptional = findById(id);
            if (userOptional.isPresent()) {
                this.employeeRepository.delete(userOptional.get());
                return true;
            } else {
                return false;
            }
        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            // el catch captura el error del throw y lo devuelve por aca
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    @Transactional
    public Employee update(Long id, Employee employee) {
        try {
            Optional<Employee> userOptional = findById(id);
            if (userOptional.isEmpty()) {
                throw new CustomException("Usuario con ID " + id + " no encontrado.");
            }

            Employee existingEmployee = userOptional.get();

            // ============VALIDACIONES ========
            ValidateEmployee.validateRole(employee);

            ValidateEmployee.validateEmail(employee.getEmail());
            ValidateEmployee.validatePasssword(employee.getPassword());
         
            existingEmployee.setFullName(employee.getFullName());

            existingEmployee.setDni(employee.getDni());

            existingEmployee.setPhoneNumber(employee.getPhoneNumber());
            existingEmployee.setRoleUser(employee.getRoleUser());
            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setPassword(passwordEncoder.encode(employee.getPassword()));

            return this.employeeRepository.save(existingEmployee);
        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            // el catch captura el error del throw y lo devuelve por aca
            throw new RuntimeException(e.getMessage(), e);
        }
    }

}
