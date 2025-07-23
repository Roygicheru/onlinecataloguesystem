package com.team.onlinecatalogsystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "orderdetails")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "orderNumber", nullable = false)
    @NotBlank(message = "Order number is required")
    private String orderNumber;

    @Column(name = "productCode", length = 15, nullable = false)
    @NotBlank(message = "Product code is required")
    @Size(max = 15, message = "Product code must be at most 15 characters")
    private String productCode;

    @Column(name = "quantityOrdered", nullable = false)
    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantityOrdered;

    // CHANGED: Double to BigDecimal for better precision
    @Column(name = "priceEach", nullable = false, precision = 10)
    @Positive(message = "Price must be positive")
    private BigDecimal priceEach;

    @Column(name = "orderLineNumber", nullable = false)
    @Min(value = 1, message = "Order line number must be at least 1")
    private int orderLineNumber;
}