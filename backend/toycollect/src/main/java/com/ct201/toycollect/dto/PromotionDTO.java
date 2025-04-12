package com.ct201.toycollect.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PromotionDTO {
    private int id;
    private String name;
    private String description;
    private double percent;
    private Date startDate;
    private Date endDate;
    private Date createdAt;
    private Date updatedAt;
}
