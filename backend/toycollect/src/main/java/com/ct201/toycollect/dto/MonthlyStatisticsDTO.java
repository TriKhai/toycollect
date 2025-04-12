package com.ct201.toycollect.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyStatisticsDTO {
    private int month;
    private int year;
    private long totalOrders;
    private double totalRevenue;
}
