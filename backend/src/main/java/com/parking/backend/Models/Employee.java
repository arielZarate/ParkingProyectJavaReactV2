package com.parking.backend.Models;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.parking.backend.Enum.ROLE;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
public class Employee extends User implements UserDetails {

    // uso el id del User

    @NotBlank(message = "El email no puede estar vacío")
    @Email(message = "El email debe ser válido")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotBlank(message = "La contraseña no puede estar vacía")
    @Size(min = 6, message = "La contraseña debe tener al menos 8 caracteres")
    @Column(name = "password", nullable = false)
    private String password;

    // @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, fetch =
    // FetchType.LAZY)
    // private List<Parking> parkings;


/**    // =======SOBRECARGA ==========
    public Employee(String email, String password, ROLE roleUser) {
        super(roleUser);
        this.email = email;
        this.password = password;
    }

    // =======SOBRECARGA ==========
    public Employee( Long id,String fullName, String dni, String phoneNumber, ROLE roleUser, String email,
        String password) {
        super(id, fullName, dni, phoneNumber, roleUser);
        this.email = email;
        this.password = password;
    }
 */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(getRoleUser().name()));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + getId() +
                ", email='" + getEmail() + '\'' +
                ", roles=" + getAuthorities() + '\'' +
                ", password=" + getPassword() +
                '}';
    }
}
