package com.epsspring2020.EPSIPV.daos;

import com.epsspring2020.EPSIPV.entities.Todo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TodoDao {

    public List<Todo> queryTodos();
}
