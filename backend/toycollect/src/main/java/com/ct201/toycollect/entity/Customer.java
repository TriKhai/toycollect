package com.ct201.toycollect.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Date;
import java.util.Set;

@Entity(name="Customer")
@Table(name = "customer")
@Getter
@Setter
public class Customer {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(name="fullName")
    private String fullName;

    @Column(name="province")
    private String province;

    @Column(name="district")
    private String district;

    @Column(name="commune")
    private String commune;

    @Column(name="street")
    private String street;

    @Column(name="country")
    private String country;

    @Column(name="image")
    private String image;

    @Column(name="gender")
    private boolean gender;

    @Column(name="dob")
    private Date dob;

    @CreationTimestamp
    @Column(name="createdAt")
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name="updatedAt")
    private Instant updatedAt;

    @OneToOne
    @JoinColumn(name="account_id")
    private Accounts account;

    @OneToMany(mappedBy = "customerFeedback")
    private Set<FeedBack> feedBacks;

    @OneToMany(mappedBy = "customerOrder")
    private Set<Orders> orders;
}
