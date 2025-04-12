package com.ct201.toycollect.payload.request;

public record ChangePassword(String email, String password, String repeatPassword) {
}
