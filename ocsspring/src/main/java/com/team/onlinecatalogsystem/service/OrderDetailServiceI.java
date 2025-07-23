package com.team.onlinecatalogsystem.service;

import com.team.onlinecatalogsystem.model.OrderDetail;
import java.util.List;
import java.util.Optional;

public interface OrderDetailServiceI {
    OrderDetail addOrderDetail(OrderDetail orderDetail);
    List<OrderDetail> getAllOrderDetails();
    Optional<OrderDetail> getOrderDetailById(Long id);
    List<OrderDetail> getOrderDetailsByOrderNumber(String orderNumber);
    List<OrderDetail> getOrderDetailsByProductCode(String productCode);
    OrderDetail updateOrderDetail(Long id, OrderDetail orderDetail);
    void deleteOrderDetail(Long id);
}
