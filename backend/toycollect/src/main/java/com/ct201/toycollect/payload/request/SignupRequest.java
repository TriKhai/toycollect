package com.ct201.toycollect.payload.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignupRequest {
    private String username;
    private String password;
    private String fullName;
    private String role;
    private String email;
}
