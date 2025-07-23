package com.team.onlinecatalogsystem.repository;

import com.team.onlinecatalogsystem.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Custom query methods
    Optional<Product> findByProductCode(String productCode);
    List<Product> findByProductLine(String productLine);
}
