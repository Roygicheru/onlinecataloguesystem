package com.team.onlinecatalogsystem.repository;

import com.team.onlinecatalogsystem.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Custom query methods - updated to match lowercase field names
    List<Order> findByCustomernumber(String customernumber);
    List<Order> findByStatus(String status);
}