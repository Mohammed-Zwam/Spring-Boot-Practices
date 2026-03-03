package com.server.ecommerce.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.util.Set;


@Entity
@Table(name = "categories")
@Setter
@Getter
public class Category {
    Long id;
    private String name;

    @OneToMany(mappedBy = "category") // attribute name in Product class
    private Set<Product> products;
}
