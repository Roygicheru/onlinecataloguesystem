package com.team.onlinecatalogsystem.service;

import com.team.onlinecatalogsystem.model.Product;
import java.util.List;
import java.util.Optional;

public interface ProductServiceI {
    Product addProduct(Product product);
    List<Product> getAllProducts();
    Optional<Product> getProductById(Long id);
    Optional<Product> getProductByCode(String productCode);
    List<Product> getProductsByLine(String productLine);
    Product updateProduct(Long id, Product product);
    void deleteProduct(Long id);
}
