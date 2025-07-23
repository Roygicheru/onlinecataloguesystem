package com.team.onlinecatalogsystem.service;

import com.team.onlinecatalogsystem.model.ProductLine;
import com.team.onlinecatalogsystem.repository.ProductLineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class ProductLineServiceImpl implements ProductLineServiceI {
    private final ProductLineRepository productLineRepository;

    @Override
    public ProductLine addProductLine(ProductLine productLine) {
        return productLineRepository.save(productLine);
    }

    @Override
    public List<ProductLine> getAllProductLines() {
        return productLineRepository.findAll();
    }

    @Override
    public Optional<ProductLine> getProductLineById(Long id) {
        return productLineRepository.findById(id);
    }

    @Override
    public Optional<ProductLine> getProductLineByName(String productLine) {
        return productLineRepository.findByProductLine(productLine);
    }

    @Override
    public ProductLine updateProductLine(Long id, ProductLine productLine) {
        return productLineRepository.findById(id)
                .map(existingProductLine -> {
                    existingProductLine.setProductLine(productLine.getProductLine());
                    existingProductLine.setTextDescription(productLine.getTextDescription());
                    existingProductLine.setHtmlDescription(productLine.getHtmlDescription());
                    existingProductLine.setImage(productLine.getImage());
                    return productLineRepository.save(existingProductLine);
                })
                .orElseThrow(() -> new RuntimeException("ProductLine with ID " + id + " not found"));
    }

    @Override
    public void deleteProductLine(Long id) {
        productLineRepository.deleteById(id);
    }
}
