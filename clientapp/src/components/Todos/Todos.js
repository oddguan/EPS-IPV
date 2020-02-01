import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import AddTodoForm from './AddTodoForm/AddTodoForm';
import Todo from './Todo/Todo';

function Todos() {
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.default
    }
  }));
  const classes = useStyles();

  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const result = await axios.get('/api/todos');
        setTodos(result.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (description, isDone) => {
    try {
      const result = await axios.post('/api/addtodo', {
        description,
        isDone
      });
      if (!result.data) {
        throw new Error('add todo failed');
      }
      const newTodos = [...todos, { todoId: result.data, description, isDone }];
      setTodos(newTodos);
    } catch (e) {
      console.error(e);
    }
  };

  const completeTodo = async index => {
    try {
      const result = await axios.post('/api/completetodo', {
        todoId: todos[index].todoId,
        isDone: !todos[index].isDone
      });
      if (result.data !== 0) {
        throw new Error('update isDone status failed');
      }
      const newTodos = [...todos];
      newTodos[index].isDone = !todos[index].isDone;
      setTodos(newTodos);
    } catch (e) {
      console.error(e);
    }
  };

  const removeTodo = async index => {
    try {
      const result = await axios.post('/api/removetodo', {
        todoId: todos[index].todoId
      });
      if (result.data !== 0) {
        throw new Error('remove todo failed');
      }
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <AddTodoForm addTodo={addTodo} />
      <List className={classes.root}>
        {todos.map((todo, i) => (
          <Todo
            key={i}
            index={i}
            todo={todo}
            role={undefined}
            dense
            button
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
      </List>
    </>
  );
}

export default Todos;
