package com.team.onlinecatalogsystem.repository;

import com.team.onlinecatalogsystem.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // Custom query methods
    List<Payment> findByCustomerNumber(String customerNumber);
}