package com.team.onlinecatalogsystem.repository;

import com.team.onlinecatalogsystem.model.ProductLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductLineRepository extends JpaRepository<ProductLine, Long> {
    // Custom query methods
    Optional<ProductLine> findByProductLine(String productLine);
}
