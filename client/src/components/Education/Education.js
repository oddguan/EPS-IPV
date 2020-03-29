import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
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
  toolbar: theme.mixins.toolbar
}));

const Education = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
          officiis est, tenetur modi illum nesciunt porro expedita in iure dolor
          cupiditate ab voluptatum? Laborum labore inventore exercitationem
          nostrum corrupti tenetur.
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default Education;