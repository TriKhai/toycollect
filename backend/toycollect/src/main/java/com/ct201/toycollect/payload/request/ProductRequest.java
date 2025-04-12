package com.ct201.toycollect.payload.request;

import com.ct201.toycollect.dto.product.AttributesProductDTO;
import com.ct201.toycollect.dto.product.DimetionsProductDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Getter
@Setter
public class ProductRequest {
    private String name;
    private Date manufactureDate;
    private int stock;
    private String description;
    private double price;
    private String color;
    private String rarity;
    private String material;
    private String versionProduct;
    private int ageRecommendation;
    private double length;
    private double width;
    private double height;
    private double weight;
    private MultipartFile fileImage;
    private String image;
    private int brandId;
    private int promotionId;
    private int typeId;
}
