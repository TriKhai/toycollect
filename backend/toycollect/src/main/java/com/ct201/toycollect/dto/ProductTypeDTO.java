package com.ct201.toycollect.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductTypeDTO {
    private int id;
    private String name;
    private String theme;
    private String description;
    private Date createdAt;
    private Date updatedAt;
}
