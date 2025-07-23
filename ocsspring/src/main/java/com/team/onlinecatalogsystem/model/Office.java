package com.team.onlinecatalogsystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "offices")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Office {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "city", length = 50, nullable = false)
    @NotBlank(message = "City is required")
    @Size(max = 50, message = "City must be at most 50 characters")
    private String city;

    @Column(name = "phone", length = 50, nullable = false)
    @NotBlank(message = "Phone is required")
    @Size(max = 50, message = "Phone must be at most 50 characters")
    private String phone;

    @Column(name = "addressLine1", length = 50, nullable = false)
    @NotBlank(message = "Address Line 1 is required")
    @Size(max = 50, message = "Address Line 1 must be at most 50 characters")
    private String addressLine1;

    @Column(name = "addressLine2", length = 50)
    @Size(max = 50, message = "Address Line 2 must be at most 50 characters")
    private String addressLine2;

    @Column(name = "state", length = 50)
    @Size(max = 50, message = "State must be at most 50 characters")
    private String state;

    @Column(name = "country", length = 50, nullable = false)
    @NotBlank(message = "Country is required")
    @Size(max = 50, message = "Country must be at most 50 characters")
    private String country;

    @Column(name = "postalCode", length = 15, nullable = false)
    @NotBlank(message = "Postal Code is required")
    @Size(max = 15, message = "Postal Code must be at most 15 characters")
    private String postalCode;

    @Column(name = "territory", length = 10, nullable = false)
    @NotBlank(message = "Territory is required")
    @Size(max = 10, message = "Territory must be at most 10 characters")
    private String territory;
}