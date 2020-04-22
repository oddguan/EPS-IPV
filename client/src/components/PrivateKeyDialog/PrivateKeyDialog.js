import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { privateKeyDownloaded } from '../../actions/authActions';

const PrivateKeyDialog = ({ isFirstLogin, privateKeyDownloaded }) => {
  return (
    <div>
      <Dialog
        open={isFirstLogin}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Download Your Private Key!'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            If you want to use the Logs functionality of the website, you have
            to store your private encryption key on your own device. Click
            "Download" to download the private key to your device and store it
            securely.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary'>
            I don't want to use the Logs functionality
          </Button>
          <br />
          <Button onClick={privateKeyDownloaded} color='primary' autoFocus>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isFirstLogin: state.auth.isFirstLogin,
});

export default connect(mapStateToProps, { privateKeyDownloaded })(
  PrivateKeyDialog
);
