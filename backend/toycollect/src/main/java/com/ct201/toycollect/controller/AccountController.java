package com.ct201.toycollect.controller;

import com.ct201.toycollect.dto.AccountDTO;
import com.ct201.toycollect.payload.ResponseData;
import com.ct201.toycollect.payload.request.GetRoleRequest;
import com.ct201.toycollect.payload.request.LoginRequest;
import com.ct201.toycollect.payload.request.SignupRequest;
import com.ct201.toycollect.service.imp.AccountService;
import com.ct201.toycollect.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    AccountService accountService;

    @Autowired
    private JwtUtils jwtUtils;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        ResponseData responseData = new ResponseData();

        try {
            AccountDTO accDTO = accountService.login(loginRequest);

            if (accDTO == null) {
                responseData.setStatus(HttpStatus.UNAUTHORIZED.value());
                responseData.setDescription("Failed to login");
                responseData.setData(null);
                responseData.setSuccess(Boolean.FALSE);
                return new ResponseEntity<>(responseData, HttpStatus.UNAUTHORIZED);
            }

            String token = jwtUtils.generateToken(accDTO);
            accDTO.setToken(token);
            responseData.setStatus(HttpStatus.OK.value());
            responseData.setData(accDTO);
            responseData.setSuccess(Boolean.TRUE);
            responseData.setDescription("Login successful");

            return new ResponseEntity<>(responseData, HttpStatus.OK);

        } catch (Exception e) {
            responseData.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            responseData.setDescription("An error occurred while processing your request.");
            responseData.setData(null);
            responseData.setSuccess(Boolean.FALSE);

            // Bạn có thể log lỗi để dễ dàng debug, có the dung logger
//            e.printStackTrace();
            System.out.println(e.getMessage());

            return new ResponseEntity<>(responseData, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signUpRequest) {
        ResponseData responseData = new ResponseData();
        try {
            // Giả sử phương thức createAccount trả về true nếu thành công, false nếu thất bại
            if (!accountService.createAccount(signUpRequest)) {
                responseData.setStatus(HttpStatus.CONFLICT.value()); // Trả về 409 nếu có vấn đề khi tạo tài khoản
                responseData.setData(null);
                responseData.setSuccess(Boolean.FALSE);
                responseData.setDescription("Failed to create account: Username or email may be taken.");
                return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
            }
            responseData.setStatus(HttpStatus.CREATED.value()); // Trả về mã 201 nếu tài khoản được tạo thành công
            responseData.setDescription("Account created successfully");
            responseData.setData(null); // Không cần dữ liệu thêm (hoặc trả lại đối tượng tài khoản mới nếu cần)
            responseData.setSuccess(Boolean.TRUE);
            return new ResponseEntity<>(responseData, HttpStatus.CREATED); // Trả về trạng thái CREATED
        } catch (Exception e) {
            // Xử lý các lỗi ngoài dự kiến (e.g. database lỗi, exception không lường trước)
            responseData.setStatus(HttpStatus.BAD_REQUEST.value());
            responseData.setData(null);
            responseData.setSuccess(Boolean.FALSE);
            responseData.setDescription("Internal server error: " + e.getMessage());
            return new ResponseEntity<>(responseData, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/get-role")
    public ResponseEntity<?> getRole(@RequestBody GetRoleRequest getRoleRequest) {
        ResponseData responseData = new ResponseData();
        System.out.println("Hello");
        System.out.println(getRoleRequest.getUsername());
        try {
            String role = accountService.getRole(getRoleRequest.getUsername());

            if (role == null) {
                responseData.setStatus(HttpStatus.UNAUTHORIZED.value());
                responseData.setDescription("Invalid username or password");
                responseData.setData(null);
                responseData.setSuccess(Boolean.FALSE);
                return new ResponseEntity<>(responseData, HttpStatus.UNAUTHORIZED);
            }

            responseData.setStatus(HttpStatus.OK.value());
            responseData.setData(role);
            responseData.setSuccess(Boolean.TRUE);
            responseData.setDescription("get role successful");

            return new ResponseEntity<>(responseData, HttpStatus.OK);

        } catch (Exception e) {
            responseData.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            responseData.setDescription("An error occurred while processing your request.");
            responseData.setData(null);
            responseData.setSuccess(Boolean.FALSE);

            // Bạn có thể log lỗi để dễ dàng debug, có the dung logger
//            e.printStackTrace();
            System.out.println(e.getMessage());

            return new ResponseEntity<>(responseData, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
