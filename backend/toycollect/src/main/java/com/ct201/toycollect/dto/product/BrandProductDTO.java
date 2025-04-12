package com.ct201.toycollect.dto.product;

import com.ct201.toycollect.dto.AddressDTO;
import com.ct201.toycollect.dto.ContactDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BrandProductDTO {
    private String name;
    private AddressDTO address;
    private ContactDTO contact;

}
