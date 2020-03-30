import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'calc(50% - 20px)',
    height: 200,
    position: 'relative',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      width: 300,
      height: 250
    },
    overflow: 'auto'
  },
  noPadding: {
    padding: 0
  },
  media: {
    height: 100,
    [theme.breakpoints.up('sm')]: {
      height: 140
    }
  }
}));

const LogItem = ({ isImage }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Typography gutterBottom variant='h6' component='h2'>
          Lizard
        </Typography>
        {isImage ? (
          <CardMedia
            className={classes.media}
            image='/static/placeholder-img.jpg'
            title='Contemplative Reptile'
          />
        ) : (
          <CardContent className={classes.noPadding}>
            <Typography variant='body2' color='textSecondary' component='p'>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  );
};

LogItem.propTypes = {
  isImage: PropTypes.bool
};

export default LogItem;
