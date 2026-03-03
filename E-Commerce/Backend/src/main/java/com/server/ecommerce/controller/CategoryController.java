package com.server.ecommerce.controller;

import com.server.ecommerce.entity.Category;
import com.server.ecommerce.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/categories")
public class CategoryController {
    public final CategoryService categoryService;

    @GetMapping
    public List<Category> getAllCategories() {
       return categoryService.getAllCategories();
    }
}
