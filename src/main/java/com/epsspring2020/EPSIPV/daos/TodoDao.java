package com.epsspring2020.EPSIPV.daos;

import com.epsspring2020.EPSIPV.entities.Todo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TodoDao {

    /**
     * fetch all todos from a userid provided
     * @param id the userid
     * @return a list of todos for that userid
     */
    public List<Todo> queryTodosByUserId(Long id);

    /**
     * insert a todo item into the database
     * @param todo The new todo item
     * @return An integer indicating whether the operation is successful or not
     */
    public int insertTodo(Todo todo);

    /**
     * Update the todo item's isDone attribute
     * @param todo The new todo item with new isDone status
     * @return An integer indicating whether the operation is successful or not
     */
    public int updateTodoIsDone(Todo todo);

    /**
     * Edit the new todo item's description
     * @param todo The new todo item with new descriptions
     * @return An integer indicating whether the operation is successful or not
     */
    public int editDescriptionOfTodo(Todo todo);

    /**
     * Remove a todo item from the todo list of a user
     * @param todo The todo item that one wants to remove
     * @return An integer indicating whether the operation is successful or not
     */
    public int removeTodo(Todo todo);
}
