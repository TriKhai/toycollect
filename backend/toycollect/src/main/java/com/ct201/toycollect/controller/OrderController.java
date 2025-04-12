package com.ct201.toycollect.controller;

import com.ct201.toycollect.dto.OrderDTO;
import com.ct201.toycollect.entity.Orders;
import com.ct201.toycollect.payload.ResponseData;
import com.ct201.toycollect.payload.request.OrderRequest;
import com.ct201.toycollect.service.imp.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        ResponseData responseData = new ResponseData();

        boolean success = orderService.createOrder(orderRequest);
        System.out.println(success);
        if (!success) {
            responseData.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            responseData.setDescription("Fail to create order");
            responseData.setSuccess(false);
            responseData.setData(null);
            return new ResponseEntity<Object>(responseData, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        responseData.setSuccess(true);
        responseData.setData(orderRequest);
        responseData.setStatus(HttpStatus.OK.value());
        responseData.setDescription("Success to create order");

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getOrdersByUsername(@PathVariable String username) {
        ResponseData responseData = new ResponseData();
        List<OrderDTO> orders = orderService.getOrdersByUsername(username);
        if (orders == null || orders.isEmpty()) {
            responseData.setSuccess(false);
            responseData.setData(null);
            responseData.setStatus(HttpStatus.NOT_FOUND.value());
            responseData.setDescription("No orders found for this username.");
            return new ResponseEntity<Object>(responseData, HttpStatus.NOT_FOUND);
        }
        responseData.setSuccess(true);
        responseData.setData(orders);
        responseData.setStatus(HttpStatus.OK.value());
        responseData.setDescription("Get orders by username");
        return new ResponseEntity<Object>(responseData, HttpStatus.OK);
    }


}
