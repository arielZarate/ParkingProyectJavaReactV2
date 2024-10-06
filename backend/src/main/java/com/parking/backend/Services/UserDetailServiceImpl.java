package com.parking.backend.Services;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.parking.backend.Models.Employee;
import com.parking.backend.Repositories.EmployeeRepository;

public class UserDetailServiceImpl implements UserDetailsService{



    private EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        Optional<Employee> employe = this.employeeRepository.findByEmail(email);
        // return new AuthDetailModel(user);
       
        if(employe.isEmpty())
        {
          throw  new UsernameNotFoundException("Usuario no encontrado con email: " + email);
        }
          
        return employe.get();

    }

}
