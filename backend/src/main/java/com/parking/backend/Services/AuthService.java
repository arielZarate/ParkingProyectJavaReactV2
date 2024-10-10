package com.parking.backend.Services;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.parking.backend.Exceptions.CustomException;
import com.parking.backend.Models.Employee;
import com.parking.backend.Repository.EmployeeRepository;
import com.parking.backend.Security.JwtTokenUtil;
import com.parking.backend.Utils.ValidateEmployee;

import jakarta.transaction.Transactional;

@Service
public class AuthService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Transactional
    public Employee register(Employee employee) {
        try {
            // ============VALIDACIONES========

            ValidateEmployee.validateRole(employee);
            // Validar email solo si no es ROLE.USER
            // if(employee.getRoleUser() != ROLE.USER)
            // {
            ValidateEmployee.validateEmail(employee.getEmail());
            ValidateEmployee.validatePasssword(employee.getPassword());
            // }
            Optional<Employee> newEmployee = this.employeeRepository.findByEmail(employee.getEmail());
            if (newEmployee.isPresent()) {
                throw new CustomException(
                        "Usuario con email " + newEmployee.get().getEmail() + " ya existe en el sistema.");
            } else {
                Employee emplo = new Employee();
                emplo.setFullName(employee.getFullName());
                emplo.setPhoneNumber(employee.getPhoneNumber());
                emplo.setDni(employee.getDni());
                emplo.setEmail(employee.getEmail());
                // =======aca encripto la password==============
                emplo.setPassword(passwordEncoder.encode(employee.getPassword()));
                // ===================================
                emplo.setRoleUser(employee.getRoleUser());
                emplo.setBio(employee.getBio());

                // guardamos los datos
                return this.employeeRepository.save(emplo);
            }

        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            // el catch captura el error del throw y lo devuelve por aca
            throw new RuntimeException("Error al registrar el usuario: " + e.getMessage());
        }
    }

    // login
    @Transactional
    public Map<String, Object> login(Employee employee) {

        try {
            // Verificar si el usuario ya está autenticado
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()
                    && !authentication.getPrincipal().equals("anonymousUser")) {
                throw new IllegalArgumentException("El usuario ya está logueado");
            }

            // Usar AuthenticationManager para autenticar al usuario
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    employee.getEmail(),
                    employee.getPassword());

            Authentication authResult = authenticationManager.authenticate(authenticationToken);
            // Almacenar el resultado de la autenticación en el contexto de seguridad
            SecurityContextHolder.getContext().setAuthentication(authResult);

            // Obtener el usuario autenticado para saber su rol
            Optional<Employee> optionalAuthenticatedUser = employeeRepository.findByEmail(employee.getEmail());
            Employee authenticatedUser = optionalAuthenticatedUser
                    .orElseThrow(() -> new UsernameNotFoundException(
                            "Usuario no encontrado con el email: " + employee.getEmail()));

            // ===========================================================================

            // Generar el token JWT
            String token = jwtTokenUtil.generateToken(authenticatedUser.getId(), authenticatedUser.getEmail(),
                    authenticatedUser.getRoleUser().name());
            System.out.println("Token generado: " + token);
            System.out.println("ROL ASIGNADO: " + authenticatedUser.getRoleUser().name());
            System.out.println("ID"+ authenticatedUser.getId());
            // Retornar más detalles junto con el token
            // cada hashMap tieene clave:string ,valor :object
            Map<String, Object> response = new HashMap<>();
            // response.put("token", token);
           // response.put("id", authenticatedUser.getId());
           // response.put("email", authenticatedUser.getEmail());
            //response.put("role", authenticatedUser.getRoleUser().name());
            response.put("token", token);
            return response;

        } catch (

        BadCredentialsException e) {
            // Manejar credenciales incorrectas
            throw new BadCredentialsException("Credenciales incorrectas: " +
                    e.getMessage());
        } catch (UsernameNotFoundException e) {
            // Manejar usuario no encontrado
            throw new UsernameNotFoundException("Usuario no encontrado: " +
                    e.getMessage());
        } catch (Exception e) {
            // Manejo general de excepciones
            throw new RuntimeException("Error al autenticar al usuario: " + e.getMessage());
        }

    }

}
