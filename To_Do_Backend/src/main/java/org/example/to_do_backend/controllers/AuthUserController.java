package org.example.to_do_backend.controllers;

import org.example.to_do_backend.dto.AuthResponse;
import org.example.to_do_backend.dto.LoginRequest;
import org.example.to_do_backend.dto.RegisterRequest;
import org.example.to_do_backend.model.AppUser;
import org.example.to_do_backend.services.AuthUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthUserController {

    private final AuthUserService authUserService;

    public AuthUserController(AuthUserService authUserService) {
        this.authUserService = authUserService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody RegisterRequest registerRequest
    ) {
        try {
            authUserService.registerUser(registerRequest);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new AuthResponse("User registered successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse("An unexpected error occurred"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody LoginRequest loginRequest
    ) {
        try {
            String token = authUserService.loginUserAndGenerateToken(loginRequest);
            int userId = authUserService.getIdByUsername(loginRequest.getUsername());

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new AuthResponse("User logged in successfully!", token, userId));
        } catch (AuthenticationException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse("An unexpected error occurred"));
        }
    }
}

