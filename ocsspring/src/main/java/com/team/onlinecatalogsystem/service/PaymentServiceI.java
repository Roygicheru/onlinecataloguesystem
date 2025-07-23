package com.team.onlinecatalogsystem.service;

import com.team.onlinecatalogsystem.model.Payment;
import java.util.List;
import java.util.Optional;

public interface PaymentServiceI {
    Payment addPayment(Payment payment);
    List<Payment> getAllPayments();
    Optional<Payment> getPaymentById(Long id);
    List<Payment> getPaymentsByCustomerNumber(String customerNumber);
    Payment updatePayment(Long id, Payment payment);
    void deletePayment(Long id);
}
