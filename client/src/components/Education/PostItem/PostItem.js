import React from 'react';
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

const useStyles = makeStyles(theme => ({
  article: {
    padding: theme.spacing(2),
    margin: theme.spacing(1)
  }
}));

const PostItem = ({ postId, title }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const handleReadMoreClick = (event) => {
    dispatch(push(`/education/${postId}`));
  }

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
        <Typography variant='h6'>Title {title}</Typography>
        <Typography variant='caption'>Author: John Doe</Typography>
        <Typography paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
          officiis est, tenetur modi illum nesciunt porro expedita in iure dolor
          cupiditate ab voluptatum? Laborum labore inventore exercitationem
          nostrum corrupti tenetur.
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' color='primary' onClick={handleReadMoreClick}>
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

PostItem.propTypes = {
  postId: PropTypes.string,
  title: PropTypes.string
}

export default PostItem;
