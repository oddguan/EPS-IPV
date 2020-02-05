import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { addTodo } from '../../../actions/todoActions';

/**
 * The add todo input field and the "ADD" button, as a form
 * @param { addTodo } props
 */
function AddTodoForm({ addTodo }) {
  // material ui styles
  const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%'
      }
    }
  }));
  const classes = useStyles();

  // A state to keep the current value of the input field
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // if the input field is empty, do not post
    if (!value) {
      return;
    }
    // dispatch the addTodo action:
    // first argument is the description
    // second is the "isDone" status of the todo item: default to false
    addTodo(value, false);
    // clear the value state
    setValue('');
  };

  return (
    <form className={classes.root} display='flex' onSubmit={handleSubmit}>
      <TextField
        id='filled-basic'
        label='New Todo...'
        variant='filled'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <Button variant='contained' color='primary' type='submit'>
        Add
      </Button>
    </form>
  );
}

export default connect(null, { addTodo })(AddTodoForm);
