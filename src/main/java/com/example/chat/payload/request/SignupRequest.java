package com.example.chat.payload.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class SignupRequest {
    @NotBlank
    @Size(min=3, max=20)
    private String username;

    @NotBlank
    @Email
    @Size(max=50)
    private String email;

    @NotBlank
    @Size(min=8, max=50)
    private String password;
}
