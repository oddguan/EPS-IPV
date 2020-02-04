package com.epsspring2020.EPSIPV.entities.requests;

import javax.validation.constraints.NotBlank;

/**
 * The request from the login page, which includes email and password
 */
public class LoginRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}