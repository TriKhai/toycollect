package com.ct201.toycollect.repository;

import com.ct201.toycollect.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {
}
