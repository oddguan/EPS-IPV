package com.epsspring2020.EPSIPV.controllers;

import com.epsspring2020.EPSIPV.entities.*;
import com.epsspring2020.EPSIPV.entities.requests.LoginRequest;
import com.epsspring2020.EPSIPV.entities.requests.SignUpRequest;
import com.epsspring2020.EPSIPV.entities.response.ApiResponse;
import com.epsspring2020.EPSIPV.entities.response.JwtAuthenticationResponse;
import com.epsspring2020.EPSIPV.entities.response.UserDetailResponse;
import com.epsspring2020.EPSIPV.exceptions.CustomException;
import com.epsspring2020.EPSIPV.services.AuthService;
import com.epsspring2020.EPSIPV.utils.annotations.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {

    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> signIn(@Valid @RequestBody LoginRequest loginRequest) {
        String jwt = authService.signIn(loginRequest.getEmail(), loginRequest.getPassword());
        UserDetailResponse user = authService.queryUserDetailByEmail(loginRequest.getEmail());
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, user));
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

            String jwt = authService.signIn(signUpRequest.getEmail(), signUpRequest.getPassword());
            UserDetailResponse userResponse = authService.queryUserDetailByEmail(signUpRequest.getEmail());
            return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, userResponse));
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getBody(), e.getStatus());
        }
    }

    @GetMapping("/user")
    public ResponseEntity<UserDetailResponse> getUserDetailFromAuthenticationToken(@CurrentUser UserPrincipal currentUser) {
        try {
            UserDetailResponse user = authService.queryUserDetailByEmail(currentUser.getEmail());
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
