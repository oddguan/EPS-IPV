import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  inputTextBox: {
    marginRight: 20,
    width: 'calc(100% - 110px)',
  },
  inputButton: {
    position: 'absolute',
    bottom: 10,
    width: 50,
  },
}));

/**
 * The bottom input box for MessageDisplay
 * Has a textfield and a send button
 */
const InputGroup = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        label='Enter message here...'
        variant='outlined'
        size='small'
        multiline
        rows='4'
        className={classes.inputTextBox}
      />
      <Button
        variant='contained'
        color='primary'
        className={classes.inputButton}
      >
        Send
      </Button>
    </div>
  );
};

export default InputGroup;
