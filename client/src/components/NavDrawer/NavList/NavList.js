import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CreateIcon from '@material-ui/icons/Create';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ArchiveIcon from '@material-ui/icons/Archive';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  dangerButton: {
    margin: theme.spacing(2),
  },
  bottom: {
    position: 'fixed',
    bottom: theme.spacing(1),
    width: '240px',
  },
  footer: {
    fontSize: '0.1em',
  },
  bottomButton: {
    flex: '1 1 0px',
  },
}));

/**
 * A red button mainly used for SOS
 */
const DangerButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);

/**
 * List of navigation buttons
 */
const NavList = ({ handleDrawerToggle, isVictim, isProvider }) => {
  const classes = useStyles();
  // Default select education tab
  const arr = window.location.href.split('/');
  const [selectedRoute, setSelectedRoute] = React.useState(arr[arr.length - 1]);
  const dispatch = useDispatch();
  const handleListItemClick = (event, route) => {
    setSelectedRoute(route);
    handleDrawerToggle && handleDrawerToggle();
    // Redirect user to the specific tab
    return dispatch(push(`/${route}`));
  };

  const toPrivacyPolicyPage = () => {
    setSelectedRoute('');
    dispatch(push('/privacy'));
  };

  return (
    <div>
      <div className={classes.toolbar}>
        <DangerButton
          className={classes.dangerButton}
          variant='contained'
          color='primary'
        >
          SOS
        </DangerButton>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          key='Education'
          selected={selectedRoute === 'education'}
          onClick={(event) => handleListItemClick(event, 'education')}
        >
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary='Education' />
        </ListItem>
        {isVictim && (
          <ListItem
            button
            key='Logs'
            selected={selectedRoute === 'logs'}
            onClick={(event) => handleListItemClick(event, 'logs')}
          >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary='Logs' />
          </ListItem>
        )}
        <ListItem
          button
          key='Messages'
          selected={selectedRoute === 'messages'}
          onClick={(event) => handleListItemClick(event, 'messages')}
        >
          <ListItemIcon>
            <QuestionAnswerIcon />
          </ListItemIcon>
          <ListItemText primary='Messages' />
        </ListItem>
        <ListItem
          button
          key='Resources'
          selected={selectedRoute === 'resources'}
          onClick={(event) => handleListItemClick(event, 'resources')}
        >
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText primary='Resources' />
        </ListItem>
      </List>
      <div className={classes.bottom}>
        {isProvider && (
          <>
            <Divider />
            <List>
              <ListItem
                button
                key='Retrieve Logs'
                selected={selectedRoute === 'retrieve-logs'}
                onClick={(event) => handleListItemClick(event, 'retrieve-logs')}
              >
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText primary='Retrieve Logs' />
              </ListItem>
            </List>
          </>
        )}
        <Divider />
        <List>
          <ListItem
            button
            key='Account'
            selected={selectedRoute === 'account'}
            onClick={(event) => handleListItemClick(event, 'account')}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary='Account' />
          </ListItem>
        </List>
        <Divider />
        <div style={{ display: 'flex' }}>
          <Button
            className={classes.bottomButton}
            onClick={toPrivacyPolicyPage}
          >
            <Typography variant='button'>Privacy Policy</Typography>
          </Button>
          <Button className={classes.bottomButton}>
            <Typography variant='button'>Cookies</Typography>
          </Button>
          <Button className={classes.bottomButton}>
            <Typography variant='button'>Help</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

NavList.propTypes = {
  handleDrawerToggle: PropTypes.func,
  isVictim: PropTypes.bool,
  isProvider: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isVictim: state.auth.user.isVictim,
  isProvider: state.auth.user.isProvider,
});

export default connect(mapStateToProps)(NavList);
