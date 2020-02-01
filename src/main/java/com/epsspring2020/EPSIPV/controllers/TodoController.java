package com.epsspring2020.EPSIPV.controllers;

import com.epsspring2020.EPSIPV.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/")
public class TodoController {

    private TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/")
    public String getHello() {
        return this.todoService.getHello();
    }

    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> getTest() {
        Map<String, Object> result = this.todoService.getTest();
        return ResponseEntity.status(201).body(result);
    }
}
