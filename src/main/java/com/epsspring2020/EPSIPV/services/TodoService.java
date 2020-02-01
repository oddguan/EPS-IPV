package com.epsspring2020.EPSIPV.services;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TodoService {

    public String getHello() {
        return "Hello World!";
    }

    public Map<String, Object> getTest() {
        Map<String, Object> result = new HashMap<>();
        result.put("message", "Hello from the backend!");
        return result;
    }

    public List<Map<String, Object>> getTodos() {
        List<Map<String, Object>> result = new ArrayList<>(2);
        Map<String, Object> todo1 = new HashMap<>();
        todo1.put("description", "wash dishes");
        todo1.put("isDone", false);
        result.add(todo1);
        Map<String, Object> todo2 = new HashMap<>();
        todo2.put("description", "finish homework");
        todo2.put("isDone", true);
        result.add(todo2);
        return result;
    }
}
