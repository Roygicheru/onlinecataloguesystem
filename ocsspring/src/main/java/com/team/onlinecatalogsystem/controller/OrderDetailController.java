package com.team.onlinecatalogsystem.controller;

import com.team.onlinecatalogsystem.model.OrderDetail;
import com.team.onlinecatalogsystem.service.OrderDetailServiceI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orderdetails")
@RequiredArgsConstructor
public class OrderDetailController {
    private final OrderDetailServiceI orderDetailService;

    @PostMapping("/add")
    public ResponseEntity<OrderDetail> addOrderDetail(@Valid @RequestBody OrderDetail orderDetail) {
        OrderDetail savedOrderDetail = orderDetailService.addOrderDetail(orderDetail);
        return ResponseEntity.ok(savedOrderDetail);
    }

    @GetMapping
    public ResponseEntity<List<OrderDetail>> getAllOrderDetails() {
        List<OrderDetail> orderDetailList = orderDetailService.getAllOrderDetails();
        return ResponseEntity.ok(orderDetailList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDetail> getOrderDetailById(@PathVariable Long id) {
        Optional<OrderDetail> orderDetail = orderDetailService.getOrderDetailById(id);
        return orderDetail.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/order/{orderNumber}")
    public ResponseEntity<List<OrderDetail>> getOrderDetailsByOrderNumber(@PathVariable String orderNumber) {
        List<OrderDetail> orderDetailList = orderDetailService.getOrderDetailsByOrderNumber(orderNumber);
        return ResponseEntity.ok(orderDetailList);
    }

    @GetMapping("/product/{productCode}")
    public ResponseEntity<List<OrderDetail>> getOrderDetailsByProductCode(@PathVariable String productCode) {
        List<OrderDetail> orderDetailList = orderDetailService.getOrderDetailsByProductCode(productCode);
        return ResponseEntity.ok(orderDetailList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDetail> updateOrderDetail(@PathVariable Long id, @Valid @RequestBody OrderDetail orderDetail) {
        OrderDetail updatedOrderDetail = orderDetailService.updateOrderDetail(id, orderDetail);
        return ResponseEntity.ok(updatedOrderDetail);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderDetail(@PathVariable Long id) {
        orderDetailService.deleteOrderDetail(id);
        return ResponseEntity.noContent().build();
    }
}