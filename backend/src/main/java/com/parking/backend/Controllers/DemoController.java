package com.parking.backend.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping(value ="/api")
public class DemoController {

    @GetMapping(value="/public")
    public String getPublic() {
        return ("Estas en la ruta publica de Parking");
    }




    /**Debes usar @PreAuthorize cuando quieras:

Restringir el acceso a ciertos métodos o endpoints a usuarios con roles específicos.
Tener un control más granular sobre quién puede acceder a qué recursos en tu aplicación.
 */

    @GetMapping(value="/admin/")
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String onlyAdmin() {
        return ("Estas en la ruta PROTEGIDA de Parking");
    }
}
