import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
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
const MyEditor = ({ editorState, setEditorState, title, setTitle }) => {
  const classes = useStyles();

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleField}>
        <InputLabel htmlFor='new-post-title'>Title</InputLabel>
        <TextField
          className={classes.titleInput}
          id='new-post-title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
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

MyEditor.propTypes = {
  editorState: PropTypes.any,
  setEditorState: PropTypes.func,
  title: PropTypes.string,
  setTitle: PropTypes.func,
};

export default MyEditor;
