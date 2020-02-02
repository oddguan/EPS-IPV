package com.epsspring2020.EPSIPV.controllers;

import com.epsspring2020.EPSIPV.entities.Todo;
import com.epsspring2020.EPSIPV.services.TodoService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        return ResponseEntity.status(200).body(result);
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Todo>> getTodos() {
        List<Todo> result = this.todoService.getTodos();
        return ResponseEntity.status(200).body(result);
    }

    @PostMapping("/addtodo")
    public ResponseEntity<String> addTodo(@RequestBody Todo todo) {
        String result = this.todoService.insertTodo(todo);
        return ResponseEntity.status(result != null ? 200 : 400).body(result);
    }

    @PostMapping("/completetodo")
    public ResponseEntity<Integer> updateTodoIsDone(@RequestBody Todo todo) {
        int result = this.todoService.updateIsDone(todo);
        return ResponseEntity.status(result == 0 ? 200 : 400).body(result);
    }

    @PostMapping("/edittodo")
    public ResponseEntity<Integer> editDescriptionOfTodo(@RequestBody Todo todo) {
        int result = this.todoService.editDescriptionOfTodo(todo);
        return ResponseEntity.status(result == 0 ? 200 : 400).body(result);
    }

    @PostMapping("/removetodo")
    public ResponseEntity<Integer> postRemoveTodo(@RequestBody Todo todo) {
        int result = this.todoService.removeTodo(todo);
        return ResponseEntity.status(result == 0 ? 200 : 400).body(result);
    }
}
