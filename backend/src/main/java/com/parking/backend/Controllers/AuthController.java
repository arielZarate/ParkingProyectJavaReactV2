package com.parking.backend.Controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parking.backend.Models.Employee;
import com.parking.backend.Services.AuthService;

@RestController
@RequestMapping(value = "/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;





    @PostMapping(value = "/register")
    public ResponseEntity<?> createEmployee(@RequestBody Employee employee) {
        Employee employeeCreated = this.authService.register(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeCreated);

    }


    @PostMapping(value = "/login")
    public ResponseEntity<?> loginEmployee(@RequestBody Employee employee) {
        Map<String,Object> employeeCreated = this.authService.login(employee);
        return ResponseEntity.status(HttpStatus.OK).body(employeeCreated);

    }



}
