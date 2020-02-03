package com.epsspring2020.EPSIPV.services;

import com.epsspring2020.EPSIPV.daos.AuthDao;
import com.epsspring2020.EPSIPV.entities.RoleName;
import com.epsspring2020.EPSIPV.entities.User;
import com.epsspring2020.EPSIPV.entities.response.ApiResponse;
import com.epsspring2020.EPSIPV.entities.response.UserDetailResponse;
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

@Service
public class AuthService {

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

    public String signIn(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return tokenProvider.generateToken(authentication);
    }

    public User register(String email, String firstName, String lastName, String username, String password, Long roleId) {
        if(authDao.findUserByEmail(email) != null) {
            throw new CustomException(new ApiResponse(false, "Email is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(firstName, lastName, username, email, password, roleId);

        user.setPassword(passwordEncoder.encode(password));
        user.setRoleId((long) 1);

        authDao.saveUserInfo(user);

        return user;
    }

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
