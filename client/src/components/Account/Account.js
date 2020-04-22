import React, { useState } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles';
import { logout } from '../../actions/authActions';

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
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  hover: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  marginOne: {
    margin: theme.spacing(1),
  },
  marginTwo: {
    margin: theme.spacing(2),
  },
  flex: {
    display: 'flex',
  },
  center: {
    display: 'block',
    margin: 'auto',
  },
}));

/**
 * Root component for the account page
 */
const Account = ({
  firstName,
  lastName,
  email,
  phonenumber,
  username,
  isVictim,
  organization,
  logout,
}) => {
  const classes = useStyles();

  const [contactInformationShow, setContactInformationShow] = useState(true);
  const [accountInformationShow, setAccountInformationShow] = useState(true);
  const [actionsShow, setActionsShow] = useState(true);

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>Account</Typography>
        <Divider />
        <Paper className={classes.root}>
          <div>
            <div
              className={`${classes.flexBetween} ${classes.hover} ${classes.marginOne}`}
              onClick={() => setContactInformationShow(!contactInformationShow)}
            >
              <Typography variant='h6'>Contact</Typography>
              {contactInformationShow ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <Divider />
            <Collapse in={contactInformationShow}>
              <div className={classes.flex}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <label htmlFor='personal-firstname'>
                      <Typography variant='caption'>First Name</Typography>
                    </label>
                    <Typography variant='body2'>{firstName}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <label htmlFor='personal-lastname'>
                      <Typography variant='caption'>Last Name</Typography>
                    </label>
                    <Typography variant='body2'>{lastName}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <label htmlFor='personal-email'>
                      <Typography variant='caption'>Email</Typography>
                    </label>
                    <Typography variant='body2'>
                      {email ? email : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <label htmlFor='personal-phonenumber'>
                      <Typography variant='caption'>Phone Number</Typography>
                    </label>
                    <Typography variant='body2'>
                      {phonenumber ? phonenumber : 'N/A'}
                    </Typography>
                  </Grid>
                  {!isVictim && (
                    <Grid item xs={12} md={6}>
                      <label htmlFor='personal-organization'>
                        <Typography variant='caption'>Organization</Typography>
                      </label>
                      <Typography variant='body2'>{organization}</Typography>
                    </Grid>
                  )}
                </Grid>
                <div>
                  <Button color='primary'>Edit</Button>
                </div>
              </div>
            </Collapse>
          </div>
          {/* Account Information */}
          <div>
            <div
              className={`${classes.flexBetween} ${classes.hover} ${classes.marginOne}`}
              onClick={() => setAccountInformationShow(!accountInformationShow)}
            >
              <Typography variant='h6'>Account</Typography>
              {accountInformationShow ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <Divider />
            <Collapse in={accountInformationShow}>
              <div className={classes.flex}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <label htmlFor='account-username'>
                      <Typography variant='caption'>Username</Typography>
                    </label>
                    <Typography variant='body2'>{username}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <label htmlFor='account-type'>
                      <Typography variant='caption'>Account Type</Typography>
                    </label>
                    <Typography variant='body2'>
                      {isVictim ? 'User' : 'Help Provider'}
                    </Typography>
                  </Grid>
                </Grid>
                <div>
                  <Button color='primary'>Edit</Button>
                </div>
              </div>
            </Collapse>
          </div>
          {/* Actions Area */}
          <div>
            <div
              className={`${classes.flexBetween} ${classes.hover} ${classes.marginOne}`}
              onClick={() => setActionsShow(!actionsShow)}
            >
              <Typography variant='h6'>Actions</Typography>
              {actionsShow ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <Divider />
            <Collapse in={actionsShow}>
              <div className={classes.flex}>
                <Grid container spacing={2}>
                  <Grid style={{ marginTop: '20px' }} item xs={12} md={6}>
                    <Button variant='contained' color='primary'>
                      SAR Request
                    </Button>
                  </Grid>
                  <Grid style={{ marginTop: '20px' }} item xs={12} md={6}>
                    <Button variant='contained' color='primary'>
                      Reset Encryption Keys
                    </Button>
                  </Grid>
                </Grid>
                <div>
                  <Button color='primary'>Edit</Button>
                </div>
              </div>
            </Collapse>
          </div>
        </Paper>
        <div className={classes.marginTwo}>
          <Button
            variant='contained'
            color='secondary'
            className={classes.center}
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  firstName: state.auth.user.firstName,
  lastName: state.auth.user.lastName,
  email: state.auth.user.email,
  phonenumber: state.auth.user.phonenumber,
  username: state.auth.user.username,
  isVictim: state.auth.user.isVictim,
  organization: state.auth.user.organization,
});

export default connect(mapStateToProps, { logout })(Account);
