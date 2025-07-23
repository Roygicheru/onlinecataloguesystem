package com.team.onlinecatalogsystem.controller;

import com.team.onlinecatalogsystem.model.Payment;
import com.team.onlinecatalogsystem.service.PaymentServiceI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentServiceI paymentService;

    @PostMapping("/add")
    public ResponseEntity<Payment> addPayment(@Valid @RequestBody Payment payment) {
        Payment savedPayment = paymentService.addPayment(payment);
        return ResponseEntity.ok(savedPayment);
    }

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        List<Payment> paymentList = paymentService.getAllPayments();
        return ResponseEntity.ok(paymentList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        Optional<Payment> payment = paymentService.getPaymentById(id);
        return payment.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/customer/{customerNumber}")
    public ResponseEntity<List<Payment>> getPaymentsByCustomerNumber(@PathVariable String customerNumber) {
        List<Payment> paymentList = paymentService.getPaymentsByCustomerNumber(customerNumber);
        return ResponseEntity.ok(paymentList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @Valid @RequestBody Payment payment) {
        Payment updatedPayment = paymentService.updatePayment(id, payment);
        return ResponseEntity.ok(updatedPayment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }
}