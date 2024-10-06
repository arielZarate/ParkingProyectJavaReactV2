package com.parking.backend.Models;

import com.parking.backend.Enum.ROLE;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "Employee")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee extends User {

   @Column(name="email", nullable = false, unique = true)
    private String email;

    @Column(name="password", nullable = false)
    private String password;

// @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Parking> parkings;

    //=======SOBRECARGA ==========
    public Employee(String email, String password, ROLE roleUser) {
        super(roleUser);
        this.email = email;
        this.password = password;
    }


    //=======SOBRECARGA ==========
    public Employee(Long id, String fullName, String dni, String phoneNumber, ROLE roleUser, String email, String password) {
        super(id, fullName, dni, phoneNumber, roleUser);
        this.email = email;
        this.password = password;
    }

}



