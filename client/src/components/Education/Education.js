import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { push } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import PostItem from './PostItem/PostItem';

import { fetchPosts } from '../../actions/postActions';

const useStyles = makeStyles((theme) => ({
  content: {
    position: 'relative',
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
const Education = ({ isProvider, isFetchingPosts, posts, fetchPosts }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const dispatch = useDispatch();
  const handleFABClick = () => {
    dispatch(push('/education/new'));
  };

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        {isFetchingPosts ? (
          <CircularProgress />
        ) : (
          <div>
            <Typography variant='h5'>Education</Typography>
            <Divider />
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
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
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isProvider: state.auth.user.isProvider,
  isFetchingPosts: state.post.isFetchingPosts,
  posts: state.post.postContents,
});

export default connect(mapStateToProps, { fetchPosts })(Education);
