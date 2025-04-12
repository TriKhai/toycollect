package com.ct201.toycollect.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductStatisticsDTO {
    private Map<String, Integer> soldPerMonth; // Thống kê số lượng bán ra trong 12 tháng
    private int totalInStock;                 // Tổng số sản phẩm trong kho
    private int totalSold;                    // Tổng số sản phẩm đã bán
}
