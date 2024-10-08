package com.parking.backend.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parking.backend.Models.Employee;
import com.parking.backend.Services.EmployeeService;


@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;


    @GetMapping    
    public  ResponseEntity<List<Employee>> getAllEmployee(){

        List<Employee> employees= this.employeeService.findAll();

        return  ResponseEntity.status(HttpStatus.OK).body(employees);

    }




    @GetMapping("/{id}")
    public ResponseEntity<?> findEmployeeByID(@PathVariable Long id) {
        Optional<Employee> employeeOptional = this.employeeService.findById(id);
          if (employeeOptional.isEmpty()) {
              return ResponseEntity.status(HttpStatus.NOT_FOUND).body("empleado por id " +id+ " no encontrado");
            }
          return ResponseEntity.status(HttpStatus.OK).body(employeeOptional.get());

     }



    @GetMapping("/email/{email}")
    public ResponseEntity<?> findEmployeeByEmail(@PathVariable String email) {

            Optional<Employee> employeeOptional = employeeService.findEmployeeByEmail(email);
        if (employeeOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("empleado por email " +email+ " no encontrado");
        }
            return ResponseEntity.status(HttpStatus.OK).body(employeeOptional.get());

    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
         boolean employeeDeleted=  this.employeeService.deleteById(id);
         if(!employeeDeleted)
         {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("empleado por id " +id+ " no encontrado");
         }
         return ResponseEntity.ok().body("Usuario Eliminado correctamente");
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id,  @RequestBody Employee employee) {
        Employee employeeUpdated=  this.employeeService.update(id,employee );

        return ResponseEntity.ok().body(employeeUpdated);
    }


}
