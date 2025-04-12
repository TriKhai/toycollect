package com.ct201.toycollect.service;

import com.ct201.toycollect.dto.AccountDTO;
import com.ct201.toycollect.dto.AccountV2DTO;
import com.ct201.toycollect.entity.Accounts;
import com.ct201.toycollect.entity.Customer;
import com.ct201.toycollect.entity.Staff;
import com.ct201.toycollect.payload.request.LoginRequest;
import com.ct201.toycollect.payload.request.SignupRequest;
import com.ct201.toycollect.repository.AccountRepository;
import com.ct201.toycollect.repository.CustomerRepository;
import com.ct201.toycollect.repository.StaffRepository;
import com.ct201.toycollect.service.imp.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImp implements AccountService {
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    StaffRepository staffRepository;

    @Override
    public AccountDTO login(LoginRequest loginRequest) {
        Accounts account = accountRepository.findByUsername(loginRequest.getUsername());
        if(account == null) {
            return null;
        }
        boolean checkPassword = passwordEncoder.matches(loginRequest.getPassword(), account.getPassword());
        if(!checkPassword) {
            return null;
        }

        if(!account.isActive()) {
            return null;
        }
        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setId(account.getId());
        accountDTO.setUsername(account.getUsername());
        accountDTO.setRole(account.getRole());
        return accountDTO;
    }

    @Override
    public boolean createAccount(SignupRequest signupRequest) {
        Accounts account = new Accounts();
        account.setUsername(signupRequest.getUsername());
        account.setRole(signupRequest.getRole());
        account.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        account.setEmail(signupRequest.getEmail());
        account.setActive(true);

        try {
            if(account.getRole().equals("STAFF") || account.getRole().equals("ADMIN")) {
                Staff staff = new Staff();
                staff.setAccount(account);
                account.setStaff(staff);
                accountRepository.save(account);
                staffRepository.save(staff);
                return true;
            } else if (account.getRole().equals("CUSTOMER")) {
                Customer customer = new Customer();
                customer.setAccount(account);
                account.setCustomer(customer);
                accountRepository.save(account);
                customerRepository.save(customer);
                return true;
            }
//            System.out.println("Error Role");
            return false;
        } catch (Exception e) {
            System.out.println("Hello "+ e.getMessage());
            throw e;
        }
    }

    @Override
    public String getRole(String username) {
        return accountRepository.findByUsername(username).getRole();
    }

    @Override
    public int getUserId(String username) {
        return accountRepository.findByUsername(username).getId();
    }

    @Override
    public List<AccountV2DTO> getAllAccounts() {
        List<Accounts> accounts = accountRepository.findAll(); // Fetch all accounts from the DB
        return accounts.stream().map(account -> {
            // Map Account entity to AccountDTO
            AccountV2DTO accountDTO = new AccountV2DTO();
            accountDTO.setId(account.getId());
            accountDTO.setUsername(account.getUsername());
            accountDTO.setRole(account.getRole());
            accountDTO.setEmail(account.getEmail());
            accountDTO.setPhone(account.getPhone());
            accountDTO.setCreatedAt(account.getCreatedAt());
            accountDTO.setUpdatedAt(account.getUpdatedAt());
            accountDTO.setActive(account.isActive());
            return accountDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public long countAccounts() {
        return accountRepository.count();
    }

    @Override
    public boolean updateAccountStatus(Integer id) {
        Accounts account = accountRepository.findById(id).orElse(null);
        if (account == null) {
            return false;
        }

        account.setActive(!account.isActive());
        accountRepository.save(account);
        return true;
    }
}
