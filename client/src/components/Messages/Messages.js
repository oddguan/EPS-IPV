import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import MessagesDisplay from './MessagesDisplay/MessagesDisplay';
import ContactsBar from './ContactsBar/ContactsBar';

import contacts from './dummyContacts';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '91vh',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 240px)',
      marginLeft: 240,
    },
    height: '100%',
  },
  twoBars: {
    paddingTop: theme.spacing(1),
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      height: '95%',
    },
  },
  toolbar: theme.mixins.toolbar,
}));

/**
 * Parent container of the message page
 */
const Messages = () => {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={classes.root}>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>Messages</Typography>
        <Divider />
        <div className={classes.twoBars}>
          <MessagesDisplay selectedIndex={selectedIndex} contacts={contacts} />
          <ContactsBar
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            contacts={contacts}
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;
