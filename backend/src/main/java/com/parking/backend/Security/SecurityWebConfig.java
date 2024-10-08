package com.parking.backend.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.parking.backend.Enum.ROLE;
import com.parking.backend.Services.UserDetailServiceImpl;

import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
@EnableMethodSecurity
public class SecurityWebConfig {

  @Autowired
  private UserDetailServiceImpl userDetailServiceImpl;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private JwtAuthFilter jwtAuthFilter;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/register/**", "/api/auth/login/**", "/api/public/**").permitAll()
            .requestMatchers("/api/admin/**").hasAuthority(ROLE.ROLE_ADMIN.name())
            // Acceso a controladores específicos
            .requestMatchers("/api/rate/**", "/api/vehicle/**", "/api/parking/**")
            .hasAnyAuthority(ROLE.ROLE_EMPLOYEE.name(), ROLE.ROLE_ADMIN.name())
            .requestMatchers("/api/rate/**", "/api/vehicle/**", "/api/parking/**",
             "/api/employees/**")
            .hasAuthority(ROLE.ROLE_ADMIN.name()) // Solo ADMIN puede acceder
            .anyRequest().authenticated()

        )
        .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    //======== Añadir el filtro de JWT antes del filtro de autenticación de Spring======
    http.addFilterBefore(jwtAuthFilter,
        UsernamePasswordAuthenticationFilter.class);

    return http.build();

  }

  // Configuración del AuthenticationManager para usar UserDetailService y
  // PasswordEncoder
  @Bean
  public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
    AuthenticationManagerBuilder authenticationManagerBuilder = http
        .getSharedObject(AuthenticationManagerBuilder.class);

    authenticationManagerBuilder
        .userDetailsService(userDetailServiceImpl)
        .passwordEncoder(passwordEncoder);

    return authenticationManagerBuilder.build();

  }

}

/*
 * Logout desde el cliente: Lo más común en sistemas JWT es que el cliente
 * elimine el token almacenado.
 * Logout en el servidor: No es necesario en un sistema sin estado basado en
 * JWT,
 * pero podrías implementar una ruta para invalidar tokens si decides hacerlo.
 */

/**
 * otra configuracion posible
 * 
 * // Los empleados y administradores pueden acceder a estos controladores
 * (Rate, Vehicle, Parking)
 * .requestMatchers("/api/rate/**", "/api/vehicle/**", "/api/parking/**")
 * .hasAnyAuthority(ROLE.ROLE_EMPLOYEE.name(), ROLE.ROLE_ADMIN.name())
 * 
 * // Solo los administradores pueden acceder a las rutas de gestión de
 * empleados
 * .requestMatchers("/api/employee/create/**", "/api/employee/delete/**")
 * .hasAuthority(ROLE.ROLE_ADMIN.name()) // Crear y eliminar empleados, solo
 * para ADMIN
 * 
 * // Permitir a EMPLOYEE y ADMIN acceder a las rutas de empleados excepto
 * crear/eliminar
 * .requestMatchers("/api/employee/**")
 * .hasAnyAuthority(ROLE.ROLE_EMPLOYEE.name(), ROLE.ROLE_ADMIN.name())
 */
