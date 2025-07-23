package com.team.onlinecatalogsystem.repository;

import com.team.onlinecatalogsystem.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Custom query methods
    Optional<Employee> findByEmail(String email);
    List<Employee> findByOfficeCode(String officeCode);
}
