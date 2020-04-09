import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '90%',
    border: '1px solid #eee',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  titleField: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    border: '1px solid #ccc',
  },
  titleInput: {
    width: '80%',
    margin: 'auto',
  },
  editor: {
    border: '1px solid #ccc',
    height: 'auto',
  },
}));

/**
 * Customized WYSIWYG component for editting logs,
 * and possibly posting education blogs in the future
 */
const MyEditor = () => {
  const classes = useStyles();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleField}>
        <InputLabel htmlFor='new-log-title'>Title</InputLabel>
        <TextField className={classes.titleInput} id='new-log-title' />
      </div>
      <div className={classes.editor}>
        <Editor
          editorState={editorState}
          wrapperClassName='demo-wrapper'
          editorClassName='demo-editor'
          onEditorStateChange={onEditorStateChange}
        />
      </div>
    </div>
  );
};

export default MyEditor;
