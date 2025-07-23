package com.team.onlinecatalogsystem.service;

import com.team.onlinecatalogsystem.model.Product;
import com.team.onlinecatalogsystem.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class ProductServiceImpl implements ProductServiceI {
    private final ProductRepository productRepository;

    @Override
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Optional<Product> getProductByCode(String productCode) {
        return productRepository.findByProductCode(productCode);
    }

    @Override
    public List<Product> getProductsByLine(String productLine) {
        return productRepository.findByProductLine(productLine);
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        return productRepository.findById(id)
                .map(existingProduct -> {
                    existingProduct.setProductCode(product.getProductCode());
                    existingProduct.setProductName(product.getProductName());
                    existingProduct.setProductLine(product.getProductLine());
                    existingProduct.setProductScale(product.getProductScale());
                    existingProduct.setProductVendor(product.getProductVendor());
                    existingProduct.setProductDescription(product.getProductDescription());
                    existingProduct.setQuantityInStock(product.getQuantityInStock());
                    existingProduct.setBuyPrice(product.getBuyPrice());
                    existingProduct.setMsrp(product.getMsrp()); // CHANGED: MSRP to Msrp
                    return productRepository.save(existingProduct);
                })
                .orElseThrow(() -> new RuntimeException("Product with ID " + id + " not found"));
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
