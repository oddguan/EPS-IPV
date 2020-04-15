import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { connect, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import MyEditor from '../../MyEditor/MyEditor';

import { addNewPost } from '../../../actions/postActions';
import { returnErrors, clearErrors } from '../../../actions/errorActions';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 240px)',
      marginLeft: 240,
    },
  },
  toolbar: theme.mixins.toolbar,
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  submitButton: {
    display: 'block',
    margin: 'auto',
  },
  buttonProgress: {
    position: 'absolute',
    top: '55%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
}));

const NewPost = ({
  isAddingPost,
  addNewPost,
  error,
  returnErrors,
  clearErrors,
}) => {
  const classes = useStyles();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    if (error.msg) {
      toast.error(error.msg);
      dispatch(clearErrors());
    }
  }, [error, clearErrors, dispatch]);

  const areInputsValid = (content) => {
    if (!title) {
      returnErrors('Title field cannot be empty!', 401, 'ADD_NEW_POST_FAIL');
      return false;
    }
    if (!content) {
      returnErrors('Content cannot be empty!', 401, 'ADD_NEW_POST_FAIL');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    if (!areInputsValid(content)) {
      return;
    }
    addNewPost(title, content);
  };

  return (
    <React.Fragment>
      <ToastContainer position='top-center' />
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>New Educational Post</Typography>
        <Divider />
        <MyEditor
          editorState={editorState}
          setEditorState={setEditorState}
          title={title}
          setTitle={setTitle}
        />
        <div className={classes.wrapper}>
          <Button
            variant='contained'
            color='primary'
            className={classes.submitButton}
            disabled={isAddingPost}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {isAddingPost && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAddingPost: state.post.isAddingPost,
  error: state.error,
});

export default connect(mapStateToProps, {
  addNewPost,
  returnErrors,
  clearErrors,
})(NewPost);
