import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { downloadEncryptedLogsForVictim } from '../../../actions/logActions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '70%',
    margin: theme.spacing(1),
  },
}));

const Request = ({ username, time }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const handleDownloadClick = () => {
    dispatch(downloadEncryptedLogsForVictim(username));
  };

  return (
    <div className={classes.root}>
      <Paper style={{ flex: '1' }}>
        <Typography variant='body1'>
          Requested From: <br />
          <b>{username}</b>
        </Typography>
        {console.log(time)}
        <Typography variant='body1'>Time: {moment(time).fromNow()}</Typography>
      </Paper>
      <Button variant='contained' color='primary' onClick={handleDownloadClick}>
        Download Encrypted Logs
      </Button>
    </div>
  );
};

export default Request;
