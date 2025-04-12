package com.ct201.toycollect.payload.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class OrderRequest {
    private String username;
    private String purchaseMethod;
    private String status;
    private List<ProductOrderRequest> products;
}
