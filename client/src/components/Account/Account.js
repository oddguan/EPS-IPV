import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
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

import DialogBox from './DialogBox/DialogBox';
import {
  logout,
  resetPrivateKeyAndDeleteAllLogs,
} from '../../actions/authActions';
import {
  clearSuccessMessage,
  reuturnSuccessMessage,
} from '../../actions/successActions';
import { makeRetrieveLogRequest } from '../../actions/logActions';

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
  success,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [contactInformationShow, setContactInformationShow] = useState(true);
  const [accountInformationShow, setAccountInformationShow] = useState(true);
  const [actionsShow, setActionsShow] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    if (success.msg) {
      console.log(success.msg);
      toast.success(success.msg);
      dispatch(clearSuccessMessage());
    }
  }, [success, dispatch]);

  const handleSARClick = () => {
    setIsDialogOpen(true);
    setDialogTitle('SAR Request');
    setDialogContent(
      'Do you want to submit a SAR Request? We will generate a complete document of your information stored in our database for you to download. This might take a while to process.'
    );
    setButtons([
      {
        onClick: () => setIsDialogOpen(false),
        content: 'What is SAR Request?',
      },
      {
        onClick: () => setIsDialogOpen(false),
        content: 'Yes',
      },
    ]);
  };

  const handleResetKeyClick = () => {
    setIsDialogOpen(true);
    setDialogTitle('Warning!');
    setDialogContent(
      'By reseting your encryption key, you will lose every log that you have submitted before. Are you sure you want to reset your encryption keys?'
    );
    setButtons([
      {
        onClick: () => setIsDialogOpen(false),
        content: 'Cancel',
      },
      {
        onClick: () => {
          dispatch(resetPrivateKeyAndDeleteAllLogs());
          setIsDialogOpen(false);
        },
        content: 'I understand and download my private key',
      },
    ]);
  };

  const handleRequestCopyClick = () => {
    setIsDialogOpen(true);
    setDialogTitle('Request a copy of your logs');
    setDialogContent(
      'Do you want to submit a request for physically printing your logs at one of the shelter locations?'
    );
    const handleYesClick = () => {
      dispatch(makeRetrieveLogRequest());
      dispatch(
        reuturnSuccessMessage(
          'Your action was successful! Shelter workers should see a request from you now. '
        )
      );
      setIsDialogOpen(false);
    };
    setButtons([
      {
        onClick: () => setIsDialogOpen(false),
        content: 'Learn More',
      },
      {
        onClick: handleYesClick,
        content: 'Yes',
      },
    ]);
  };

  return (
    <React.Fragment>
      <ToastContainer position='top-center' />
      <DialogBox
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        title={dialogTitle}
        content={dialogContent}
        buttons={buttons}
      />
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
            <Divider style={{ marginBottom: '20px' }} />
            <Collapse in={actionsShow}>
              <div className={classes.flex}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleSARClick}
                    >
                      Subject Access Request
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleResetKeyClick}
                    >
                      Reset Encryption Keys
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleRequestCopyClick}
                    >
                      Request Physical Copy of Logs
                    </Button>
                  </Grid>
                </Grid>
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
  success: state.success,
});

export default connect(mapStateToProps, { logout })(Account);
