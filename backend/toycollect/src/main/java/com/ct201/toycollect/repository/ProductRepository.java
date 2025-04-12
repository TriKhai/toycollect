package com.ct201.toycollect.repository;

import com.ct201.toycollect.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query(value = "SELECT * FROM product ORDER BY created_at DESC LIMIT :limit", nativeQuery = true)
    List<Product> findLatestProducts(@Param("limit") int limit);

    @Query("SELECT COALESCE(SUM(p.stock), 0) FROM Product p")
    long countTotalProducts();

    @Query("SELECT COALESCE(SUM(p.sold), 0) FROM Product p")
    long countTotalProductsSold();


}
