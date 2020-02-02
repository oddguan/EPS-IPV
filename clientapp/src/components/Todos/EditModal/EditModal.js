import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditModal({
  isModalOpen,
  handleModalClose,
  toBeEditted,
  changeToBeEditted,
  editTodo,
  editIndex
}) {
  const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    buttonGroup: {
      margin: theme.spacing(1)
    }
  }));
  const classes = useStyles();

  const notify = () => toast.success('Todo editted successfully');

  const handleEdit = () => {
    editTodo(editIndex, toBeEditted);
    notify();
    handleModalClose();
  };
  return (
    <div>
      <ToastContainer position='top-center' />
      <Modal
        className={classes.modal}
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby='edit-modal-title'
        aria-describedby='edit-modal-description'
      >
        <Card>
          <CardContent>
            <TextField
              className={classes.paper}
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
      </Modal>
    </div>
  );
}

export default EditModal;
