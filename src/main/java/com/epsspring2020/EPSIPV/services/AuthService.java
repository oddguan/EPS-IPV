package com.epsspring2020.EPSIPV.services;

import com.epsspring2020.EPSIPV.daos.AuthDao;
import com.epsspring2020.EPSIPV.entities.RoleName;
import com.epsspring2020.EPSIPV.entities.User;
import com.epsspring2020.EPSIPV.entities.responses.ApiResponse;
import com.epsspring2020.EPSIPV.entities.responses.UserDetailResponse;
import com.epsspring2020.EPSIPV.exceptions.CustomException;
import com.epsspring2020.EPSIPV.utils.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Handles all business logic for authentication related routes
 */
@Service
public class AuthService {

    // authentication related database interactions
    private AuthDao authDao;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider tokenProvider;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(AuthDao authDao,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider,
                       PasswordEncoder passwordEncoder) {
        this.authDao = authDao;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * signing into the system
     * @param email email address of the user
     * @param password password of the user
     * @return generated JWT token as a string
     */
    public String signIn(String email, String password) {
        // Authenticate the posted email and password
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
        // Set the authentication status
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // Return the generated JWT token
        return tokenProvider.generateToken(authentication);
    }

    /**
     * register an account in the database
     * @param email email address
     * @param firstName first name of the user
     * @param lastName last name of the user
     * @param username username of the user
     * @param password password of the user
     * @param roleId roleId of the user, which is generally 1
     * @return user details
     */
    public User register(String email, String firstName, String lastName, String username, String password, Long roleId) {
        // if email was found in the database, should not register account again
        if (authDao.findUserByEmail(email) != null) {
            throw new CustomException(new ApiResponse(false, "Email is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }
        if (authDao.findUserByUsername(username) != null) {
            throw new CustomException(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(firstName, lastName, username, email, password, roleId);

        user.setPassword(passwordEncoder.encode(password));
        user.setRoleId((long) 1); // Set the role of the user to "ROLE_USER"

        // Save user information to the database
        try {
            authDao.saveUserInfo(user);
        } catch (Exception e) {
            throw new CustomException(new ApiResponse(false, "Unknown Database Error!"), HttpStatus.BAD_REQUEST);
        }

        return user;
    }

    /**
     * Get user detail by email address
     * @param email email address
     * @return user details
     */
    public UserDetailResponse queryUserDetailByEmail(String email) {
        UserDetailResponse result;
        try {
            User user = authDao.findUserByEmail(email);
            result = new UserDetailResponse(
                    user.getId(),
                    user.getUsername(),
                    user.getRoleId() == 1 ? RoleName.ROLE_USER.name() : RoleName.ROLE_ADMIN.name(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail());
        } catch (Exception e) {
            result = null;
        }
        return result;
    }
}
