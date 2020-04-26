import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 240px)',
      marginLeft: 240,
    },
  },
  toolbar: theme.mixins.toolbar,
}));

const SAR = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>Subject Access Requests (SARs)</Typography>
        <Divider />
        <Typography paragraph>
          SAR is The Right of Access that allows an individual to obtain
          information. For the purposed of transparency, we provide a way for
          our users to retrieve their data whenever requested. Specifically, our
          users can request and obtain their information including user details,
          logs, as well as messages from the past. The time to get requested
          data would vary based on your data size. You would be able to see all
          the data by which the system will be collecting. Read our privacy
          terms and conditions for more details. Your data would be available in
          CSV files or zipped folder that contains CSV files. To request your
          data by navigating to the account and choose “subject access request”.
          As we upgrade our system, you might be able to get your data in
          different format and any upgrade would be communicated accordingly.
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default SAR;
