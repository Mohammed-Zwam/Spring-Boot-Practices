package com.server.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Set;


@Entity
@Table(name = "categories")
@Setter
@Getter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    private String name;

    // @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = CascadeType.ALL) // attribute name in Product class
    // private Set<Product> products;
}
