import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';

import LoginButton from './LoginButton/LoginButton';
import LogoutButton from './LogoutButton/LogoutButton';

/**
 *  The navbar component
 * @param { isAuthenticated, gotoHome } props
 */
function Navbar({ isAuthenticated, gotoHome }) {
  // material ui styling
  const useStyles = makeStyles(theme => ({
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    toolbar: {
      flexWrap: 'wrap'
    },
    toolbarTitle: {
      flexGrow: 1
    },
    link: {
      margin: theme.spacing(1, 1.5)
    }
  }));
  const classes = useStyles();

  return (
    <AppBar
      position='static'
      color='default'
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant='h6'
          color='inherit'
          noWrap
          className={classes.toolbarTitle}
        >
          EPS - Todo App
        </Typography>
        <nav>
          {/* A button that directs user to the todo list page */}
          <Link
            variant='button'
            color='textPrimary'
            className={classes.link}
            onClick={gotoHome}
          >
            My Todos
          </Link>
        </nav>
        {/* Check authentication status whether display login or logout button */}
        {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  gotoHome: () => {
    dispatch(push('/'));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);