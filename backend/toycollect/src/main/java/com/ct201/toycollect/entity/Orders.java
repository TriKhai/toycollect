package com.ct201.toycollect.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Date;
import java.util.Set;

@Entity(name = "Orders")
@Table(name = "orders")
@Getter
@Setter
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="purchaseMethod")
    private String purchaseMethod;

    @Column(name="dateOrder")
    private Date dateOrder;

    @Column(name="status")
    private String status;

    @CreationTimestamp
    @Column(name="createdAt")
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name="updatedAt")
    private Instant updatedAt;

    @OneToMany(mappedBy = "orderOD")
    private Set<OrderDetail> orderDetails;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customerOrder;
}
