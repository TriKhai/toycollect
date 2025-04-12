package com.ct201.toycollect.repository;

import com.ct201.toycollect.entity.Accounts;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Accounts, Integer> {
    Accounts findByUsername(String username);
    Accounts findByEmail(String email);

    @Transactional
    @Modifying
    @Query("update Accounts u set u.password = ?2 where u.email =?1")
    void updatePassword(String email, String password);


}
