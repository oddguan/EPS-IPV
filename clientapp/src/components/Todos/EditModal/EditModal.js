import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { editTodo } from '../../../actions/todoActions';
import { Fade, Typography } from '@material-ui/core';

/**
 * The edit modal for editting todo descriptions
 * @param {
 * isModalOpen,
 * handleModalClose,
 * toBeEditted,
 * changeToBeEditted,
 * editIndex,
 * editTodo } props
 */
function EditModal({
  isModalOpen,
  handleModalClose,
  toBeEditted,
  changeToBeEditted,
  editIndex,
  editTodo
}) {
  // material ui styling
  const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    card: {
      width: '400px'
    },
    title: {
      marginBottom: theme.spacing(2)
    },
    buttonGroup: {
      margin: theme.spacing(1)
    }
  }));
  const classes = useStyles();

  // a onClick to notify user when todo was successfully editted
  const notify = () => toast.success('Todo editted successfully');

  // When user clicks edit, dispatch the editTodo redux action and notify user
  // that the action was successful
  const handleEdit = () => {
    editTodo(editIndex, toBeEditted);
    notify();
    handleModalClose(); // close the modal after edit was successful
  };
  return (
    <div>
      {/* Notification wrapper */}
      <ToastContainer position='top-center' />
      <Modal
        className={classes.modal}
        open={isModalOpen}
        onClose={handleModalClose}
        aria-describedby='edit-modal-description'
      >
        <Fade in={isModalOpen}>
          {/* Modal is displayed as a Card component */}
          <Card className={classes.card}>
            <CardContent>
              <Typography
                color='textSecondary'
                className={classes.title}
                variant='h5'
                component='h2'
              >
                Edit description
              </Typography>
              <TextField
                fullWidth
                id='edit-modal-description'
                value={toBeEditted}
                onChange={changeToBeEditted}
              />
            </CardContent>
            <CardActions className={classes.buttonGroup}>
              <Button variant='contained' color='primary' onClick={handleEdit}>
                Edit
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={handleModalClose}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}

export default connect(null, { editTodo })(EditModal);
