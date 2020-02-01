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

  const addTodo = description => {
    const newTodos = [...todos, { description, isDone: false }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = !todos[index].isDone;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
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
