package com.ct201.toycollect.service;

import com.ct201.toycollect.dto.*;
import com.ct201.toycollect.entity.*;
import com.ct201.toycollect.entity.keys.KeyOrderDetail;
import com.ct201.toycollect.payload.request.OrderRequest;
import com.ct201.toycollect.payload.request.ProductOrderRequest;
import com.ct201.toycollect.repository.*;
import com.ct201.toycollect.service.imp.OrderService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Transactional
@Service
public class OrderServiceImp implements OrderService {

    @Autowired
    private OrderRepository repoOrder;

    @Autowired
    private OrderDetailRepository repoOrderDetail;

    @Autowired
    private AccountRepository repoAccount;


    @Autowired
    private CustomerRepository repoCustomer;

    @Autowired
    private ProductRepository repoProduct;

    @Override
    public boolean createOrder(OrderRequest orderRequest) {
        try {
            Accounts acc = repoAccount.findByUsername(orderRequest.getUsername());
            if(!acc.getRole().equals("CUSTOMER")) {
                return false;
            }
            Customer customer = repoCustomer.findByAccount_Id(acc.getId());

            Orders order = new Orders();
            order.setCustomerOrder(customer);

            order.setPurchaseMethod(orderRequest.getPurchaseMethod());
            order.setStatus(orderRequest.getStatus());
            Date date = Date.from(Instant.now());
            order.setDateOrder(date);

            repoOrder.save(order);

            List<OrderDetail> listOrderDetail = new ArrayList<>();
            for (ProductOrderRequest item : orderRequest.getProducts()) {
                OrderDetail orderDetail = new OrderDetail();

                KeyOrderDetail keyOrderDetail = new KeyOrderDetail();
                keyOrderDetail.setOrderId(order.getId());
                keyOrderDetail.setProductId(item.getProductId());

                orderDetail.setQuantity(item.getQuantity());
                orderDetail.setPrice(item.getPrice());

                orderDetail.setKeyOrderDetail(keyOrderDetail);

                listOrderDetail.add(orderDetail);
            }
            repoOrderDetail.saveAll(listOrderDetail);
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public List<OrderDTO> getOrdersByUsername(String username) {
        // Tìm account thông qua username
        Accounts acc = repoAccount.findByUsername(username);
        if (acc == null || !acc.getRole().equals("CUSTOMER")) {
            return null;
        }

        // Tìm customer liên kết với account
        Customer customer = repoCustomer.findByAccount_Id(acc.getId());
        if (customer == null) {
            return null;
        }

        // Tìm danh sách Orders theo Customer
        List<Orders> orders = repoOrder.findAllByCustomerOrder_Id(customer.getId());

        List<OrderDTO> orderDTOs = new ArrayList<>();
        for (Orders order : orders) {
            OrderDTO orderDto = new OrderDTO();
            orderDto.setStatus(order.getStatus());
            orderDto.setId(order.getId());
            orderDto.setPurchaseMethod(order.getPurchaseMethod());
            orderDto.setCreatedAt(order.getCreatedAt() != null ? Date.from(order.getCreatedAt()) : null);
            orderDto.setUpdatedAt(order.getUpdatedAt() != null ? Date.from(order.getUpdatedAt()) : null);
            List<OrderProductDTO> orderProductDTOs = new ArrayList<>();
            for (OrderDetail orderDetail : order.getOrderDetails()) {
                OrderProductDTO orderProductDto = new OrderProductDTO();
                orderProductDto.setId(orderDetail.getKeyOrderDetail().getProductId()); // Sử dụng phương thức chính xác
                orderProductDto.setQuantity(orderDetail.getQuantity());
                orderProductDto.setPrice(orderDetail.getPrice());

                Product product = repoProduct.findById(orderDetail.getKeyOrderDetail().getProductId()).get();
                orderProductDto.setName(product.getName());
                orderProductDto.setImage(product.getImage());

                orderProductDTOs.add(orderProductDto); // Thêm vào danh sách chi tiết sản phẩm
            }
            orderDto.setProducts(orderProductDTOs);
            orderDTOs.add(orderDto);
        }
        return orderDTOs;
    }

    @Override
    public List<OrderDTO> getOrders() {
        List<Orders> orders = repoOrder.findAll();
        if (orders.isEmpty()) {
            return null;
        }
        List<OrderDTO> orderDTOs = new ArrayList<>();
        for (Orders order : orders) {
            OrderDTO orderDto = new OrderDTO();

            System.out.println(order.getCustomerOrder());

            orderDto.setStatus(order.getStatus());
            orderDto.setId(order.getId());
            orderDto.setPurchaseMethod(order.getPurchaseMethod());
            orderDto.setCreatedAt(order.getCreatedAt() != null ? Date.from(order.getCreatedAt()) : null);
            orderDto.setUpdatedAt(order.getUpdatedAt() != null ? Date.from(order.getUpdatedAt()) : null);

            // Lấy thông tin khách hàng
            Customer customer = order.getCustomerOrder();
            if (customer != null) {
                CustomerDTO customerDTO = new CustomerDTO();
                customerDTO.setId(customer.getId());
                customerDTO.setFullName(customer.getFullName());
                customerDTO.setGender(customer.isGender());
                customerDTO.setDob(customer.getDob());
                customerDTO.setImage(customer.getImage());

                AddressDTO addressDTO = new AddressDTO();
                addressDTO.setCommune(customer.getCommune());
                addressDTO.setStreet(customer.getStreet());
                addressDTO.setDistrict(customer.getDistrict());
                addressDTO.setProvince(customer.getProvince());
                addressDTO.setCountry(customer.getCountry());

                customerDTO.setAddress(addressDTO);

                orderDto.setCustomer(customerDTO);
            }

            // Lấy sản phẩm
            List<OrderProductDTO> orderProductDTOs = new ArrayList<>();
            for (OrderDetail orderDetail : order.getOrderDetails()) {
                OrderProductDTO orderProductDto = new OrderProductDTO();
                orderProductDto.setId(orderDetail.getKeyOrderDetail().getProductId()); // Sử dụng phương thức chính xác
                orderProductDto.setQuantity(orderDetail.getQuantity());
                orderProductDto.setPrice(orderDetail.getPrice());

                Product product = repoProduct.findById(orderDetail.getKeyOrderDetail().getProductId()).get();
                orderProductDto.setName(product.getName());
                orderProductDto.setImage(product.getImage());

                orderProductDTOs.add(orderProductDto); // Thêm vào danh sách chi tiết sản phẩm
            }
            orderDto.setProducts(orderProductDTOs);
            orderDTOs.add(orderDto);
        }
        return orderDTOs;
    }

    @Override
    public boolean updateOrderStatus(int orderId, String newStatus) {
        Optional<Orders> optionalOrder = repoOrder.findById(orderId);

        if (optionalOrder.isPresent()) {
            Orders order = optionalOrder.get();

            // Update the order status
            order.setStatus(newStatus);

            // Update "sold" for each product in the order
            for (OrderDetail orderDetail : order.getOrderDetails()) {
                Product product = orderDetail.getProductOrderDetail(); // Get the product from OrderDetail
                int quantitySold = orderDetail.getQuantity(); // Get the quantity for this product from the order

                // Properly update the "sold" count, handling null value
                if(product.getStock() == 0) {
                    return false;
                }
                product.setSold(product.getSold() + quantitySold);
                product.setStock(product.getStock() - quantitySold);
                repoProduct.save(product);
            }

            // Save changes to the order
            repoOrder.save(order);

            return true;
        }

        // Order not found
        return false;
    }

    @Override
    public long countOrders() {
        return repoOrder.count();
    }

    @Override
    public double getTotalRevenue() {
        return repoOrderDetail.getTotalRevenue();
    }

    @Override
    public List<MonthlyStatisticsDTO> getMonthlyStatistics(int year) {
        List<MonthlyStatisticsDTO> dbData = repoOrder.getMonthlyStatistics(year);

        List<MonthlyStatisticsDTO> fullYearData = new ArrayList<>();
        Map<Integer, MonthlyStatisticsDTO> dataMap = new HashMap<>();

        for (MonthlyStatisticsDTO dto : dbData) {
            dataMap.put(dto.getMonth(), dto);
        }

        for (int month = 1; month <= 12; month++) {
            if (dataMap.containsKey(month)) {
                fullYearData.add(dataMap.get(month));
            } else {
                fullYearData.add(new MonthlyStatisticsDTO(month, year, 0, 0.0));
            }
        }

        return fullYearData;
    }

    @Override
    public List<TopCustomerDTO> getTop5CustomersByRevenue() {
        List<Object[]> results = repoOrder.findTop5CustomersByRevenue();

        return results.stream()
                .map(row -> {
                    Customer customer = (Customer) row[0];
                    CustomerDTO customerDTO = new CustomerDTO(
                            customer.getId(),
                            customer.getFullName(),
                            customer.isGender(),
                            customer.getDob(),
                            customer.getImage(),
                            new AddressDTO(
                                    customer.getProvince(),
                                    customer.getDistrict(),
                                    customer.getCommune(),
                                    customer.getStreet(),
                                    customer.getCountry()
                            )
                    );
                    return new TopCustomerDTO(customerDTO, (Double) row[1]);
                })
                .collect(Collectors.toList());
    }



}
