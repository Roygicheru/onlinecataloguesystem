package com.team.onlinecatalogsystem.controller;

import com.team.onlinecatalogsystem.model.Office;
import com.team.onlinecatalogsystem.service.OfficeServiceI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/offices")
@RequiredArgsConstructor
public class OfficeController {
    private final OfficeServiceI officeService;

    @PostMapping("/add")
    public ResponseEntity<Office> addOffice(@Valid @RequestBody Office office) {
        Office savedOffice = officeService.addOffice(office);
        return ResponseEntity.ok(savedOffice);
    }

    @GetMapping
    public ResponseEntity<List<Office>> getAllOffices() {
        List<Office> officeList = officeService.getAllOffices();
        return ResponseEntity.ok(officeList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Office> getOfficeById(@PathVariable Long id) {
        Optional<Office> office = officeService.getOfficeById(id);
        return office.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<Office>> getOfficesByCity(@PathVariable String city) {
        List<Office> officeList = officeService.getOfficesByCity(city);
        return ResponseEntity.ok(officeList);
    }

    @GetMapping("/country/{country}")
    public ResponseEntity<List<Office>> getOfficesByCountry(@PathVariable String country) {
        List<Office> officeList = officeService.getOfficesByCountry(country);
        return ResponseEntity.ok(officeList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Office> updateOffice(@PathVariable Long id, @Valid @RequestBody Office office) {
        Office updatedOffice = officeService.updateOffice(id, office);
        return ResponseEntity.ok(updatedOffice);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffice(@PathVariable Long id) {
        officeService.deleteOffice(id);
        return ResponseEntity.noContent().build();
    }
}