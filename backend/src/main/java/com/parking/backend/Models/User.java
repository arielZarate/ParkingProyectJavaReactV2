package com.parking.backend.Models;


import java.io.Serializable;

import com.parking.backend.Enum.ROLE;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@MappedSuperclass
@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="full_name", nullable = true)
    private  String fullName;


    @Column(name = "dni", nullable = true, unique = true)
    private String dni;

    @Column(name = "phone_number",nullable = true)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_user", nullable = false)
    private ROLE roleUser = ROLE.ROLE_USER; // default value is user


    /*
    *
    * Campos y Métodos: Los getters y setters en User funcionan correctamente y no
    *  necesitan ser abstractos. Las subclases como Employee pueden usar estos métodos
    *  tal como están, sin necesidad de reimplementarlos.
    * */

    //sobrecarga
  // otra constructor que recibe solo un parametro Role
    public User(ROLE roleUser) {
        this.roleUser=roleUser;
    }

}



/*


==========en vez de hacer esto usare LOMBOK===================================

 //comstructor
    public User(){

    }


    public User(Long id, String fullName, String dni, String phoneNumber, ROLE roleUser) {
        this.id = id;
        this.fullName = fullName;
        this.dni = dni;
        this.phoneNumber = phoneNumber;
        this.roleUser = roleUser;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String name) {
        this.fullName = name;
    }



    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }


    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public ROLE getRoleUser() {
        return roleUser;
    }

    public void setRoleUser(ROLE roleUser) {
        this.roleUser=roleUser;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", dni='" + dni + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", ROLEUser=" + roleUser +

                '}';
    }

**/
