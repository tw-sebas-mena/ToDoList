package org.example.to_do_backend.dto;

import lombok.Data;

@Data
public class AuthResponse {

    private String message;
    private String accessToken;
    private int loggedInUserId;

    public AuthResponse(String message) {
        this.message = message;
    }

    public AuthResponse(String message, String accessToken) {
        this.message = message;
        this.accessToken = accessToken;
    }

    public AuthResponse(String message, String accessToken, int loggedInUserId) {
        this.message = message;
        this.accessToken = accessToken;
        this.loggedInUserId = loggedInUserId;
    }
}
