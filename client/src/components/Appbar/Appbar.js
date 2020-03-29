import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';

/**
 *  The navbar component
 * @param { isAuthenticated, gotoHome } props
 */
function Appbar({ isAuthenticated, gotoHome, handleDrawerToggle }) {
  // material ui styling
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      [theme.breakpoints.up('sm')]: {
        width: isAuthenticated ? 'calc(100% - 240px)' : '100%',
        marginLeft: isAuthenticated ? 240 : 0
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
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
    <AppBar position='fixed' className={classes.root}>
      <Toolbar>
        {isAuthenticated && (
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant='h6'
          color='inherit'
          noWrap
          className={classes.title}
        >
          <Link onClick={gotoHome} color='inherit' className={classes.pointer}>
            EPS - IPV
          </Link>
        </Typography>
        {/* {isAuthenticated && <ProfileButton />} */}
      </Toolbar>
    </AppBar>
  );
}

Appbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  gotoHome: PropTypes.func,
  handleDrawerToggle: PropTypes.func
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  gotoHome: () => {
    dispatch(push('/'));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Appbar);
