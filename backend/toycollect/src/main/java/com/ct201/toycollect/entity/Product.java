package com.ct201.toycollect.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Date;
import java.util.Set;

@Entity(name = "Product")
@Table(name = "product")
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="manufactureDate")
    private Date manufactureDate;

    @Column(name="stock")
    private int stock;

    @Column(name="length")
    private double length;

    @Column(name="width")
    private double width;

    @Column(name="height")
    private double height;

    @Column(name="weight")
    private double weight;

    @Column(name = "sold")
    private int sold;

    @Column(name="color")
    private String color;

    @Column(name="rarity")
    private String rarity;

    @Column(name="material")
    private String material;

    @Column(name="ageRecommendation")
    private int ageRecommendation;

    @Column(name="description")
    private String description;

    @Column(name="price")
    private double price;

    @Column(name="image")
    private String image;

    @Column(name="versionProduct")
    private String versionProduct;

    @CreationTimestamp
    @Column(name="createdAt")
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name="updatedAt")
    private Instant updatedAt;

    @OneToMany(mappedBy = "productFeedback")
    private Set<FeedBack> feedBacks;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private ProductType productType;

    @ManyToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;

    @OneToMany(mappedBy = "productOrderDetail")
    private Set<OrderDetail> orderDetails;
}
