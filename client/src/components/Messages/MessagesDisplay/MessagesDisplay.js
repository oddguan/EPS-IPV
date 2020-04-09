import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import InputGroup from './InputGroup/InputGroup';
import MessageItem from './MessageItem/MessageItem';

import transformIntoAvatarText from '../../../utils/transformIntoAvatarText';
import messages from './dummyMessages';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: 'calc(100% - 60px)',
    height: '100%',
    float: 'left',
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - 270px)',
    },
  },
  messages: {
    position: 'relative',
    display: 'flex',
    height: '95%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: theme.spacing(2),
  },
  messagesItems: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    overflowY: 'scroll',
    border: '1px solid #eee',
    padding: theme.spacing(1),
  },
}));

/**
 * The message box on the messages tab
 */
const MessagesDisplay = ({ selectedIndex, contacts }) => {
  const classes = useStyles();

  const name = selectedIndex >= 0 ? contacts[selectedIndex] : '';
  const initials = transformIntoAvatarText(name);

  return (
    <Paper variant='outlined' className={classes.root}>
      <div className={classes.messages}>
        <Typography variant='h6'>{name}</Typography>
        <div className={classes.messagesItems}>
          {/* message items */}
          {messages.map((message, i) => (
            <MessageItem
              key={i}
              message={message.message}
              isOwnMessage={message.isOwnMessage}
              initials={initials}
            />
          ))}
        </div>
        <InputGroup />
      </div>
    </Paper>
  );
};

MessagesDisplay.propTypes = {
  selectedIndex: PropTypes.number,
  contacts: PropTypes.array,
};

export default MessagesDisplay;
