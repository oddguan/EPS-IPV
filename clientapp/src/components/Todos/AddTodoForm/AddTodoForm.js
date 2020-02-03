import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { addTodo } from '../../../actions/todoActions';

function AddTodoForm({ addTodo }) {
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

  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      return;
    }
    addTodo(value, false);
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

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { addTodo })(AddTodoForm);
