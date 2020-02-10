import React, { useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Link as RouteLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import isValidEmail from '../../../utils/isValidEmail';
import Copyright from '../../Copyright/Copyright';
import { login } from '../../../actions/authActions';
import { Link } from '@material-ui/core';

/**
 * Login component is the root component of the login page.
 * @param {*} props
 */
function Login(props) {
  // stying definitions (material-ui)
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
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12
    }
  }));
  const initialState = {
    email: '',
    password: '',
    isSubmitting: false
  };

  // the root state of the component
  const [data, setData] = useState(initialState);
  const handleInputChange = event => {
    // update state based on input changes
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  // valid inputs and push error messages to user
  // returns a boolean indicating whether input validation was successful
  const areInputsValid = () => {
    const { email, password } = data;
    if (!email || !password) {
      toast.error('You must fill out all required fields!');
      return false;
    }
    if (!isValidEmail(email)) {
      toast.error('Email format is invalid!');
      return false;
    }
    return true;
  };

  // when submit button was clicked, check input validities and
  // post the login request
  const handleFormSubmit = event => {
    event.preventDefault();
    areInputsValid() && props.login(data);
    props.push('/');
  };

  // use styles defined above
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      {/* Notification modal component  */}
      <ToastContainer position='top-center' />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={handleInputChange}
          />
          <div className={classes.wrapper}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              disabled={data.isSubmitting}
            >
              Sign In
            </Button>
            {data.isSubmitting && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link component='button' variant='body2' color='inherit'>
                <RouteLink style={{ textDecoration: 'none' }} to={'/register'}>
                  {"Don't have an account? Sign up"}
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

// map useful states from redux to props
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, push })(Login);
