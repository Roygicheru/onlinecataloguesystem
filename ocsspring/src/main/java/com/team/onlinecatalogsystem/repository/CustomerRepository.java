package com.team.onlinecatalogsystem.repository;

import com.team.onlinecatalogsystem.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // Custom query methods
    List<Customer> findByCity(String city);
    List<Customer> findByCountry(String country);
}
