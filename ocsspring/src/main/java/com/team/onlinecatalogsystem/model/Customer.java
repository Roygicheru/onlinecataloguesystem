package com.team.onlinecatalogsystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customerName", length = 50, nullable = false)
    @NotBlank(message = "Customer name is required")
    @Size(max = 50, message = "Customer name must be at most 50 characters")
    private String customerName;

    @Column(name = "contactLastName", length = 50, nullable = false)
    @NotBlank(message = "Contact last name is required")
    @Size(max = 50, message = "Contact last name must be at most 50 characters")
    private String contactLastName;

    @Column(name = "contactFirstName", length = 50, nullable = false)
    @NotBlank(message = "Contact first name is required")
    @Size(max = 50, message = "Contact first name must be at most 50 characters")
    private String contactFirstName;

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

    @Column(name = "city", length = 50, nullable = false)
    @NotBlank(message = "City is required")
    @Size(max = 50, message = "City must be at most 50 characters")
    private String city;

    @Column(name = "state", length = 50)
    @Size(max = 50, message = "State must be at most 50 characters")
    private String state;

    @Column(name = "postalCode", length = 15)
    @Size(max = 15, message = "Postal code must be at most 15 characters")
    private String postalCode;

    @Column(name = "country", length = 50, nullable = false)
    @NotBlank(message = "Country is required")
    @Size(max = 50, message = "Country must be at most 50 characters")
    private String country;

    // CHANGED: String instead of Long for consistency with your approach
    @Column(name = "salesRepEmployeeNumber")
    private String salesRepEmployeeNumber;

    // CHANGED: Double to BigDecimal for better precision
    @Column(name = "creditLimit", precision = 10)
    @PositiveOrZero(message = "Credit limit must be zero or positive")
    private BigDecimal creditLimit;
}