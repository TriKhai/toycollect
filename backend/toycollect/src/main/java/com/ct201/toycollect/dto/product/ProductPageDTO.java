package com.ct201.toycollect.dto.product;

import com.ct201.toycollect.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ProductPageDTO {
    private List<ProductSimpleDTO> products;
    private int totalPages;          // Tổng số trang
    private long totalElements;      // Tổng số bản ghi
    private int size;                // Số lượng bản ghi/trang
    private int number;              // Trang hiện tại
}
