import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Request from './Request/Request';

import { retrieveAllProcessingRequests } from '../../actions/logActions';

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

/**
 * The retrieving log page for help providers
 */
const RetrieveLogs = ({
  allProcessingRequests,
  retrieveAllProcessingRequests,
}) => {
  const classes = useStyles();

  // when the component mounts, fetch all requests
  useEffect(() => {
    retrieveAllProcessingRequests();
  }, [retrieveAllProcessingRequests]);

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>Retrieve Logs</Typography>
        <Divider />
        {allProcessingRequests.length === 0 && (
          <Typography variant='h6'>No requests from users.</Typography>
        )}
        {allProcessingRequests.length !== 0 &&
          allProcessingRequests.map((request, i) => (
            <Request
              key={i}
              username={request.username}
              time={request.createdAt}
            />
          ))}
      </div>
    </React.Fragment>
  );
};

const mapState = (state) => ({
  allProcessingRequests: state.log.allProcessingRequests,
});

export default connect(mapState, { retrieveAllProcessingRequests })(
  RetrieveLogs
);
