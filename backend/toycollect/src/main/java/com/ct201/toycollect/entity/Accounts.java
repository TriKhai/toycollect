package com.ct201.toycollect.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Date;

@Entity(name="Accounts")
@Table(name = "accounts")
@Getter
@Setter
public class Accounts {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(name="username", unique=true)
    private String username;

    @Column(name="password")
    private String password;

    @Column(name="role")
    private String role;

    @Column(name="email", unique=true)
    private String email;

    @Column(name="phone", unique=true)
    private String phone;

    @Column(name="isActive")
    private boolean isActive;

    @CreationTimestamp
    @Column(name="createdAt")
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name="updatedAt")
    private Instant updatedAt;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Customer customer;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Staff staff;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private ForgotPassword forgotPassword;
}
