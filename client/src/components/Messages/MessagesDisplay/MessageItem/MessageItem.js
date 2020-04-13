import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: '95%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '80%',
    },
  },
  messageAvatar: {
    top: 7,
  },
  messageText: {
    margin: theme.spacing(1),
  },
  messageTextParagraph: {
    marginBottom: 0,
    marginTop: 0,
    padding: theme.spacing(1),
  },
  rightAlignContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

/**
 * A single item for a message display.
 * This supports either message from the user itself 
 * or from the other side by specifying a `isOwnMessage` prop
 */
const MessageItem = ({ message, isOwnMessage, initials }) => {
  const classes = useStyles();

  return (
    <div className={isOwnMessage ? classes.rightAlignContainer : ''}>
      <div variant='outlined' className={classes.root}>
        {!isOwnMessage && initials && (
          <Avatar className={classes.messageAvatar}>{initials}</Avatar>
        )}

        <Paper className={classes.messageText} variant='outlined'>
          <p className={classes.messageTextParagraph}>{message}</p>
        </Paper>

        {isOwnMessage && (
          <Avatar className={classes.messageAvatar}>
            <AccountCircleIcon />
          </Avatar>
        )}
      </div>
    </div>
  );
};

MessageItem.propTypes = {
  message: PropTypes.string,
  isOwnMessage: PropTypes.bool,
  initials: PropTypes.string,
};

export default MessageItem;
