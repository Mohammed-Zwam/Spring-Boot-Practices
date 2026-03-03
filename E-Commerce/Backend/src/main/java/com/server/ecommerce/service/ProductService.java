package com.server.ecommerce.service;

import com.server.ecommerce.entity.Product;
import com.server.ecommerce.repository.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepo productRepository;

    public Page<Product> getProductsPage(int page, int size, String sortDirection) {
        return productRepository.findAll(buildPageable(page, size, sortDirection));
    }

    public Page<Product> getProductsByCategory(Long categoryId, int page, int size, String sortDirection) {
        return productRepository.findByCategoryId(categoryId, buildPageable(page, size, sortDirection));
    }

    public Page<Product> searchProducts(String query, int page, int size, String sortDirection) {
        return productRepository.findByNameContainingOrDescriptionContaining(query, query, buildPageable(page, size, sortDirection));
    }

    public Pageable buildPageable(int page, int size, String sortDirection) {
        return PageRequest.of(page, size, Sort.by(Objects.equals(sortDirection, "asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "price"));
    }
}
