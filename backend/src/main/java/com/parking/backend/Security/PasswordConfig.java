package com.parking.backend.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
public class PasswordConfig {
        
        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder(10); //rouns de 10
        }
}



/*
 
Al anotar tu clase PasswordConfig con @Configuration y definir el método passwordEncoder() con @Bean, Spring reconoce automáticamente esa configuración. Esto significa que no necesitas crear manualmente instancias de PasswordConfig ni llamar explícitamente a sus métodos. Spring se encarga de gestionar el ciclo de vida de los beans y los inyecta donde los necesites.

Cuando marcas un método con @Bean, Spring lo gestiona de la siguiente manera:

Lo registra como un "bean" en el contexto de la aplicación.
Cualquier dependencia que requiera un PasswordEncoder se resolverá automáticamente a través de ese método.

Inyección automática: Gracias a @Configuration y @Bean, 
cualquier clase que requiera un PasswordEncoder recibirá 
el bean adecuado sin necesidad de una configuración adicional.
 */