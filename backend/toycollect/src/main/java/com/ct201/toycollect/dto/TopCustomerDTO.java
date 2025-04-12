package com.ct201.toycollect.dto;

import com.ct201.toycollect.entity.Customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TopCustomerDTO {
    private CustomerDTO customer;
    private Double totalRevenue;
}
