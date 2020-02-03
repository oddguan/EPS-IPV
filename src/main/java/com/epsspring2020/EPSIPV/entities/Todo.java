package com.epsspring2020.EPSIPV.entities;

public class Todo {

    private String todoId;
    private String description;
    private Boolean isDone;
    private Long userId;

    public String getTodoId() { return this.todoId; }

    public void setTodoId(String todoId) { this.todoId = todoId; }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getIsDone() {
        return this.isDone;
    }

    public void setIsDone(Boolean isDone) {
        this.isDone = isDone;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
