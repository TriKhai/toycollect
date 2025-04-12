package com.ct201.toycollect.repository;

import com.ct201.toycollect.dto.MonthlyStatisticsDTO;
import com.ct201.toycollect.dto.TopCustomerDTO;
import com.ct201.toycollect.entity.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Integer> {
    List<Orders> findAllByCustomerOrder_Id(int customerId);

    @Query("SELECT NEW com.ct201.toycollect.dto.MonthlyStatisticsDTO(MONTH(o.createdAt), YEAR(o.createdAt), COUNT(DISTINCT o.id), COALESCE(SUM(od.price * od.quantity), 0)) " +
            "FROM Orders o JOIN o.orderDetails od " +
            "WHERE YEAR(o.createdAt) = :year " +
            "AND o.status = 'Approved' " +
            "GROUP BY MONTH(o.createdAt), YEAR(o.createdAt) " +
            "ORDER BY MONTH(o.createdAt)")
    List<MonthlyStatisticsDTO> getMonthlyStatistics(int year);

    @Query("SELECT o.customerOrder, SUM(od.price * od.quantity) as totalRevenue " +
            "FROM Orders o JOIN o.orderDetails od " +
            "GROUP BY o.customerOrder " +
            "ORDER BY totalRevenue DESC")
    List<Object[]> findTop5CustomersByRevenue();
}
