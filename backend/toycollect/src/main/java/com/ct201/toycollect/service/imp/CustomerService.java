package com.ct201.toycollect.service.imp;

import com.ct201.toycollect.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {
    List<CustomerDTO> findAllCustomers();
    CustomerDTO findCustomerById(Integer id);
}
