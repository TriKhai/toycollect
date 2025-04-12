package com.ct201.toycollect.dto.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductSimpleDTO {
    private int id;
    private String name;
    private int stock;
    private double price;
    private String image;
    private double discount;
}
