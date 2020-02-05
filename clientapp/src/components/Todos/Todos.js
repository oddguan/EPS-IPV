import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import AddTodoForm from './AddTodoForm/AddTodoForm';
import Todo from './Todo/Todo';
import EditModal from './EditModal/EditModal';
import { getTodos } from '../../actions/todoActions';

/**
 * The root component of the todo list app.
 * @param { todos, getTodos } props
 */
function Todos({ todos, getTodos }) {
  // material ui styles
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.default
    }
  }));
  const classes = useStyles();

  // When the whole component mounts, fetch all todos by dipatching the getTodos redux action
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  // Three state variables used for editting todo item
  // These three are used to toggle the edit modal
  const [toBeEditted, setToBeEditted] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // when modal opens, set the edit text and edit index
  const handleModalOpen = index => {
    setToBeEditted(todos[index].description);
    setEditIndex(index);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const changeToBeEditted = e => {
    setToBeEditted(e.target.value);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      {/* The edit modal component, has all related functions and states passed down as props */}
      <EditModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        toBeEditted={toBeEditted}
        editIndex={editIndex}
        changeToBeEditted={changeToBeEditted}
      />
      {/* The input field and the "ADD" button */}
      <AddTodoForm />
      {/* Mapping each todo item fetched from backend into Todo components  */}
      <List className={classes.root}>
        {todos.map((todo, i) => (
          <Todo
            key={i}
            index={i}
            todo={todo}
            role={undefined}
            dense
            button
            // it needs the handleModalOpen prop because the edit button is in the todo component
            handleModalOpen={handleModalOpen}
          />
        ))}
      </List>
    </Container>
  );
}

// mapping the todos state from redux into props
const mapStateToProps = state => ({
  todos: state.todo.todos
});

export default connect(mapStateToProps, { getTodos })(Todos);
