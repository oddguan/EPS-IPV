package com.epsspring2020.EPSIPV.controllers;

import com.epsspring2020.EPSIPV.entities.*;
import com.epsspring2020.EPSIPV.entities.requests.LoginRequest;
import com.epsspring2020.EPSIPV.entities.requests.SignUpRequest;
import com.epsspring2020.EPSIPV.entities.response.ApiResponse;
import com.epsspring2020.EPSIPV.entities.response.JwtAuthenticationResponse;
import com.epsspring2020.EPSIPV.exceptions.CustomException;
import com.epsspring2020.EPSIPV.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {

    private AuthService authService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(
            AuthService authService,
            PasswordEncoder passwordEncoder) {
        this.authService = authService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> signIn(@Valid @RequestBody LoginRequest loginRequest) {
        String jwt = authService.signIn(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        try {
            User user = authService.register(signUpRequest.getEmail(),
                    signUpRequest.getFirstName(),
                    signUpRequest.getLastName(),
                    signUpRequest.getUsername(),
                    signUpRequest.getPassword(),
                    (long) 1);

            URI location = ServletUriComponentsBuilder
                    .fromCurrentContextPath().path("/api/users/{username}")
                    .buildAndExpand(user.getUsername()).toUri();

            return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getBody(), e.getStatus());
        }
    }
}
