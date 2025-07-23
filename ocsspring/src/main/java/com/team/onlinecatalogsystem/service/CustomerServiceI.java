package com.team.onlinecatalogsystem.service;

import com.team.onlinecatalogsystem.model.Customer;
import java.util.List;
import java.util.Optional;

public interface CustomerServiceI {
    Customer addCustomer(Customer customer);
    List<Customer> getAllCustomers();
    Optional<Customer> getCustomerById(Long id);
    List<Customer> getCustomersByCity(String city);
    List<Customer> getCustomersByCountry(String country);
    Customer updateCustomer(Long id, Customer customer);
    void deleteCustomer(Long id);
}