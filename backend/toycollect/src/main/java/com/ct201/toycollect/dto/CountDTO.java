package com.ct201.toycollect.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CountDTO {
    private long totalProduct;
    private long totalOrder;
    private long totalAccount;
    private long totalProductInStock;
    private long totalProductSold;
    private long totalBrands;
    private long totalTypeProducts;
    private long totalVouchers;
    private double totalRevenues;
}
