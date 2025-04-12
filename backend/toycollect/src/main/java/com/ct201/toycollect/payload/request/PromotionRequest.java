package com.ct201.toycollect.payload.request;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.Date;

@Getter
@Setter
public class PromotionRequest {
    private String name;
    private String description;
    private double percent;
    private String startDate;
    private String endDate;
}
