import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import LogItem from './LogItem/LogItem';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

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

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>Logs</Typography>
        <Divider />
        <div className={classes.flex}>
          {/* Some hard-coded true false value indicating whether the log is image or note */}
          {[true, false, true, true, false, true, false, false].map(
            (isImage, i) => (
              <LogItem key={i} isImage={isImage} />
            )
          )}
        </div>
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
