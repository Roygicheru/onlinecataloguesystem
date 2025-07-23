package com.team.onlinecatalogsystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customerNumber", nullable = false)
    @NotBlank(message = "Customer number is required")
    private String customerNumber;

    @Column(name = "checkNumber", length = 50, nullable = false, unique = true)
    @NotBlank(message = "Check number is required")
    @Size(max = 50, message = "Check number must be at most 50 characters")
    private String checkNumber;

    @Column(name = "paymentDate", nullable = false)
    @NotNull(message = "Payment date is required")
    private LocalDate paymentDate;

    // CHANGED: Double to BigDecimal for better precision
    @Column(name = "amount", nullable = false, precision = 10)
    @Positive(message = "Amount must be greater than zero")
    private BigDecimal amount;
}
