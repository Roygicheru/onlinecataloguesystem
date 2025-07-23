package com.team.onlinecatalogsystem.service;

import com.team.onlinecatalogsystem.model.Order;
import com.team.onlinecatalogsystem.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class OrderServiceImpl implements OrderServiceI {
    private final OrderRepository orderRepository;

    @Override
    public Order addOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public List<Order> getOrdersByCustomerNumber(String customerNumber) {
        return orderRepository.findByCustomerNumber(customerNumber);
    }

    @Override
    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status);
    }

    @Override
    public Order updateOrder(Long id, Order order) {
        return orderRepository.findById(id)
                .map(existingOrder -> {
                    existingOrder.setOrderDate(order.getOrderDate());
                    existingOrder.setRequiredDate(order.getRequiredDate());
                    existingOrder.setShippedDate(order.getShippedDate());
                    existingOrder.setStatus(order.getStatus());
                    existingOrder.setComments(order.getComments());
                    existingOrder.setCustomerNumber(order.getCustomerNumber());
                    return orderRepository.save(existingOrder);
                })
                .orElseThrow(() -> new RuntimeException("Order with ID " + id + " not found"));
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
