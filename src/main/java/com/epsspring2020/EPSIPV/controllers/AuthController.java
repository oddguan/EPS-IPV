package com.epsspring2020.EPSIPV.controllers;

import com.epsspring2020.EPSIPV.entities.*;
import com.epsspring2020.EPSIPV.entities.requests.LoginRequest;
import com.epsspring2020.EPSIPV.entities.requests.SignUpRequest;
import com.epsspring2020.EPSIPV.entities.responses.JwtAuthenticationResponse;
import com.epsspring2020.EPSIPV.entities.responses.UserDetailResponse;
import com.epsspring2020.EPSIPV.exceptions.CustomException;
import com.epsspring2020.EPSIPV.services.AuthService;
import com.epsspring2020.EPSIPV.utils.annotations.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {

    private AuthService authService;

    // Wire-in authService for all logic
    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * The login route: it is used by the login page in the front-end, and handles
     * JWT generation and authentication.
     * @param loginRequest The format of a login request from the client front-end
     * @return the JWT token and a user-detail response object
     */
    @PostMapping("/login")
    public ResponseEntity<?> signIn(@Valid @RequestBody LoginRequest loginRequest) {
        // get JWT from calling the login service; uses email and password for authentication
        String jwt = authService.signIn(loginRequest.getEmail(), loginRequest.getPassword());
        // get user details for response
        UserDetailResponse user = authService.queryUserDetailByEmail(loginRequest.getEmail());
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, user));
    }

    /**
     * The registration route for handling registering new users. It will register every user to
     * a role of "ROLE_USER" by default.
     * @param signUpRequest The format of a sign-upp request from the "/register" route in front-end
     * @return a similar response to the login route, where a user-detail object is returned along
     * with the jwt token, because user is expected to be logged-in after registration
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        try {
            // register the user, communicate with database
            User user = authService.register(signUpRequest.getEmail(),
                    signUpRequest.getFirstName(),
                    signUpRequest.getLastName(),
                    signUpRequest.getUsername(),
                    signUpRequest.getPassword(),
                    (long) 1);

            // Same logic as in the login route
            String jwt = authService.signIn(signUpRequest.getEmail(), signUpRequest.getPassword());
            UserDetailResponse userResponse = authService.queryUserDetailByEmail(signUpRequest.getEmail());
            return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, userResponse));
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getBody(), e.getStatus());
        }
    }

    /**
     * Get the current user detail from the JWT token in the front-end.
     * Since the client app will store the JWT token at local storage, each time user re-enter the app
     * the app will try to fetch the user detail by using the remembered token by using this route.
     * @param currentUser User basic information presented in the JWT token
     * @return The detailed information of a user
     */
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
