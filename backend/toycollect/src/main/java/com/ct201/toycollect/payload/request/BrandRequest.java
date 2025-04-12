package com.ct201.toycollect.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BrandRequest {
    private String name;
    private String province;
    private String district;
    private String commune;
    private String street;
    private String country;
    private String phone;
    private String email;
}
