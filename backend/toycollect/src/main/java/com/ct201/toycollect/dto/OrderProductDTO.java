package com.ct201.toycollect.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@AllArgsConstructor
@Getter
@NoArgsConstructor
public class OrderProductDTO {
        private int id;
        private String name;
        private int quantity;
        private double price;
        private String image;

}
