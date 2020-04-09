import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { setRegularUserStatus } from '../../../actions/authActions';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(18),
  },
  prompt: {
    disiplay: 'block',
    textAlign: 'center',
    margin: theme.spacing(5),
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 100,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
}));

/**
 * Display two buttons as whether the user is a victim or help provider.
 * This will set a global flag in redux indicating the user status 
 */
const CheckUserType = ({ isUserTypeSelected }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    if (isUserTypeSelected) {
      dispatch(push('/register'));
    }
  }, [isUserTypeSelected, dispatch]);

  const handleButtonClick = (isSelectedRegularUser) => {
    dispatch(setRegularUserStatus(isSelectedRegularUser));
  };

  return (
    <Container compoennt='main' maxWidth='sm' className={classes.root}>
      <Typography variant='h5' className={classes.prompt}>
        Are you a normal user or a help provider?
      </Typography>
      <div className={classes.buttonsWrapper}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleButtonClick(true)}
        >
          I am a normal user
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleButtonClick(false)}
        >
          I am a help provider
        </Button>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isUserTypeSelected: state.auth.isUserTypeSelected,
});

export default connect(mapStateToProps)(CheckUserType);
