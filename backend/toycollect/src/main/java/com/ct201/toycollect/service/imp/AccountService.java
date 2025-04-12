package com.ct201.toycollect.service.imp;

import com.ct201.toycollect.dto.AccountDTO;
import com.ct201.toycollect.dto.AccountV2DTO;
import com.ct201.toycollect.payload.request.LoginRequest;
import com.ct201.toycollect.payload.request.SignupRequest;

import java.util.List;

public interface AccountService {
    AccountDTO login(LoginRequest loginRequest);
    boolean createAccount(SignupRequest signupRequest);
//    ProfileDTO getProfile();
    String getRole(String username);
    int getUserId(String username);
    List<AccountV2DTO> getAllAccounts();
    long countAccounts();
    boolean updateAccountStatus(Integer id);
}

