package com.ct201.toycollect.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private int id;
    private String fullName;
    private boolean gender;
    private Date dob;
    private String image;
    private AddressDTO address;
}
