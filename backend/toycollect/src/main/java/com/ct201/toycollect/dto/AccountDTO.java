package com.ct201.toycollect.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {
    private int id;
    private String username;
    private String role;
    private String token;
}
