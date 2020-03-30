import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

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
  article: {
    padding: theme.spacing(2),
    margin: theme.spacing(1)
  }
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
        {['1', '2', '3', '4', '5', '6'].map(key => (
          <Card variant='outlined' key={key} className={classes.article}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Contemplative Reptile'
                height='140'
                image='/static/placeholder-img.jpg'
                title='Contemplative Reptile'
              />
            </CardActionArea>
            <CardContent>
              <Typography variant='h6'>Title {key}</Typography>
              <Typography variant='caption'>Author: John Doe</Typography>
              <Typography paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                officiis est, tenetur modi illum nesciunt porro expedita in iure
                dolor cupiditate ab voluptatum? Laborum labore inventore
                exercitationem nostrum corrupti tenetur.
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant='contained' color='primary'>
                Read More
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Education;
