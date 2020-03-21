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
import { authTokenConfig } from './authActions'; // auth token needs to be set in order to fetch anything

/**
 * fetch all todos from the backend by providing a user-id
 */
export const getTodos = () => (dispatch, getState) => {
  // submit a get request to '/api/todos'
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

/**
 * add a single todo item to a user's todo list
 * @param {*} description the description of the new todo item
 * @param {*} isDone whether the todo item is done, which is usually "false" for new todo item
 */
export const addTodo = (description, isDone) => (dispatch, getState) => {
  // generate the config and body of the request
  const config = authTokenConfig(getState);
  const body = { description, isDone, userId: getState().auth.user.id };
  // submit a post request to '/api/addtodo'
  axios
    .post('/api/addtodo', body, config)
    .then(res => {
      // newTodos is the old todos plus the newly generated todo
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

/**
 * update the status of a specific todo item whether it is completed or incompleted
 * @param {*} index need to know which todo item it is referring to
 */
export const completeTodo = index => (dispatch, getState) => {
  const config = authTokenConfig(getState);
  // submit a post request to '/api/completetodo'
  axios
    .post(
      '/api/completetodo',
      {
        todoId: getState().todo.todos[index].todoId,
        // isDone is the opposite of the current isDone
        isDone: !getState().todo.todos[index].isDone
      },
      config
    )
    .then(() => {
      const newTodos = [...getState().todo.todos];
      // the newTodos is the old todos but the isDone status of a todo is changed to the opposite
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

/**
 * remove a specific todo item from the todos list
 * @param {*} index need to know which todo item this action is referring to
 */
export const removeTodo = index => (dispatch, getState) => {
  const config = authTokenConfig(getState);
  // submit a post request to '/api/removetodo'
  axios
    .post(
      '/api/removetodo',
      // the backend needs to know which todo is needed to be removed, therefore submitting the todoId
      {
        todoId: getState().todo.todos[index].todoId
      },
      config
    )
    .then(() => {
      const newTodos = [...getState().todo.todos];
      // the newTodos is the old todos with a specific element indicated by the index removed
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

/**
 * edit the description of a specific todo item
 * @param {*} index needs to know which todo it is referring to
 * @param {*} newDescription the new description of the todo item
 */
export const editTodo = (index, newDescription) => (dispatch, getState) => {
  const config = authTokenConfig(getState);
  // submit a post request to '/api/edittodo'
  axios
    .post(
      '/api/edittodo',
      {
        todoId: getState().todo.todos[index].todoId,
        description: newDescription
      },
      config
    )
    .then(() => {
      const newTodos = [...getState().todo.todos];
      // update the description from the todo list on the client side
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
