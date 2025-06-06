package org.example.to_do_backend.dto;

import lombok.Data;

@Data
public class AuthResponse {

    private String message;
    private String accessToken;

    public AuthResponse(String message) {
        this.message = message;
    }

    public AuthResponse(String message, String accessToken) {
        this.message = message;
        this.accessToken = accessToken;
    }
}
