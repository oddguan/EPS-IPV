import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import transformIntoAvatarText from '../../../utils/transformIntoAvatarText';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    float: 'right',
    width: 50,
    height: '100%',
    border: '1px transparent',
    [theme.breakpoints.up('md')]: {
      width: 250,
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      margin: theme.spacing(1),
    },
  },
  listItemText: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  avatar: {
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
}));

/**
 * List of contacts displayed on the right of messages page.
 * Scrollable as the list grows, and responsive on both
 * mobile and desktop platform
 */
const ContactsBar = ({ selectedIndex, setSelectedIndex, contacts }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='h6' className={classes.title}>
        Contacts
      </Typography>
      <List dense>
        {contacts.map((name, i) => (
          <ListItem
            key={i}
            button
            selected={selectedIndex === i}
            onClick={() => setSelectedIndex(i)}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                {transformIntoAvatarText(name)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              className={classes.listItemText}
              primary={name}
            ></ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

ContactsBar.propTypes = {
  selectedIndex: PropTypes.number,
  setSelectedIndex: PropTypes.func,
  contacts: PropTypes.array,
};

export default ContactsBar;
