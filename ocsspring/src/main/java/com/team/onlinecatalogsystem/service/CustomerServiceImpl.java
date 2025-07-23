package com.team.onlinecatalogsystem.service;

import com.team.onlinecatalogsystem.model.Customer;
import com.team.onlinecatalogsystem.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class CustomerServiceImpl implements CustomerServiceI {
    private final CustomerRepository customerRepository;

    @Override
    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    @Override
    public List<Customer> getCustomersByCity(String city) {
        return customerRepository.findByCity(city);
    }

    @Override
    public List<Customer> getCustomersByCountry(String country) {
        return customerRepository.findByCountry(country);
    }

    @Override
    public Customer updateCustomer(Long id, Customer customer) {
        return customerRepository.findById(id)
                .map(existingCustomer -> {
                    existingCustomer.setCustomerName(customer.getCustomerName());
                    existingCustomer.setContactLastName(customer.getContactLastName());
                    existingCustomer.setContactFirstName(customer.getContactFirstName());
                    existingCustomer.setPhone(customer.getPhone());
                    existingCustomer.setAddressLine1(customer.getAddressLine1());
                    existingCustomer.setAddressLine2(customer.getAddressLine2());
                    existingCustomer.setCity(customer.getCity());
                    existingCustomer.setState(customer.getState());
                    existingCustomer.setPostalCode(customer.getPostalCode());
                    existingCustomer.setCountry(customer.getCountry());
                    existingCustomer.setSalesRepEmployeeNumber(customer.getSalesRepEmployeeNumber());
                    existingCustomer.setCreditLimit(customer.getCreditLimit());
                    return customerRepository.save(existingCustomer);
                })
                .orElseThrow(() -> new RuntimeException("Customer with ID " + id + " not found"));
    }

    @Override
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}
