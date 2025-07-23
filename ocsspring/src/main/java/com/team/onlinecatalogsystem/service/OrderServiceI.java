package com.team.onlinecatalogsystem.service;

import com.team.onlinecatalogsystem.model.Order;
import java.util.List;
import java.util.Optional;

public interface OrderServiceI {
    Order addOrder(Order order);
    List<Order> getAllOrders();
    Optional<Order> getOrderById(Long id);
    List<Order> getOrdersByCustomerNumber(String customerNumber);
    List<Order> getOrdersByStatus(String status);
    Order updateOrder(Long id, Order order);
    void deleteOrder(Long id);
}
