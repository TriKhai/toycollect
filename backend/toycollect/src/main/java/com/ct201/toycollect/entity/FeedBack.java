package com.ct201.toycollect.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Date;

@Entity(name="FeedBack")
@Table(name = "feedBack")
@Getter
@Setter
public class FeedBack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="content")
    private String content;

    @Column(name="ratePoint")
    private int ratePoint;

    @CreationTimestamp
    @Column(name="createdAt")
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name="updatedAt")
    private Instant updatedAt;

    @ManyToOne
    @JoinColumn(name="product_id")
    private Product productFeedback;

    @ManyToOne
    @JoinColumn(name="customer_id")
    private Customer customerFeedback;
}
