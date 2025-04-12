package com.ct201.toycollect.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Date;
import java.util.Set;

@Entity(name = "Promotion")
@Table(name="promotion")
@Getter
@Setter
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="percent")
    private double percent;

    @Column(name="startDate")
    private Date startDate;

    @Column(name="endDate")
    private Date endDate;

    @CreationTimestamp
    @Column(name="createdAt")
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name="updatedAt")
    private Instant updatedAt;

    @OneToMany(mappedBy = "promotion")
    private Set<Product> products;
}
