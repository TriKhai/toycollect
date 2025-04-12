package com.ct201.toycollect.payload.request;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class ProductTypeRequest {
    private String name;
    private String theme;
    private String description;
}
