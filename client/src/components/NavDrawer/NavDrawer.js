import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NavList from './NavList/NavList';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const NavDrawer = ({ handleDrawerToggle, mobileOpen }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <nav className={classes.drawer} aria-label='mailbox folders'>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation='css'>
        <Drawer
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <NavList handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation='css'>
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant='permanent'
          open
        >
          <NavList />
        </Drawer>
      </Hidden>
    </nav>
  );
};

NavDrawer.propTypes = {
  handleDrawerToggle: PropTypes.func,
  mobileOpen: PropTypes.bool
};

export default NavDrawer;
