import React, { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';

import { register } from '../../../actions/authActions';
import Copyright from '../../Copyright/Copyright';
import isValidEmail from '../../../utils/isValidEmail';

/**
 * root component of the registration page
 * @param {*} props
 */
function Register(props) {
  // material ui styling
  const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));
  const classes = useStyles();

  // initial state of the component
  // everything is set to empty initially until user input something
  const initialState = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    msg: null
  };

  // store state into the "data" variable
  const [data, setData] = useState(initialState);

  // record input changes and save them to state
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  // check input validities before actually submit the post registration request to the backend
  const areInputsValid = () => {
    const { firstName, lastName, username, email, password } = data;
    if (!firstName || !lastName || !username || !email || !password) {
      toast.error('You must fill out all required fields!');
      return false;
    }
    if (firstName.length > 40 || lastName.length > 40) {
      toast.error('First name or last name is too long');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password has a minimum size of 6');
      return false;
    }
    if (!isValidEmail(email)) {
      toast.error('Email format is invalid!');
      return false;
    }
    return true;
  };

  // post submission on-submit method
  const handleSubmit = event => {
    event.preventDefault();
    // register action will redirect user to home page if registered successfully
    areInputsValid() && props.register(data);
  };

  return (
    <Container component='main' maxWidth='xs'>
      {/* Notification wrapper component */}
      <ToastContainer position='top-center' />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {/* Input fields are managed by a grid system */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='username'
                label='username'
                name='username'
                autoComplete='username'
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link color='inherit'>
                <RouteLink style={{ textDecoration: 'none' }} to={'/login'}>
                  {'Already have an account? Sign in'}
                </RouteLink>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

// map redux state to props
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register })(Register);
