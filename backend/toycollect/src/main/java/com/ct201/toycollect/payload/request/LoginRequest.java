package com.ct201.toycollect.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    private String username;
    private String password;
}
