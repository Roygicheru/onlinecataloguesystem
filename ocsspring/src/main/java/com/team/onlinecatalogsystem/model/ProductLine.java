package com.team.onlinecatalogsystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

// import java.util.List;

@Entity
@Table(name = "productlines")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "productline", nullable = false, length = 50, unique = true)
    @NotBlank(message = "Product line name is required")
    @Size(max = 50, message = "Product line name must be at most 50 characters")
    private String productLine;

    @Column(name = "textdescription", length = 4000)
    @Size(max = 4000, message = "Text description must be at most 4000 characters")
    private String textDescription;

    @Lob
    @Column(name = "htmldescription")
    private String htmlDescription;

    @Lob
    @Column(name = "image")
    private String image;

}
