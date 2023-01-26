package com.example.chat.payload.request;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class NewMessageRequest {
    @NotBlank
    @NotNull
    @Max(255)
    private String message;
}
