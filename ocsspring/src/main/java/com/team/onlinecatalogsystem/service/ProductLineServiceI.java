package com.team.onlinecatalogsystem.service;

import com.team.onlinecatalogsystem.model.ProductLine;
import java.util.List;
import java.util.Optional;

public interface ProductLineServiceI {
    ProductLine addProductLine(ProductLine productLine);
    List<ProductLine> getAllProductLines();
    Optional<ProductLine> getProductLineById(Long id);
    Optional<ProductLine> getProductLineByName(String productLine);
    ProductLine updateProductLine(Long id, ProductLine productLine);
    void deleteProductLine(Long id);
}
