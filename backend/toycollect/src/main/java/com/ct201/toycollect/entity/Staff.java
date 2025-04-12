package com.ct201.toycollect.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Date;

@Entity(name="Staff")
@Table(name = "staff")
@Getter
@Setter
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="fullName")
    private String fullName;

    @Column(name="province")
    private String province;

    @Column(name="district")
    private String district;

    @Column(name="commune")
    private String commune;

    @Column(name="country")
    private String country;


    @Column(name="street")
    private String street;

    @Column(name="image")
    private String image;

    @Column(name="gender")
    private boolean gender;

    @Column(name="dob")
    private Date dob;

    @Column(name="role")
    private String position;

    @Column(name="hireDate")
    private Date hireDate;

    @Column(name="status")
    private boolean status;

    @CreationTimestamp
    @Column(name="createdAt")
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name="updatedAt")
    private Instant updatedAt;

    @OneToOne
    @JoinColumn(name = "account_id")
    private Accounts account;

    @ManyToOne
    @JoinColumn(name="salary_id")
    private Salary salary;
}
