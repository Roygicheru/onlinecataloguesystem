package com.team.onlinecatalogsystem.service;

import com.team.onlinecatalogsystem.model.OrderDetail;
import com.team.onlinecatalogsystem.repository.OrderDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class OrderDetailServiceImpl implements OrderDetailServiceI {
    private final OrderDetailRepository orderDetailRepository;

    @Override
    public OrderDetail addOrderDetail(OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    @Override
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailRepository.findAll();
    }

    @Override
    public Optional<OrderDetail> getOrderDetailById(Long id) {
        return orderDetailRepository.findById(id);
    }

    @Override
    public List<OrderDetail> getOrderDetailsByOrderNumber(String orderNumber) {
        return orderDetailRepository.findByOrderNumber(orderNumber);
    }

    @Override
    public List<OrderDetail> getOrderDetailsByProductCode(String productCode) {
        return orderDetailRepository.findByProductCode(productCode);
    }

    @Override
    public OrderDetail updateOrderDetail(Long id, OrderDetail orderDetail) {
        return orderDetailRepository.findById(id)
                .map(existingOrderDetail -> {
                    existingOrderDetail.setOrderNumber(orderDetail.getOrderNumber());
                    existingOrderDetail.setProductCode(orderDetail.getProductCode());
                    existingOrderDetail.setQuantityOrdered(orderDetail.getQuantityOrdered());
                    existingOrderDetail.setPriceEach(orderDetail.getPriceEach());
                    existingOrderDetail.setOrderLineNumber(orderDetail.getOrderLineNumber());
                    return orderDetailRepository.save(existingOrderDetail);
                })
                .orElseThrow(() -> new RuntimeException("OrderDetail with ID " + id + " not found"));
    }

    @Override
    public void deleteOrderDetail(Long id) {
        orderDetailRepository.deleteById(id);
    }
}
