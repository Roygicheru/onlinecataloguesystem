package com.team.onlinecatalogsystem.controller;

import com.team.onlinecatalogsystem.model.ProductLine;
import com.team.onlinecatalogsystem.service.ProductLineServiceI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productlines")
@RequiredArgsConstructor
public class ProductLineController {
    private final ProductLineServiceI productLineService;

    @PostMapping("/add")
    public ResponseEntity<ProductLine> addProductLine(@Valid @RequestBody ProductLine productLine) {
        ProductLine savedProductLine = productLineService.addProductLine(productLine);
        return ResponseEntity.ok(savedProductLine);
    }

    @GetMapping
    public ResponseEntity<List<ProductLine>> getAllProductLines() {
        List<ProductLine> productLineList = productLineService.getAllProductLines();
        return ResponseEntity.ok(productLineList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductLine> getProductLineById(@PathVariable Long id) {
        Optional<ProductLine> productLine = productLineService.getProductLineById(id);
        return productLine.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{productLine}")
    public ResponseEntity<ProductLine> getProductLineByName(@PathVariable String productLine) {
        Optional<ProductLine> productLineOpt = productLineService.getProductLineByName(productLine);
        return productLineOpt.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductLine> updateProductLine(@PathVariable Long id, @Valid @RequestBody ProductLine productLine) {
        ProductLine updatedProductLine = productLineService.updateProductLine(id, productLine);
        return ResponseEntity.ok(updatedProductLine);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductLine(@PathVariable Long id) {
        productLineService.deleteProductLine(id);
        return ResponseEntity.noContent().build();
    }
}