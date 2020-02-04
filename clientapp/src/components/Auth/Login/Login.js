import React, { useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Link as RouteLink } from 'react-router-dom';
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

import Copyright from '../../Copyright/Copyright';
import { login } from '../../../actions/authActions';

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

function Login(props) {
  const initialState = {
    email: '',
    password: '',
    isSubmitting: false
  };

  const [data, setData] = useState(initialState);
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true
    });
    const { email, password } = data;
    setData({
      ...data,
      isSubmitting: false
    });
    email && password && props.login({ email, password });
    props.push('/');
  };

  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      {/* <ToastContainer position='top-center' /> */}
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
              <RouteLink to={'/register'}>
                {"Don't have an account? Sign up"}
              </RouteLink>
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, push })(Login);
