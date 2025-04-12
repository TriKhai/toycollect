package com.ct201.toycollect.dto.product;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private int id;
    private String name;
    private Date manufactureDate;
    private int stock;
    private String description;
    private double price;
    private String image;
    private DimetionsProductDTO dimetions;
    private AttributesProductDTO attributes;
    private TypeProductDTO type;
    private PromotionProductDTO promotion;
    private BrandProductDTO brand;
    private int sold;;
    private Date createdAt;
    private Date updatedAt;
}


