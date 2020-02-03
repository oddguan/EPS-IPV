import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import AddTodoForm from './AddTodoForm/AddTodoForm';
import Todo from './Todo/Todo';
import EditModal from './EditModal/EditModal';
import { getTodos } from '../../actions/todoActions';

function Todos({ todos, getTodos, isAuthenticated }) {
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.default
    }
  }));
  const classes = useStyles();

  const history = useHistory();

  if (!isAuthenticated) {
    history.push('login');
  }

  // When the whole component mounts, fetch all todos
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const [toBeEditted, setToBeEditted] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <EditModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        toBeEditted={toBeEditted}
        editIndex={editIndex}
        changeToBeEditted={changeToBeEditted}
      />
      <AddTodoForm />
      <List className={classes.root}>
        {todos.map((todo, i) => (
          <Todo
            key={i}
            index={i}
            todo={todo}
            role={undefined}
            dense
            button
            handleModalOpen={handleModalOpen}
          />
        ))}
      </List>
    </Container>
  );
}

const mapStateToProps = state => ({
  todos: state.todo.todos,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getTodos })(Todos);
