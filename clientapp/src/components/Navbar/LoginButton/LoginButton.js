import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

/**
 * The login button in the nav bar
 */
function LoginButton() {
  const useStyles = makeStyles(theme => ({
    link: {
      margin: theme.spacing(1, 1.5)
    }
  }));
  const classes = useStyles();
  return (
    <Button color='primary' variant='outlined' className={classes.link}>
      <Link to={'/login'}>Login</Link>
    </Button>
  );
}

export default LoginButton;
