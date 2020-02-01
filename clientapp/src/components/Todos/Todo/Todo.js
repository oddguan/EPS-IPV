import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Checkbox from '../../Checkbox/Checkbox';
import './Todo.css';

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <ListItem onClick={() => completeTodo(index)}>
      <ListItemIcon>
        <Checkbox
          edge='start'
          checked={todo.isDone}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': todo.id }}
        />
      </ListItemIcon>
      <ListItemText
        className={todo.isDone ? 'done' : ''}
        id={todo.id}
        primary={todo.description}
      />
      <ListItemSecondaryAction>
        <IconButton edge='end' onClick={() => removeTodo(index)}>
          <CancelIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Todo;
