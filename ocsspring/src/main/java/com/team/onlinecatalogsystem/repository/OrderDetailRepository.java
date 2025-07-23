package com.team.onlinecatalogsystem.repository;

import com.team.onlinecatalogsystem.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    // Custom query methods
    List<OrderDetail> findByOrderNumber(String orderNumber);
    List<OrderDetail> findByProductCode(String productCode);
}
