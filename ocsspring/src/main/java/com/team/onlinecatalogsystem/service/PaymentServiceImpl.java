package com.team.onlinecatalogsystem.service;

import com.team.onlinecatalogsystem.model.Payment;
import com.team.onlinecatalogsystem.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class PaymentServiceImpl implements PaymentServiceI {
    private final PaymentRepository paymentRepository;

    @Override
    public Payment addPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    @Override
    public List<Payment> getPaymentsByCustomerNumber(String customerNumber) {
        return paymentRepository.findByCustomerNumber(customerNumber);
    }

    @Override
    public Payment updatePayment(Long id, Payment payment) {
        return paymentRepository.findById(id)
                .map(existingPayment -> {
                    existingPayment.setCustomerNumber(payment.getCustomerNumber());
                    existingPayment.setCheckNumber(payment.getCheckNumber());
                    existingPayment.setPaymentDate(payment.getPaymentDate());
                    existingPayment.setAmount(payment.getAmount());
                    return paymentRepository.save(existingPayment);
                })
                .orElseThrow(() -> new RuntimeException("Payment with ID " + id + " not found"));
    }

    @Override
    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
