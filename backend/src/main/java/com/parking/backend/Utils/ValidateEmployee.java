package com.parking.backend.Utils;

import com.parking.backend.Enum.ROLE;
import com.parking.backend.Exceptions.CustomException;
import com.parking.backend.Models.Employee;

public class ValidateEmployee {

    private static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@(gmail\\.com|hotmail\\.com)$";
    private static final String PASSWORD_REGEX = "^(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[a-z])(?=.*\\d?).{8,}$";

    public static void validateRole(Employee employee) throws CustomException {
        if (employee.getRoleUser() == ROLE.ROLE_ADMIN ||
                employee.getRoleUser() == ROLE.ROLE_MEMBER ||
                employee.getRoleUser() == ROLE.ROLE_EMPLOYEE) {
            if (employee.getEmail() == null || employee.getPassword() == null) {
                throw new CustomException("Email y password son obligatorios para roles ADMIN MiEMBRO EMPLEADO");
            }
        }

    }

    public static void validateEmail(String email) throws CustomException {

        if (email == null || !email.matches(EMAIL_REGEX) || email.contains("..")
                || email.indexOf('@') != email.lastIndexOf('@')) {
            throw new CustomException("El email proporcionado es inválido.");
        }
    }

    // Para validar la contraseña, necesitas comprobar si tiene al menos una
    // mayúscula,
    // un carácter especial y un mínimo de 8 caracteres.
    public static void validatePasssword(String password) throws CustomException {

        if (password == null || !password.matches(PASSWORD_REGEX)) {
            throw new CustomException(
                    "La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.");
        }
    }
}
