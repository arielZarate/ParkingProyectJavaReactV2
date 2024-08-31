package com.parking.backend.Services;

import com.parking.backend.Exceptions.CustomException;
import com.parking.backend.Models.Employee;

import com.parking.backend.Enum.ROLE;
import com.parking.backend.Repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class EmployeeService {


    @Autowired
    private EmployeeRepository employeeRepository;


    public List<Employee> findAll(){
        try{
            return employeeRepository.findAll();

        }catch (CustomException e) {
            throw e;
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @org.springframework.transaction.annotation.Transactional
    public  Employee create(Employee employee){
        try {
            //============VALIDACIONES========

            validateRole(employee);
            // Validar email solo si no es ROLE.USER
            //if(employee.getRoleUser() != ROLE.USER)
            //{
            validateEmail(employee.getEmail());
            validatePasssword(employee.getPassword());
            //}
            Optional<Employee> newEmployee = this.employeeRepository.findByEmail(employee.getEmail());
            if (newEmployee.isPresent()) {
                throw new CustomException("Usuario con email " + newEmployee.get().getEmail() + " ya existe en el sistema.");
            } else {
                return this.employeeRepository.save(employee);
            }

        } catch (CustomException e) {
            throw e;
        }
        catch (Exception e) {
      //el catch captura el error del throw y lo devuelve por aca
            throw new RuntimeException( e.getMessage(),e);
        }
    }

    public Optional<Employee> findById(long id){
        try{
            return this.employeeRepository.findById(id);
        } catch (CustomException e) {
            throw e;
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            throw new CustomException(e.getMessage());
        }
    }

    public Optional<Employee> findEmployeeByEmail(String email) {
       try{
           return employeeRepository.findByEmail(email);
       }catch (CustomException e) {
           throw e;
       }
       catch (Exception e) {
           System.out.println(e.getMessage());
           throw new CustomException(e.getMessage());
       }

    }

    @org.springframework.transaction.annotation.Transactional
    public boolean deleteById(Long id){
        try{
            Optional<Employee> userOptional = findById(id);
            if (userOptional.isPresent()) {
                this.employeeRepository.delete(userOptional.get());
                return true;
            }else {
                return false;
            }
        } catch (CustomException e) {
            throw e;
        }
        catch (Exception e) {
            //el catch captura el error del throw y lo devuelve por aca
            throw new RuntimeException( e.getMessage(),e);
        }
    }


    @org.springframework.transaction.annotation.Transactional
    public Employee update(Long id,Employee employee){
        try{
            Optional<Employee> userOptional = findById(id);
            if (userOptional.isEmpty()) {
                throw new CustomException("Usuario con ID " + id + " no encontrado.");
            }

            Employee existingEmployee = userOptional.get();


            //============VALIDACIONES ========
            validateRole(employee);
            // Validar email solo si no es ROLE.USER
          //  if(employee.getRoleUser() != ROLE.USER)
           // {
                validateEmail(employee.getEmail());
                validatePasssword(employee.getPassword());
            //}
            // Actualizar los campos del usuario con los nuevos datos
            existingEmployee.setFullName(employee.getFullName());

            existingEmployee.setDni(employee.getDni());

            existingEmployee.setPhoneNumber(employee.getPhoneNumber());
            existingEmployee.setRoleUser(employee.getRoleUser());
            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setPassword(employee.getPassword());

            return this.employeeRepository.save(existingEmployee);
        } catch (CustomException e) {
            throw e;
        }
        catch (Exception e) {
            //el catch captura el error del throw y lo devuelve por aca
            throw new RuntimeException( e.getMessage(),e);
        }
    }

    //========================METODOS PRIVADOS PARA LA VALIDACION==============================0

    //==============METODO PRIVADO====================
    private void validateRole(Employee employee) throws CustomException
    {
        if (employee.getRoleUser() == ROLE.ADMIN || employee.getRoleUser() == ROLE.MEMBER || employee.getRoleUser()==ROLE.EMPLOYEE) {
            if (employee.getEmail() == null || employee.getPassword() == null) {
                throw new CustomException("Email y password son obligatorios para roles ADMIN MEMBER EMPLOYEE");
            }
        }

    }



    private void validateEmail(String email) throws CustomException
    {

     //   String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        // Expresión regular para validar el formato del correo electrónico
        String emailRegex = "^[a-zA-Z0-9._%+-]+@(gmail\\.com|hotmail\\.com)$";

        if (email == null || !email.matches(emailRegex) || email.contains("..") || email.indexOf('@') != email.lastIndexOf('@')) {
            throw new CustomException("El email proporcionado es inválido.");
        }
    }



    //Para validar la contraseña, necesitas comprobar si tiene al menos una mayúscula,
    // un carácter especial y un mínimo de 8 caracteres.
    private void validatePasssword(String password) throws CustomException
    {
        // Expresión regular para validar la contraseña
        String passwordRegex = "^(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[a-z])(?=.*\\d?).{8,}$";

        if (password == null || !password.matches(passwordRegex)) {
            throw new CustomException("La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.");
        }
    }
}




