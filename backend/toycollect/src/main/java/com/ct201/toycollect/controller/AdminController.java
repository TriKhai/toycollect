package com.ct201.toycollect.controller;

import com.ct201.toycollect.dto.*;
import com.ct201.toycollect.dto.product.ProductDTO;
import com.ct201.toycollect.payload.ResponseData;
import com.ct201.toycollect.repository.BrandRepository;
import com.ct201.toycollect.repository.ProductTypeRepository;
import com.ct201.toycollect.repository.PromotionRepository;
import com.ct201.toycollect.security.JwtFilter;
import com.ct201.toycollect.service.imp.*;
import com.ct201.toycollect.utils.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private ProductService productService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private AccountService accountService;
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private ProductTypeService productTypeService;
    @Autowired
    private PromotionService promotionService;

    @GetMapping("")
    public ResponseEntity<?> login(HttpServletRequest request) {
        ResponseData responseData = new ResponseData();
        String token = jwtFilter.getTokenFromRequest(request);
        String username = jwtUtils.extractClaims(token).getSubject();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        System.out.println("Principal: " + authentication.getPrincipal());
        System.out.println("Authorities: " + authentication.getAuthorities());
        System.out.println("Details: " + authentication.getDetails());
        return new ResponseEntity<>(responseData, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllAccounts() {
        ResponseData responseData = new ResponseData();
        try {
            List<AccountV2DTO> accounts = accountService.getAllAccounts(); // Fetch all accounts (users and admins)
            if (accounts.isEmpty()) {
                responseData.setData(null);
                responseData.setSuccess(false);
                responseData.setDescription("No accounts found.");
                responseData.setStatus(HttpStatus.NOT_FOUND.value());
                return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
            }
            responseData.setData(accounts);
            responseData.setSuccess(true);
            responseData.setDescription("Fetched all accounts successfully.");
            responseData.setStatus(HttpStatus.OK.value());
            return ResponseEntity.ok(responseData); // HTTP 200
        } catch (Exception e) {
            responseData.setData(e.getMessage());
            responseData.setSuccess(false);
            responseData.setDescription("Failed to fetch accounts.");
            responseData.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseData); // HTTP 500
        }
    }

    @GetMapping("/products")
    public ResponseEntity<?> getProducts(HttpServletRequest request) {
        ResponseData responseData = new ResponseData();
        try {
            List<ProductDTO> products = productService.getAllProducts();
            responseData.setData(products);
            responseData.setDescription("Fetch products successfully");
            responseData.setStatus(200);
            responseData.setSuccess(true);
            return ResponseEntity.ok(responseData); // HTTP 200 OK
        } catch (Exception e) {
            responseData.setDescription("Failed to fetch products");
            responseData.setData(e.getMessage());
            responseData.setStatus(500);
            responseData.setSuccess(false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseData); // HTTP 500
        }
    }

//    @GetMapping("/statistics")
//    public ResponseEntity<?> getProductStatistics(HttpServletRequest request) {
//        ResponseData responseData = new ResponseData();
//        try {
//            ProductStatisticsDTO products = productService.getProductStatistics();
//            responseData.setData(products);
//            responseData.setDescription("Fetch products successfully");
//            responseData.setStatus(200);
//            responseData.setSuccess(true);
//            return ResponseEntity.ok(responseData); // HTTP 200 OK
//        } catch (Exception e) {
//            responseData.setDescription("Failed to fetch products");
//            responseData.setData(e.getMessage());
//            responseData.setStatus(500);
//            responseData.setSuccess(false);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseData); // HTTP 500
//        }
//    }

    @GetMapping("/orders")
    public ResponseEntity<?> getOrders() {
        ResponseData responseData = new ResponseData();
        List<OrderDTO> orders = orderService.getOrders();
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

    @PutMapping("/order/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable int orderId) {
        ResponseData responseData = new ResponseData();
        boolean updated = orderService.updateOrderStatus(orderId, "Approved");

        if (updated) {
            responseData.setSuccess(true);
            responseData.setData(updated);
            responseData.setStatus(HttpStatus.OK.value());
            responseData.setDescription("Status updated successfully.");
            return new ResponseEntity<Object>(responseData, HttpStatus.OK);
        } else {
            responseData.setSuccess(false);
            responseData.setData(updated);
            responseData.setStatus(HttpStatus.NOT_FOUND.value());
            responseData.setDescription("Order not found or status update failed.");
            return new ResponseEntity<Object>(responseData, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/count")
    public ResponseEntity<?> getCount() {
        ResponseData responseData = new ResponseData();
        CountDTO count = new CountDTO();

        count.setTotalProduct(productService.getCountProducts());
        count.setTotalOrder(orderService.countOrders());
        count.setTotalAccount(accountService.countAccounts());
        count.setTotalBrands(brandRepository.count());
        count.setTotalProductInStock(productService.getCountProductsInStock());
        count.setTotalProductSold(productService.getCountProductsSold());
        count.setTotalTypeProducts(productTypeService.countTypes());
        count.setTotalVouchers(promotionService.countPromotions());
        count.setTotalRevenues(orderService.getTotalRevenue());

        responseData.setSuccess(true);
        responseData.setData(count);
        responseData.setStatus(HttpStatus.OK.value());
        responseData.setDescription("Status updated successfully.");
        return new ResponseEntity<Object>(responseData, HttpStatus.OK);
    }

    @GetMapping("/monthly")
    public ResponseEntity<?> getMonthlyStatistics() {
        ResponseData responseData = new ResponseData();

        List<MonthlyStatisticsDTO> monthlyStatistics = orderService.getMonthlyStatistics(2025);

        responseData.setSuccess(true);
        responseData.setData(monthlyStatistics);
        responseData.setStatus(HttpStatus.OK.value());
        responseData.setDescription("Status updated successfully.");
        return new ResponseEntity<Object>(responseData, HttpStatus.OK);
    }

    @GetMapping("/top-revenue")
    public ResponseEntity<?> getTop5CustomersByRevenue() {
        ResponseData responseData = new ResponseData();
        List<TopCustomerDTO> list = orderService.getTop5CustomersByRevenue();
        if (list == null || list.isEmpty()) {
            responseData.setSuccess(false);
            responseData.setData(null);
            responseData.setStatus(HttpStatus.NOT_FOUND.value());
            responseData.setDescription("No orders found for this username.");
            return new ResponseEntity<Object>(responseData, HttpStatus.NOT_FOUND);
        } else {
            responseData.setSuccess(true);
            responseData.setData(list);
            responseData.setStatus(HttpStatus.OK.value());
            responseData.setDescription("Get orders by username");
            return new ResponseEntity<Object>(responseData, HttpStatus.OK);
        }
    }

    @PutMapping("/account/{id}/active")
    public ResponseEntity<?> updateAccountStatus(@PathVariable Integer id) {
        ResponseData responseData = new ResponseData();
        boolean updated = accountService.updateAccountStatus(id);

        if (updated) {
            responseData.setSuccess(true);
            responseData.setData(updated);
            responseData.setStatus(HttpStatus.OK.value());
            responseData.setDescription("Status updated successfully.");
            return new ResponseEntity<Object>(responseData, HttpStatus.OK);
        } else {
            responseData.setSuccess(false);
            responseData.setData(updated);
            responseData.setStatus(HttpStatus.NOT_FOUND.value());
            responseData.setDescription("Order not found or status update failed.");
            return new ResponseEntity<Object>(responseData, HttpStatus.NOT_FOUND);
        }
    }

}
