package com.team.onlinecatalogsystem.service;

import com.team.onlinecatalogsystem.model.Office;
import com.team.onlinecatalogsystem.repository.OfficeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class OfficeServiceImpl implements OfficeServiceI {
    private final OfficeRepository officeRepository;

    @Override
    public Office addOffice(Office office) {
        return officeRepository.save(office);
    }

    @Override
    public List<Office> getAllOffices() {
        return officeRepository.findAll();
    }

    @Override
    public Optional<Office> getOfficeById(Long id) {
        return officeRepository.findById(id);
    }

    @Override
    public List<Office> getOfficesByCity(String city) {
        return officeRepository.findByCity(city);
    }

    @Override
    public List<Office> getOfficesByCountry(String country) {
        return officeRepository.findByCountry(country);
    }

    @Override
    public Office updateOffice(Long id, Office office) {
        return officeRepository.findById(id)
                .map(existingOffice -> {
                    existingOffice.setCity(office.getCity());
                    existingOffice.setPhone(office.getPhone());
                    existingOffice.setAddressLine1(office.getAddressLine1());
                    existingOffice.setAddressLine2(office.getAddressLine2());
                    existingOffice.setState(office.getState());
                    existingOffice.setCountry(office.getCountry());
                    existingOffice.setPostalCode(office.getPostalCode());
                    existingOffice.setTerritory(office.getTerritory());
                    return officeRepository.save(existingOffice);
                })
                .orElseThrow(() -> new RuntimeException("Office with ID " + id + " not found"));
    }

    @Override
    public void deleteOffice(Long id) {
        officeRepository.deleteById(id);
    }
}