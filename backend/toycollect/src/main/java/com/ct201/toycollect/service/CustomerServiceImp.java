package com.ct201.toycollect.service;

import com.ct201.toycollect.dto.AddressDTO;
import com.ct201.toycollect.dto.CustomerDTO;
import com.ct201.toycollect.entity.Customer;
import com.ct201.toycollect.repository.CustomerRepository;
import com.ct201.toycollect.service.imp.CustomerService;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImp implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public List<CustomerDTO> findAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        List<CustomerDTO> customerDTOS = new ArrayList<>();
        for (Customer customer : customers) {
            // Customer DTO
            CustomerDTO customerDTO = new CustomerDTO();
            customerDTO.setId(customer.getId());
            customerDTO.setFullName(customer.getFullName());
            customerDTO.setDob(customer.getDob());
            customerDTO.setImage(customer.getImage());
            customerDTO.setGender(customer.isGender());

            // Address DTO
            AddressDTO addressDTO = new AddressDTO();
            addressDTO.setCommune(customer.getCommune());
            addressDTO.setStreet(customer.getStreet());
            addressDTO.setDistrict(customer.getDistrict());
            addressDTO.setProvince(customer.getProvince());
            addressDTO.setCountry(customer.getCountry());

            customerDTO.setAddress(addressDTO);
            customerDTOS.add(customerDTO);
        }

        return customerDTOS;
    }

    // Định nghĩa Exception tùy chỉnh
    public class CustomerNotFoundException extends RuntimeException {
        public CustomerNotFoundException(String message) {
            super(message);
        }
    }

    @Override
    public CustomerDTO findCustomerById(Integer id) {
        System.out.println("id" + id);
        Optional<Customer> cusOpt = Optional.ofNullable(customerRepository.findByAccount_Id(id));
        if (cusOpt.isEmpty()) {
            return null;
        }

        // Lấy đối tượng Customer từ Optional
        Customer cus = cusOpt.get();
        System.out.println(cus.getFullName());
        return new CustomerDTO(
                cus.getId(),
                cus.getFullName(),
                cus.isGender(),
                cus.getDob(),
                cus.getImage(),
                new AddressDTO(
                        cus.getCommune(),
                        cus.getStreet(),
                        cus.getDistrict(),
                        cus.getProvince(),
                        cus.getCountry()
                )
        );
    }

}
