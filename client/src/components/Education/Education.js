import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import PostItem from './PostItem/PostItem';

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
}));

const Education = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>Education</Typography>
        <Divider />
        {['1', '2', '3', '4', '5', '6'].map(postId => (
          <PostItem key={postId} postId={postId} title={postId} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Education;
