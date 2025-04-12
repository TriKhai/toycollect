package com.ct201.toycollect.repository;

import com.ct201.toycollect.dto.CustomerDTO;
import com.ct201.toycollect.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Customer findByAccount_Id(int accountId);
}
