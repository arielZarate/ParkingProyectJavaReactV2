package com.parking.backend.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.parking.backend.Models.Employee;
import com.parking.backend.Repository.EmployeeRepository;



@Service
public class UserDetailServiceImpl implements UserDetailsService{


    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    @Transactional
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
