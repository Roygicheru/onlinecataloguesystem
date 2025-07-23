package com.team.onlinecatalogsystem.service;

import com.team.onlinecatalogsystem.model.Employee;
import com.team.onlinecatalogsystem.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeServiceI {
    private final EmployeeRepository employeeRepository;

    @Override
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    @Override
    public Optional<Employee> getEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }

    @Override
    public List<Employee> getEmployeesByOfficeCode(String officeCode) {
        return employeeRepository.findByOfficeCode(officeCode);
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        return employeeRepository.findById(id)
                .map(existingEmployee -> {
                    existingEmployee.setLastName(employee.getLastName());
                    existingEmployee.setFirstName(employee.getFirstName());
                    existingEmployee.setExtension(employee.getExtension());
                    existingEmployee.setEmail(employee.getEmail());
                    existingEmployee.setOfficeCode(employee.getOfficeCode());
                    existingEmployee.setReportsTo(employee.getReportsTo());
                    existingEmployee.setJobTitle(employee.getJobTitle());
                    return employeeRepository.save(existingEmployee);
                })
                .orElseThrow(() -> new RuntimeException("Employee with ID " + id + " not found"));
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
