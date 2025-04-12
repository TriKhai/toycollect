package com.ct201.toycollect.entity;

import com.ct201.toycollect.entity.keys.KeyOrderDetail;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Date;

@Entity(name="OrderDetail")
@Table(name = "orderDetail")
@Getter
@Setter
public class OrderDetail {
    @EmbeddedId
    KeyOrderDetail keyOrderDetail;

    @Column(name="quantity")
    private int quantity;

    @Column(name="price")
    private double price;

    @CreationTimestamp
    @Column(name="createdAt")
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name="updatedAt")
    private Instant updatedAt;

    @ManyToOne
    @JoinColumn(name = "orderId", insertable = false, updatable = false)
    private Orders orderOD;

    @ManyToOne
    @JoinColumn(name = "productId", insertable = false, updatable = false)
    private Product productOrderDetail;
}
