package com.ct201.toycollect.controller;

import com.ct201.toycollect.dto.CustomerDTO;
import com.ct201.toycollect.payload.ResponseData;
import com.ct201.toycollect.security.JwtFilter;
import com.ct201.toycollect.service.imp.AccountService;
import com.ct201.toycollect.service.imp.CustomerService;
import com.ct201.toycollect.utils.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private JwtFilter jwtFilter;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAllCustomer() {

        ResponseData responseData = new ResponseData();

        List<CustomerDTO> listCustomerDTOS = customerService.findAllCustomers();
        responseData.setData(listCustomerDTOS);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

//    @GetMapping("/get-detail/{id}")
//    public ResponseEntity<?> getCustomerById(@PathVariable("id") Integer id) {
//        ResponseData responseData = new ResponseData();
//        try {
//            // Tìm kiếm customerDTO từ service
//            CustomerDTO customerDTO = customerService.findCustomerById(id);
//
//            // Kiểm tra nếu không tìm thấy
//            if (customerDTO == null) {
//                responseData.setStatus(HttpStatus.NOT_FOUND.value());
//                responseData.setDescription("Customer with ID " + id + " not found.");
//                return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
//            }
//
//            // Trả về kết quả thành công
//            responseData.setData(customerDTO);
//            responseData.setStatus(HttpStatus.OK.value());
//            responseData.setDescription("Customer found successfully.");
//            return new ResponseEntity<>(responseData, HttpStatus.OK);
//
//        } catch (Exception e) {
//            // Xử lý lỗi bất ngờ
//            responseData.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
//            responseData.setDescription("An error occurred while retrieving customer data.");
//            return new ResponseEntity<>(responseData, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(HttpServletRequest request) {
        ResponseData responseData = new ResponseData();
        try {
            String token = jwtFilter.getTokenFromRequest(request);
            String username = jwtUtils.extractUsername(token);
            int userID = accountService.getUserId(username);
            CustomerDTO customerDTO = customerService.findCustomerById(userID);
            responseData.setData(customerDTO);
            responseData.setStatus(HttpStatus.OK.value());
            responseData.setDescription("Customer found successfully.");
            responseData.setSuccess(true);
            System.out.println(customerDTO);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            responseData.setDescription("An error occurred while retrieving customer data.");
            responseData.setSuccess(false);
            responseData.setData(null);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
