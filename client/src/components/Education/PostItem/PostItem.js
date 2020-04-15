import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  article: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
}));

/**
 * A single post item displayed on the education tab
 */
const PostItem = ({ post }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const handleReadMoreClick = () => {
    dispatch(push(`/education/post/${post.id}`));
  };

  return (
    <Card variant='outlined' className={classes.article}>
      <CardMedia
        component='img'
        alt='Contemplative Reptile'
        height='140'
        image='/static/placeholder-img.jpg'
        title='Contemplative Reptile'
      />
      <CardContent>
        <Typography variant='h6'>{post.title}</Typography>
        <Typography variant='caption'>Author: {post.author}</Typography>
        <br />
        <Typography variant='caption'>
          Posted {moment(post.createdAt).fromNow()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='contained'
          color='primary'
          onClick={handleReadMoreClick}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

PostItem.propTypes = {
  post: PropTypes.object,
};

export default PostItem;
