package com.epsspring2020.EPSIPV.services;

import com.epsspring2020.EPSIPV.daos.TodoDao;
import com.epsspring2020.EPSIPV.entities.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TodoService {

    private TodoDao todoDao;

    @Autowired
    public TodoService(TodoDao todoDao) {
        this.todoDao = todoDao;
    }

    public String getHello() {
        return "Hello World!";
    }

    public Map<String, Object> getTest() {
        Map<String, Object> result = new HashMap<>();
        result.put("message", "Hello from the backend!");
        return result;
    }

    public List<Todo> getTodos() {
        return todoDao.queryTodos();
    }

    public String insertTodo(Todo todo) {
        todoDao.insertTodo(todo);
        return todo.getTodoId();
    }

    public int updateIsDone(Todo todo) {
        if (todo.getTodoId() == null || todo.getTodoId().isEmpty()) {
            return 1;
        }
        todoDao.updateTodoIsDone(todo);
        return 0;
    }

    public int removeTodo(Todo todo) {
        if (todo.getTodoId() == null) {
            return 1;
        }
        todoDao.removeTodo(todo);
        return 0;
    }
}
