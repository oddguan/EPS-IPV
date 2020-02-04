package com.epsspring2020.EPSIPV.controllers;

import com.epsspring2020.EPSIPV.entities.Todo;
import com.epsspring2020.EPSIPV.entities.UserPrincipal;
import com.epsspring2020.EPSIPV.services.TodoService;
import com.epsspring2020.EPSIPV.utils.annotations.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class TodoController {

    // inject all business logic into the controller layer
    private TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    /**
     * A test route for testing if the backend is working or not
     * @param currentUser User basic information from the JWT token
     * @return A simple string "hello world".
     */
    @GetMapping("/")
    public String getHello(@CurrentUser UserPrincipal currentUser) {
        return this.todoService.getHello();
    }

    /**
     * get all todos using the userId to fetch from the database
     * @param currentUser User basic information from the JWT token
     * @return A list of todos corresponding to the userid provided in the request
     */
    @GetMapping("/todos")
    public ResponseEntity<List<Todo>> getTodos(@CurrentUser UserPrincipal currentUser) {
        List<Todo> result = this.todoService.getTodosByUserId(currentUser.getId());
        return ResponseEntity.status(200).body(result);
    }

    /**
     * Add a single todo item into the database
     * @param currentUser Basic user detail
     * @param todo Details of the new todo listing
     * @return The new todoid
     */
    @PostMapping("/addtodo")
    public ResponseEntity<String> addTodo(@CurrentUser UserPrincipal currentUser, @RequestBody Todo todo) {
        // make sure the current user is only modifying its own todo list
        assert currentUser.getId().equals(todo.getUserId());
        String result = this.todoService.insertTodo(todo);
        return ResponseEntity.status(result != null ? 200 : 400).body(result);
    }

    /**
     * Mark whether a todo item is done or undone
     * @param currentUser Basic user detail
     * @param todo the new todo item
     * @return An integer indicating whether the operation is successful or not
     */
    @PostMapping("/completetodo")
    public ResponseEntity<Integer> updateTodoIsDone(@CurrentUser UserPrincipal currentUser, @RequestBody Todo todo) {
        assert currentUser.getId().equals(todo.getUserId());
        int result = this.todoService.updateIsDone(todo);
        return ResponseEntity.status(result == 0 ? 200 : 400).body(result);
    }

    /**
     * Edit the todo item's description
     * @param currentUser Basic user detail
     * @param todo The new todo item with updated information
     * @return An integer indicating whether the operation is successful or not
     */
    @PostMapping("/edittodo")
    public ResponseEntity<Integer> editDescriptionOfTodo(@CurrentUser UserPrincipal currentUser, @RequestBody Todo todo) {
        assert currentUser.getId().equals(todo.getUserId());
        int result = this.todoService.editDescriptionOfTodo(todo);
        return ResponseEntity.status(result == 0 ? 200 : 400).body(result);
    }

    /**
     * Remove a todo item from a user's todo list
     * @param currentUser Basic user detail
     * @param todo The todo item that one wants to remove
     * @return An integer indicating whether the operation is successful or not
     */
    @PostMapping("/removetodo")
    public ResponseEntity<Integer> postRemoveTodo(@CurrentUser UserPrincipal currentUser, @RequestBody Todo todo) {
        assert currentUser.getId().equals(todo.getUserId());
        int result = this.todoService.removeTodo(todo);
        return ResponseEntity.status(result == 0 ? 200 : 400).body(result);
    }
}
