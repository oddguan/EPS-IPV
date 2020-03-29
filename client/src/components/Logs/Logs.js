import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import LogItem from './LogItem/LogItem';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 240px)',
      marginLeft: 240
    }
  },
  toolbar: theme.mixins.toolbar,
  flex: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

const Logs = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>Logs</Typography>
        <Divider />
        <div className={classes.flex}>
          {[true, false, true, true, false, true, false, false].map(
            (isImage, i) => (
              <LogItem key={i} isImage={isImage} />
            )
          )}
        </div>
      </div>
      <Fab color='primary' aria-label='add' className={classes.fab}>
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
};

export default Logs;
