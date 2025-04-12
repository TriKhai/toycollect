package com.ct201.toycollect.repository;

import com.ct201.toycollect.entity.Accounts;
import com.ct201.toycollect.entity.ForgotPassword;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Integer> {
    @Query("select fp from ForgotPassword fp where fp.otp = ?1 and fp.account = ?2")
    Optional<ForgotPassword> findByOtpAndAccount(Integer otp, Accounts account);

//    @Query("select fp from ForgotPassword fp where fp.account = ?1")
//    Optional<ForgotPassword> findByAccount(Accounts account);

    ForgotPassword findByAccount(Accounts account);

//    @Transactional
//    @Modifying
//    @Query("DELETE FROM ForgotPassword fp WHERE fp.account = ?1")
//    void delete(Accounts account);

    @Transactional
    @Modifying
    @Query("update ForgotPassword fp set fp.otp = ?2 where fp.account =?1")
    void updateOtp(Accounts account, Integer otp);
}
