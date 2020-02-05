import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '../../Checkbox/Checkbox';
import './Todo.css';

import { completeTodo, removeTodo } from '../../../actions/todoActions';

/**
 * The single todo item component
 * @param { todo, index, handleModalOpen, completeTodo, removeTodo } props
 */
function Todo({ todo, index, handleModalOpen, completeTodo, removeTodo }) {
  // material ui styles
  const useStyles = makeStyles(theme => ({
    text: {},
    button: {
      '& > *': {
        marginRight: theme.spacing(3)
      }
    }
  }));
  const classes = useStyles();

  return (
    // Each todo is a list ListItem, single the HOC is a List component
    <ListItem>
      {/* Each todo item has a checkbox indicating whether it is completed */}
      <ListItemIcon>
        <Checkbox
          edge='start'
          checked={todo.isDone}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': todo.id }}
          onClick={() => completeTodo(index)}
        />
      </ListItemIcon>
      {/* The description of the item */}
      {/* Check whether it is complete and add a line-through styling based on the state */}
      <div className={classes.text}>
        <ListItemText
          className={todo.isDone ? 'done' : ''}
          id={todo.id}
          primary={todo.description}
        />
      </div>
      {/* The edit functionality, displayed as a "pen" button */}
      <ListItemSecondaryAction className={classes.button}>
        {/* onClick has the modalOpen action passed in from Todos component */}
        <IconButton onClick={() => handleModalOpen(index)}>
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
      {/* The remove functionality, displayed as a "cross" button */}
      <ListItemSecondaryAction>
        {/* onClick has the removeTodo redux action */}
        <IconButton edge='end' onClick={() => removeTodo(index)}>
          <CancelIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default connect(null, { removeTodo, completeTodo })(Todo);
