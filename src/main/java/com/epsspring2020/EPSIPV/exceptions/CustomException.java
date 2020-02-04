package com.epsspring2020.EPSIPV.exceptions;

import org.springframework.http.HttpStatus;

/**
 * A generic class for handling exceptions
 */
public class CustomException extends RuntimeException {
    private Object body;
    private HttpStatus status;

    public CustomException(Object body, HttpStatus status) {
        this.body = body;
        this.status = status;
    }

    public Object getBody() {
        return body;
    }

    public void setBody(Object body) {
        this.body = body;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
