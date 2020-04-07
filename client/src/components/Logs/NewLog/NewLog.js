import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import MyEditor from './MyEditor/MyEditor';

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
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '85%',
  },
  button: {
    width: 150,
  },
}));

const Logs = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const goBackToLogsPage = () => {
    dispatch(push('/logs'));
  };

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>Add New Log</Typography>
        <Divider />
        <MyEditor />
        <div className={classes.buttonsWrapper}>
          <Button
            className={classes.button}
            variant='contained'
            color='secondary'
            onClick={goBackToLogsPage}
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
          >
            Save New Log
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Logs;
