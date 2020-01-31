package com.epsspring2020.EPSIPV.services;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class TodoService {

    public String getHello() {
        return "Hello World!";
    }

    public Map<String, Object> getTest() {
        Map<String, Object> result = new HashMap<>();
        result.put("message", "json returned successfully");
        return result;
    }
}
