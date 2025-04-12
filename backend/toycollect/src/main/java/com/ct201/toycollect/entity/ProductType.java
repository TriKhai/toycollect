package com.ct201.toycollect.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Date;
import java.util.Set;

@Entity(name = "ProductType")
@Table(name = "productType")
@Getter
@Setter
public class ProductType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="theme")
    private String theme;

    @Column(name="description")
    private String description;

    @CreationTimestamp
    @Column(name="createdAt")
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name="updatedAt")
    private Instant updatedAt;

    @OneToMany(mappedBy = "productType")
    private Set<Product> products;
}
