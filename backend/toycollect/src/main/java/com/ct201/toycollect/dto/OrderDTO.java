package com.ct201.toycollect.dto;

import com.ct201.toycollect.dto.product.ProductSimpleDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;


@Setter
@AllArgsConstructor
@Getter
@NoArgsConstructor
public class OrderDTO {
    private int id;
    private String purchaseMethod;
    private String status;
    private Date createdAt;
    private Date updatedAt;
    private CustomerDTO customer;
    private List<OrderProductDTO> products;
}
