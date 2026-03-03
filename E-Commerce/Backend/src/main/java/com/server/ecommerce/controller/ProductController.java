package com.server.ecommerce.controller;

import com.server.ecommerce.entity.Product;
import com.server.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public Page<Product> getProducts(@RequestParam int page, @RequestParam int size, @RequestParam String sortDirection) {
        return productService.getProductsPage(page, size, sortDirection);
    }

    @GetMapping("/category/{categoryId}")
    public Page<Product> getProductsByCategory(@PathVariable Long categoryId, @RequestParam int page, @RequestParam int size, @RequestParam String sortDirection) {
        return productService.getProductsByCategory(categoryId, page, size, sortDirection);
    }
    @GetMapping("/search")
    public Page<Product> searchProducts(@RequestParam String query, @RequestParam int page, @RequestParam int size, @RequestParam String sortDirection) {
        return productService.searchProducts(query, page, size, sortDirection);
    }
}
