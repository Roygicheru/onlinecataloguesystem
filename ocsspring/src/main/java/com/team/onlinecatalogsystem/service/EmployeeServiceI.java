package com.team.onlinecatalogsystem.service;

import com.team.onlinecatalogsystem.model.Employee;
import java.util.List;
import java.util.Optional;

public interface EmployeeServiceI {
    Employee addEmployee(Employee employee);
    List<Employee> getAllEmployees();
    Optional<Employee> getEmployeeById(Long id);
    Optional<Employee> getEmployeeByEmail(String email);
    List<Employee> getEmployeesByOfficeCode(String officeCode);
    Employee updateEmployee(Long id, Employee employee);
    void deleteEmployee(Long id);
}
