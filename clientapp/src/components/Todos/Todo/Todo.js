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

function Todo({ todo, index, handleModalOpen, completeTodo, removeTodo }) {
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
    <ListItem>
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
      <div className={classes.text}>
        <ListItemText
          className={todo.isDone ? 'done' : ''}
          id={todo.id}
          primary={todo.description}
        />
      </div>
      <ListItemSecondaryAction className={classes.button}>
        <IconButton onClick={() => handleModalOpen(index)}>
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
      <ListItemSecondaryAction>
        <IconButton edge='end' onClick={() => removeTodo(index)}>
          <CancelIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { removeTodo, completeTodo })(Todo);
