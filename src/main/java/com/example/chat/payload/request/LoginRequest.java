package com.example.chat.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginRequest {
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private String email;
}
