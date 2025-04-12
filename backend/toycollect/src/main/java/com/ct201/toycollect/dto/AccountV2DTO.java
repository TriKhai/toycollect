package com.ct201.toycollect.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountV2DTO {
    private int id;
    private String username;
    private String password;
    private String role;
    private String email;
    private String phone;
    private boolean isActive;
    private Instant createdAt;
    private Instant updatedAt;
}
