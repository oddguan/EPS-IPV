package com.epsspring2020.EPSIPV.daos;

import com.epsspring2020.EPSIPV.entities.Todo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TodoDao {

    public List<Todo> queryTodosByUserId(Long id);

    public int insertTodo(Todo todo);

    public int updateTodoIsDone(Todo todo);

    public int editDescriptionOfTodo(Todo todo);

    public int removeTodo(Todo todo);
}
