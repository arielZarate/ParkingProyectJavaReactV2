package com.parking.backend.Enum;

public enum ROLE {
    ADMIN("Administrator"),      // Dueño o administrador del sistema
    EMPLOYEE("Employee"),        // Empleados que gestionan el sistema
    MEMBER("Member"),           // Usuarios abonados que interactúan con el sistema
    USER("User");

    private final String displayName;

    // Constructor privado para inicializar los valores de las instancias
    private ROLE(String displayName) {
        this.displayName = displayName;
    }

    // Método para obtener el nombre de visualización
    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }
}
