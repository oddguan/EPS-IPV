import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

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
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  buttons: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  logStepImage: {
    maxWidth: '200px',
  },
  steps: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  step: {
    margin: theme.spacing(4),
    maxWidth: 300,
  },
}));

/**
 * Main page component of the logs page
 */
const Logs = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // direct user to the log editor as they click the FAB
  const handleFABClick = () => {
    dispatch(push('/logs/new'));
  };

  const handleReadMoreClick = () => {
    dispatch(push('/logs/more'));
  };

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>Logs</Typography>
        <Divider />
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={handleFABClick}
        >
          Start New Log
        </Button>
        <Paper
          style={{
            maxWidth: '1000px',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          <Typography style={{ padding: '10px' }} variant='h5'>
            How Logs Work:
          </Typography>
          <div className={classes.steps}>
            <div className={classes.step}>
              <Typography paragraph>
                <b>Step 1: </b>You write a log: it can be either a text log or
                an image log.
              </Typography>
              <img
                className={classes.logStepImage}
                src='/static/images/LogStep1.jpeg'
                alt='log-step-1'
              />
            </div>
            <div className={classes.step}>
              <Typography paragraph>
                <b>Step 2: </b>You submit the log. We will store all your logs
                encrypted and no one can access them unless they have your
                private key.
              </Typography>
              <img
                className={classes.logStepImage}
                src='/static/images/LogStep2.jpeg'
                alt='log-step-2'
              />
            </div>
            <div className={classes.step}>
              <Typography paragraph>
                <b>Step 3: </b>You go to a shelter with your private key, and
                our help providers will help you print out a full list of all
                logs that you submitted in the past.
              </Typography>
              <img
                className={classes.logStepImage}
                src='/static/images/LogStep3.jpeg'
                alt='log-step-3'
              />
            </div>
          </div>
          <Typography style={{ padding: '20px' }} variant='caption'>
            Note: To request a physical copy of your logs, go to the "Account"
            page and press "REQUEST PHYSICAL COPY OF LOGS" under the "Actions"
            section.
          </Typography>
        </Paper>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={handleReadMoreClick}
        >
          Read More On How Logs Work
        </Button>
      </div>
      <Fab
        color='primary'
        aria-label='add'
        className={classes.fab}
        onClick={handleFABClick}
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
};

export default Logs;
