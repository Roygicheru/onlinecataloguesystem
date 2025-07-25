package com.team.onlinecatalogsystem.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "productcode", length = 15, nullable = false, unique = true)
    @NotBlank(message = "Product code is required")
    @Size(max = 15, message = "Product code must be at most 15 characters")
    private String productCode;

    @Column(name = "productname", length = 70, nullable = false)
    @NotBlank(message = "Product name is required")
    @Size(max = 70, message = "Product name must be at most 70 characters")
    private String productName;

    @Column(name = "productline", length = 50, nullable = false)
    @NotBlank(message = "Product line is required")
    @Size(max = 50, message = "Product line must be at most 50 characters")
    private String productLine;

    @Column(name = "productscale", length = 10, nullable = false)
    @NotBlank(message = "Product scale is required")
    @Size(max = 10, message = "Product scale must be at most 10 characters")
    private String productScale;

    @Column(name = "productvendor", length = 50, nullable = false)
    @NotBlank(message = "Product vendor is required")
    @Size(max = 50, message = "Product vendor must be at most 50 characters")
    private String productVendor;

    @Column(name = "productdescription", nullable = false, columnDefinition = "TEXT")
    @NotBlank(message = "Product description is required")
    private String productDescription;

    @Column(name = "quantityinstock", nullable = false)
    @Min(value = 0, message = "Quantity must be 0 or more")
    private Integer quantityInStock;

    @Column(name = "buyprice", nullable = false, precision = 10, scale = 2)
    @Positive(message = "Buy price must be positive")
    private BigDecimal buyPrice;

    @Column(name = "msrp", nullable = false, precision = 10, scale = 2)
    @Positive(message = "MSRP must be positive")
    // @JsonProperty("MSRP")
    private BigDecimal msrp;
}


//package com.team.onlinecatalogsystem.model;
//
//import com.fasterxml.jackson.annotation.JsonProperty;
//import jakarta.persistence.*;
//import jakarta.validation.constraints.*;
//import lombok.*;
//import java.math.BigDecimal;
//
//@Entity
//@Table(name = "products")
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class Product {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(name = "productcode", length = 15, nullable = false, unique = true)
//    @NotBlank(message = "Product code is required")
//    @Size(max = 15, message = "Product code must be at most 15 characters")
//    private String productCode;
//
//    @Column(name = "productname", length = 70, nullable = false)
//    @NotBlank(message = "Product name is required")
//    @Size(max = 70, message = "Product name must be at most 70 characters")
//    private String productName;
//
//    @Column(name = "productline", length = 50, nullable = false)
//    @NotBlank(message = "Product line is required")
//    @Size(max = 50, message = "Product line must be at most 50 characters")
//    private String productLine;
//
//    @Column(name = "productscale", length = 10, nullable = false)
//    @NotBlank(message = "Product scale is required")
//    @Size(max = 10, message = "Product scale must be at most 10 characters")
//    private String productScale;
//
//    @Column(name = "productvendor", length = 50, nullable = false)
//    @NotBlank(message = "Product vendor is required")
//    @Size(max = 50, message = "Product vendor must be at most 50 characters")
//    private String productVendor;
//
//    @Lob
//    @Column(name = "productdescription", nullable = false)
//    @NotBlank(message = "Product description is required")
//    private String productDescription;
//
//    @Column(name = "quantityinstock", nullable = false)
//    @Min(value = 0, message = "Quantity must be 0 or more")
//    private int quantityInStock;
//
//    // FIXED: Changed from String to BigDecimal and correct column name
//    @Column(name = "buyprice", nullable = false, precision = 10, scale = 2)
//    @Positive(message = "Buy price must be positive")
//    private BigDecimal buyPrice;
//
//    @Column(name = "msrp", nullable = false, precision = 10, scale = 2)
//    @Positive(message = "MSRP must be positive")
//    @JsonProperty("MSRP")
//    private BigDecimal msrp;
//}