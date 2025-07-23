package com.team.onlinecatalogsystem.repository;

import com.team.onlinecatalogsystem.model.Office;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfficeRepository extends JpaRepository<Office, Long> {
    // Custom query methods
    List<Office> findByCity(String city);
    List<Office> findByCountry(String country);
}
