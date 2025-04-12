package com.ct201.toycollect.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddressDTO {
    private String province;
    private String district;
    private String commune;
    private String street;
    private String country;
}
