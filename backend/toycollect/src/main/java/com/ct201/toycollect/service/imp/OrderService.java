package com.ct201.toycollect.service.imp;

import com.ct201.toycollect.dto.MonthlyStatisticsDTO;
import com.ct201.toycollect.dto.OrderDTO;
import com.ct201.toycollect.dto.TopCustomerDTO;
import com.ct201.toycollect.payload.request.OrderRequest;

import java.util.List;

public interface OrderService {
    boolean createOrder(OrderRequest orderRequest);
    List<OrderDTO> getOrdersByUsername(String username);
    List<OrderDTO> getOrders();
    boolean updateOrderStatus(int orderId, String newStatus);
    long countOrders();
    double getTotalRevenue();
    List<MonthlyStatisticsDTO> getMonthlyStatistics(int i);
    public List<TopCustomerDTO> getTop5CustomersByRevenue();
}
