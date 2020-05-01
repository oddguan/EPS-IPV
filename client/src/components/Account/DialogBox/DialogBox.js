import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

/**
 * A generic Dialog component that takes the text and actions of the buttons
 * and display the corresponding information when a specific button is clicked.
 */
const DialogBox = ({
  isDialogOpen,
  setIsDialogOpen,
  title,
  content,
  buttons,
}) => {
  return (
    <div>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby={`alert-dialog-title-${title}`}
        aria-describedby={`alert-dialog-description-${title}`}
      >
        <DialogTitle id={`alert-dialog-title-${title}`}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id={`alert-dialog-description-${title}`}>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {buttons.map((button) => (
            <Button
              key={button.content}
              color='primary'
              onClick={button.onClick}
            >
              {button.content}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogBox;
