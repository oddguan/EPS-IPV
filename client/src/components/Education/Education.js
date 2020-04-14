import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { push } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import PostItem from './PostItem/PostItem';

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
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

/**
 * Education page main component
 */
const Education = ({ isProvider }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const handleFABClick = () => {
    dispatch(push('/education/new'));
  };

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>Education</Typography>
        <Divider />
        {['1', '2', '3', '4', '5', '6'].map((postId) => (
          <PostItem key={postId} postId={postId} title={postId} />
        ))}
      </div>
      {isProvider && (
        <Fab
          color='primary'
          aria-label='add'
          className={classes.fab}
          onClick={handleFABClick}
        >
          <AddIcon />
        </Fab>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isProvider: state.auth.user.isProvider,
});

export default connect(mapStateToProps)(Education);
