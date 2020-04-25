import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
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

const PrivacyPolicy = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>Privacy Policy</Typography>
        <Typography paragraph>
          The EPS – IPV group operates EPS-IPV Application website, which
          provides the services from help providers for potential victims of any
          intimate privacy violence (IPV).
        </Typography>
        <Typography paragraph>
          This page is used to inform website users (including victims and help
          providers) regarding our policies with the collection, use, and
          disclosure of Personal Information if anyone decided to use the
          EPS-IPV Application.
        </Typography>
        <Typography paragraph>
          This page is used to inform website users (including victims and help
          providers) regarding our policies with the collection, use, and
          disclosure of Personal Information if anyone decided to use the
          EPS-IPV Application.
        </Typography>
        <Divider />
      </div>
    </React.Fragment>
  );
};

export default PrivacyPolicy;
