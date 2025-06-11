package org.example.to_do_backend.services;

import org.example.to_do_backend.auth.JwtService;
import org.example.to_do_backend.dto.LoginRequest;
import org.example.to_do_backend.dto.RegisterRequest;
import org.example.to_do_backend.entities.AppUser;
import org.example.to_do_backend.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthUserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Transactional
    public AppUser registerUser(RegisterRequest registerRequest) {
        //Check if user exists
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            //If the user exists, return an exception
            throw new IllegalArgumentException("Username is already in use");
        }

        //If the user does not exist, create a new one and save it to the DB
        AppUser newAppUser = new AppUser();
        newAppUser.setUsername(registerRequest.getUsername());
        newAppUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        return userRepository.save(newAppUser);
    }

    //AuthenticationManager is the Spring implementation to login and register users
    public String loginUserAndGenerateToken(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return jwtService.generateToken(userDetails);
    }

    public int getIdByUsername(String username) {
        Optional<AppUser> appUser =  userRepository.findByUsername(username);
        return Math.toIntExact(appUser.get().getId());
    }



}
