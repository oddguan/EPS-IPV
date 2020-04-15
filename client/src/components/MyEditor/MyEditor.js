import React, { useState } from 'react';
import axios from 'axios';
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

  const [uploadedImages, setUploadedImages] = useState([]);
  const uploadCallback = (file) => {
    const form = new FormData();
    form.append('file', file);
    return axios
      .put(`/api/image/${file.name}/`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        const newUploadedImages = [...uploadedImages, res.data.link];
        setUploadedImages(newUploadedImages);
        return {
          data: {
            link: res.data.link,
          },
        };
      });
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
          toolbar={{
            image: {
              uploadCallback,
              previewImage: true,
              alt: { present: true, mandatory: false },
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            },
          }}
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
