import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import { fetchSinglePost } from '../../../actions/postActions';
import transformIntoAvatarText from '../../../utils/transformIntoAvatarText';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: 'calc(75% - 240px)',
      marginLeft: 240,
    },
  },
  toolbar: theme.mixins.toolbar,
  center: {
    textAlign: 'center',
  },
  authorInfo: {
    display: 'flex',
    margin: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2),
    },
  },
  authorInfoLeft: {
    top: 3,
  },
  authorInfoRight: {
    marginLeft: theme.spacing(1),
  },
  postImage: {
    display: 'block',
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      maxWidth: '50em',
      maxHeight: '50em',
    },
  },
}));

/**
 * The main page of the readmore post detail.
 * Routed using query parameters.
 * Should put the postId as a query parameter to make this functional.
 */
const Post = ({ post, isFetchingSinglePost, fetchSinglePost }) => {
  // Get the postId by accessing query parameters
  const classes = useStyles();
  const { postId } = useParams();

  useEffect(() => {
    fetchSinglePost(postId);
  }, [fetchSinglePost, postId]);

  const convertFromJSONToHTML = (text) => {
    if (!text) {
      return '';
    }
    return stateToHTML(convertFromRaw(JSON.parse(text)));
  };

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        {isFetchingSinglePost ? (
          <CircularProgress className={classes.circularProgress} />
        ) : (
          <div>
            <Typography variant='h4' className={classes.center}>
              {post.title}
            </Typography>
            <div className={classes.authorInfo}>
              <Avatar className={classes.authorInfoLeft}>
                {transformIntoAvatarText(post.author)}
              </Avatar>
              <div className={classes.authorInfoRight}>
                <Typography variant='button' className={classes.authorInfoName}>
                  {post.author}
                </Typography>
                <br />
                <Typography variant='button' className={classes.authorInfoDate}>
                  {moment(post.createdAt).format('MMMM Do YYYY')}
                </Typography>
              </div>
            </div>
            <Divider />
            <div
              dangerouslySetInnerHTML={{
                __html: convertFromJSONToHTML(post.content),
              }}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.post.post,
  isFetchingSinglePost: state.post.isFetchingSinglePost,
});

export default connect(mapStateToProps, { fetchSinglePost })(Post);
