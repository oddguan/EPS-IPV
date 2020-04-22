import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core/styles';

import { uploadNewLog } from '../../../actions/logActions';

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
    width: '65%',
  },
  button: {
    width: 150,
  },
  logTypes: {
    margin: theme.spacing(2),
  },
  main: {
    width: '70%',
    marginBottom: theme.spacing(2),
  },
  input: {
    display: 'none',
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

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSelectText, setIsSelectText] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setImagePreview([reader.result]);
    };

    setIsImageUploaded(true);
    setSelectedFile(file);
  };

  const handleLogSubmit = () => {
    dispatch(uploadNewLog(isSelectText, { title, content, selectedFile }));
    dispatch(push('/logs'));
  };

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>Add New Log</Typography>
        <Divider />
        <TextField
          label='Log Title'
          style={{ width: '70%' }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div />
        <div className={classes.logTypes}>
          <Typography variant='h6'>Log Type:</Typography>
          <ButtonGroup
            color='primary'
            aria-label='outlined primary button group'
          >
            <Button
              disabled={isSelectText}
              onClick={() => setIsSelectText(true)}
            >
              Text
            </Button>
            <Button
              disabled={!isSelectText}
              onClick={() => setIsSelectText(false)}
            >
              Image
            </Button>
          </ButtonGroup>
        </div>
        <div className={classes.main}>
          {isSelectText ? (
            <TextField
              variant='outlined'
              style={{ width: '100%' }}
              multiline
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div style={{ marginLeft: '10px' }}>
              <input
                accept='image/*'
                className={classes.input}
                id='log-image-file'
                type='file'
                onChange={handleUploadClick}
              />
              <Typography variant='h6'>Select the image to upload:</Typography>
              <label htmlFor='log-image-file'>
                <Fab component='span'>
                  <AddPhotoAlternateIcon />
                </Fab>
              </label>
              {isImageUploaded && (
                <div style={{ margin: '20px' }}>
                  <img
                    style={{ maxWidth: '400px' }}
                    src={imagePreview}
                    alt='selected-file'
                  />
                  {selectedFile.name}
                </div>
              )}
            </div>
          )}
        </div>
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
            onClick={handleLogSubmit}
          >
            Save New Log
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewLog;
