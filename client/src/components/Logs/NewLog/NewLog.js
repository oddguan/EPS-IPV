import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import MyEditor from '../../MyEditor/MyEditor';

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
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '85%',
  },
  button: {
    width: 150,
  },
}));

/**
 * The new log page component.
 * This is used by user to input their logs
 * by using a wysiwyg react component
 */
const NewLog = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const goBackToLogsPage = () => {
    dispatch(push('/logs'));
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>Add New Log</Typography>
        <Divider />
        <MyEditor
          editorState={editorState}
          setEditorState={setEditorState}
          title={title}
          setTitle={setTitle}
        />
        <div className={classes.buttonsWrapper}>
          <Button
            className={classes.button}
            variant='contained'
            color='secondary'
            onClick={goBackToLogsPage}
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
          >
            Save New Log
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewLog;
