import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { logout } from '../../../actions/authActions';

/**
 * logout button in the navbar. Call logout action and log user out of the app
 * @param { logout } props
 */
function LoginButton({ logout }) {
  const useStyles = makeStyles(theme => ({
    link: {
      margin: theme.spacing(1, 1.5)
    }
  }));
  const classes = useStyles();
  return (
    <Button
      onClick={logout}
      color='primary'
      variant='outlined'
      className={classes.link}
    >
      Logout
    </Button>
  );
}

export default connect(null, { logout })(LoginButton);
