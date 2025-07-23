package com.team.onlinecatalogsystem.service;

import com.team.onlinecatalogsystem.model.Office;
import java.util.List;
import java.util.Optional;

public interface OfficeServiceI {
    Office addOffice(Office office);
    List<Office> getAllOffices();
    Optional<Office> getOfficeById(Long id);
    List<Office> getOfficesByCity(String city);
    List<Office> getOfficesByCountry(String country);
    Office updateOffice(Long id, Office office);
    void deleteOffice(Long id);
}