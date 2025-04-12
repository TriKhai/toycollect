package com.ct201.toycollect.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Date;
import java.util.Set;

@Entity(name="Brand")
@Table(name = "brand")
@Getter
@Setter
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="country")
    private String country;

    @Column(name="province")
    private String province;

    @Column(name="district")
    private String district;

    @Column(name="commune")
    private String commune;

    @Column(name="street")
    private String street;

    @Column(name="phone")
    private String phone;

    @Column(name="email")
    private String email;

    @CreationTimestamp
    @Column(name="createdAt")
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name="updatedAt")
    private Instant updatedAt;

    @OneToMany(mappedBy = "brand")
    private Set<Product> products;
}
