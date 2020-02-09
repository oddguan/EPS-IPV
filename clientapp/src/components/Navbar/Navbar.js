import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';

import ProfileButton from './ProfileButton/ProfileButton';

/**
 *  The navbar component
 * @param { isAuthenticated, gotoHome } props
 */
function Navbar({ isAuthenticated, gotoHome }) {
  // material ui styling
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    pointer: {
      cursor: 'pointer'
    }
  }));
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant='h6'
          color='inherit'
          noWrap
          className={classes.title}
        >
          <Link onClick={gotoHome} color='inherit' className={classes.pointer}>
            EPS - Todo App
          </Link>
        </Typography>
        {isAuthenticated && <ProfileButton />}
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
