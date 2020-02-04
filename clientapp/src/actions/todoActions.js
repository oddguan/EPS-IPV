import axios from 'axios';
import {
  GET_TODOS,
  ADD_TODO,
  COMPLETE_TODO,
  EDIT_TODO,
  REMOVE_TODO,
  TODO_FAIL
} from './types';
import { returnErrors } from './errorActions';
import { authTokenConfig } from './authActions';

export const getTodos = () => (dispatch, getState) => {
  getState().auth.isAuthenticated &&
    axios
      .get('/api/todos', authTokenConfig(getState))
      .then(res => {
        dispatch({
          type: GET_TODOS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'GET_TODO_FAIL')
        );
        dispatch({
          type: TODO_FAIL
        });
      });
};

export const addTodo = (description, isDone) => (dispatch, getState) => {
  const config = authTokenConfig(getState);
  const body = { description, isDone, userId: getState().auth.user.id };
  axios
    .post('/api/addtodo', body, config)
    .then(res => {
      const newTodos = [
        ...getState().todo.todos,
        { todoId: res.data, description, isDone }
      ];
      dispatch({
        type: ADD_TODO,
        payload: newTodos
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'ADD_TODO_FAIL')
      );
      dispatch({
        type: TODO_FAIL
      });
    });
};

export const completeTodo = index => (dispatch, getState) => {
  const config = authTokenConfig(getState);
  axios
    .post(
      '/api/completetodo',
      {
        todoId: getState().todo.todos[index].todoId,
        isDone: !getState().todo.todos[index].isDone
      },
      config
    )
    .then(res => {
      const newTodos = [...getState().todo.todos];
      newTodos[index].isDone = !newTodos[index].isDone;
      dispatch({
        type: COMPLETE_TODO,
        payload: newTodos
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'ADD_TODO_FAIL')
      );
      dispatch({
        type: TODO_FAIL
      });
    });
};

export const removeTodo = index => (dispatch, getState) => {
  const config = authTokenConfig(getState);
  axios
    .post(
      '/api/removetodo',
      {
        todoId: getState().todo.todos[index].todoId
      },
      config
    )
    .then(res => {
      const newTodos = [...getState().todo.todos];
      newTodos.splice(index, 1);
      dispatch({
        type: REMOVE_TODO,
        payload: newTodos
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REMOVE_TODO_FAIL')
      );
      dispatch({
        type: TODO_FAIL
      });
    });
};

export const editTodo = (index, newDescription) => (dispatch, getState) => {
  const config = authTokenConfig(getState);
  axios
    .post(
      '/api/edittodo',
      {
        todoId: getState().todo.todos[index].todoId,
        description: newDescription
      },
      config
    )
    .then(res => {
      const newTodos = [...getState().todo.todos];
      newTodos[index].description = newDescription;
      dispatch({
        type: EDIT_TODO,
        payload: newTodos
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'EDIT_TODO_FAIL')
      );
      dispatch({
        type: TODO_FAIL
      });
    });
};
