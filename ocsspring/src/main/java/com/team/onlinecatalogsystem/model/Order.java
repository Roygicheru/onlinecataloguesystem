package com.team.onlinecatalogsystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "orderDate", nullable = false)
    @NotNull(message = "Order date is required")
    private LocalDate orderDate;

    @Column(name = "requiredDate", nullable = false)
    @NotNull(message = "Required date is required")
    private LocalDate requiredDate;

    @Column(name = "shippedDate")
    private LocalDate shippedDate;

    @Column(name = "status", length = 15, nullable = false)
    @NotBlank(message = "Status is required")
    @Size(max = 15, message = "Status must be at most 15 characters")
    private String status;

    @Lob
    @Column(name = "comments")
    private String comments;

    @Column(name = "customerNumber", nullable = false)
    @NotBlank(message = "Customer number is required")
    private String customerNumber;
}