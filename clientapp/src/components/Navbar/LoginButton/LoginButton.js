import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

function LoginButton() {
  const useStyles = makeStyles(theme => ({
    link: {
      margin: theme.spacing(1, 1.5)
    }
  }));
  const classes = useStyles();
  return (
    <Button
      href='/login'
      color='primary'
      variant='outlined'
      className={classes.link}
    >
      Login
    </Button>
  );
}

export default LoginButton;
