package com.ct201.toycollect.controller;

import com.ct201.toycollect.dto.MailBody;
import com.ct201.toycollect.entity.Accounts;
import com.ct201.toycollect.entity.ForgotPassword;
import com.ct201.toycollect.payload.ResponseData;
import com.ct201.toycollect.payload.request.ChangePassword;
import com.ct201.toycollect.payload.request.VeridyOtp;
import com.ct201.toycollect.payload.request.VerifyEmail;
import com.ct201.toycollect.repository.AccountRepository;
import com.ct201.toycollect.repository.ForgotPasswordRepository;
import com.ct201.toycollect.service.EmailService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Objects;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/forgot-password")
public class ForgotPasswordController {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    EmailService emailService;

    @Autowired
    ForgotPasswordRepository forgotPasswordRepository;

    private Integer otpGenerator() {
        Random random = new Random();
        return random.nextInt(100000, 999999);
    }

    private void SendMail(Integer otp, String email) {
        MailBody mailBody = MailBody.builder()
                .to(email)
                .text("This is the OTP for your Forgot Password request: " + otp)
                .subject("OTP for Forgot Password request (ToyCollect Web)")
                .build();

        emailService.sendSimpleMessage(mailBody);
    }


    //Send mail for email verification
    @PostMapping("/verify-mail")
    public ResponseEntity<?> verifyMail(@RequestBody VerifyEmail verifyEmail) {
        ResponseData response = new ResponseData();

        String email = verifyEmail.email();
        Accounts acc = accountRepository.findByEmail(email);
        if (acc == null) {
            throw new UsernameNotFoundException(email);
        }

        int otp = otpGenerator();

        // Kiểm tra xem có OTP nào đã được tạo cho tài khoản này chưa
        ForgotPassword existingFp = forgotPasswordRepository.findByAccount(acc);
        if(existingFp != null) {
            if(existingFp.getExpireTime().after(new Date())) {
                response.setStatus(200);
                response.setData("OTP has been sent previously and is still valid.");
                response.setSuccess(Boolean.FALSE);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
            System.out.println("update");
            forgotPasswordRepository.updateOtp(acc, otp);
            SendMail(otp, email);
            response.setStatus(200);
            response.setData("Email verified successfully");
            response.setSuccess(Boolean.TRUE);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }


        ForgotPassword fp = ForgotPassword.builder()
                .otp(otp)
                .expireTime(new Date(System.currentTimeMillis() + 1000 + 60))
                .account(acc)
                .build();

        forgotPasswordRepository.save(fp);
        SendMail(otp, email);

        response.setStatus(200);
        response.setData("Email verified successfully");
        response.setSuccess(Boolean.TRUE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> veridyOtp(@RequestBody VeridyOtp veridyOtp) {
        ResponseData response = new ResponseData();
        String email = veridyOtp.email();
        Integer otp = veridyOtp.otp();
        Accounts acc = accountRepository.findByEmail(email);
        System.out.println(("OTP: " + otp));
        if(acc == null) {
            throw new UsernameNotFoundException(email);
        }

        // Tìm kiếm OTP trong bảng ForgotPassword
        Optional<ForgotPassword> fp = forgotPasswordRepository.findByOtpAndAccount(otp, acc);
        if (!fp.isPresent()) {
            throw new RuntimeException("OTP doesn't exist or is invalid");
        }

        response.setStatus(200);
        response.setData("OTP verified successfully");
        response.setSuccess(Boolean.TRUE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePassword changePassword) {
        ResponseData response = new ResponseData();

        String email = changePassword.email();
        String password = changePassword.password();
        String repeatPassword = changePassword.repeatPassword();
        System.out.println("password: " + password);
        System.out.println("repeatPassword: " + repeatPassword);
        System.out.println("email: " + email);

        if(!Objects.equals(password, repeatPassword)) {
            response.setStatus(200);
            response.setData("Passwords do not match");
            response.setSuccess(Boolean.FALSE);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        String encodedPassword = passwordEncoder.encode(password);
        accountRepository.updatePassword(email, encodedPassword);

        response.setStatus(200);
        response.setData("Password changed successfully");
        response.setSuccess(Boolean.FALSE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
