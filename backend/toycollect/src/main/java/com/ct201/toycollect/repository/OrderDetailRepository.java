package com.ct201.toycollect.repository;

import com.ct201.toycollect.dto.MonthlyStatisticsDTO;
import com.ct201.toycollect.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    @Query("SELECT COUNT(od) > 0 FROM OrderDetail od WHERE od.productOrderDetail.id = :productId")
    boolean existsByProductId(@Param("productId") int productId);

    @Query("""
        SELECT COALESCE(SUM(od.price * od.quantity), 0) 
        FROM OrderDetail od 
        JOIN Orders o ON od.keyOrderDetail.orderId = o.id 
        WHERE o.status = 'Approved'
    """)
    double getTotalRevenue();


}
