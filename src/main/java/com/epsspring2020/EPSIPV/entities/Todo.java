package com.epsspring2020.EPSIPV.entities;

public class Todo {

    private String todoId;
    private String description;
    private boolean isDone;

    public String getTodoId() { return this.todoId; }

    public void setTodoId(String todoId) { this.todoId = todoId; }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean getIsDone() {
        return this.isDone;
    }

    public void setIsDone(boolean isDone) {
        this.isDone = isDone;
    }
}
