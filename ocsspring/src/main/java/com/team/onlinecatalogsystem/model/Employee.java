package com.team.onlinecatalogsystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lastName", length = 50, nullable = false)
    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must be at most 50 characters")
    private String lastName;

    @Column(name = "firstName", length = 50, nullable = false)
    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must be at most 50 characters")
    private String firstName;

    @Column(name = "extension", length = 10, nullable = false)
    @NotBlank(message = "Extension is required")
    @Size(max = 10, message = "Extension must be at most 10 characters")
    private String extension;

    @Column(name = "email", length = 100, nullable = false, unique = true)
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 100, message = "Email must be at most 100 characters")
    private String email;

    @Column(name = "officeCode", length = 10, nullable = false)
    @NotBlank(message = "Office code is required")
    @Size(max = 10, message = "Office code must be at most 10 characters")
    private String officeCode;

    @Column(name = "reportsTo")
    private String reportsTo; // Optional: employee ID of supervisor

    @Column(name = "jobTitle", length = 50, nullable = false)
    @NotBlank(message = "Job title is required")
    @Size(max = 50, message = "Job title must be at most 50 characters")
    private String jobTitle;
}