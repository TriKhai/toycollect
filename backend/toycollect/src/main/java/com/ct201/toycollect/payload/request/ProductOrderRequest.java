package com.ct201.toycollect.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductOrderRequest {
    private int productId;
    private int quantity;
    private double price;
}
