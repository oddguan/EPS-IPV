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

/**
 * Main page component of the resource tab
 */
const Resources = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>Resources</Typography>
        <Divider />
        <Typography variant='h6'>Hotlines</Typography>
        <div>
          <img alt='ndvh' src='/static/images/ndvh.png' />
          <Typography variant='body2'>
            National Domestic Violence Hotline 512-453-8117
          </Typography>
          <Typography variant='body2'>512-453-8117</Typography>
          <Typography variant='body2'>
            <a href='https://www.thehotline.org/help/'>
              https://www.thehotline.org/help/
            </a>
          </Typography>
        </div>
        <div>
          <img alt='safe-horizon' src='/static/images/safe-horizon.png' />
          <Typography variant='body2'>Safe Horizon</Typography>
          <Typography variant='body2'>1-800-621-HOPE</Typography>
          <Typography variant='body2'>
            <a href='https://www.safehorizon.org/hotlines'>
              https://www.safehorizon.org/hotlines
            </a>
          </Typography>
        </div>
        <div>
          <img alt='rainn' src='/static/images/rainn.png' width='300px' />
          <Typography variant='body2'>
            Rape, Abuse and Incest National Network
          </Typography>
          <Typography variant='body2'>1-800-656-HOPE</Typography>
          <Typography variant='body2'>
            <a href='https://www.rainn.org/'>https://www.rainn.org/</a>
          </Typography>
        </div>
        <Typography variant='h6'>
          Domestic/Intimate Partner Violence Laws and Definitions by State
        </Typography>
        <div>
          <img alt='wl' src='/static/images/wl.webp' />
          <Typography variant='body2'>
            National Network to End Domestic Violence, Inc
          </Typography>
          <Typography variant='body2'>
            <a href='https://www.womenslaw.org/laws/statutes'>
              https://www.womenslaw.org/laws/statutes/
            </a>
          </Typography>
        </div>
        <div>
          <img alt='ncsl' src='/static/images/ncsl.jpg' />
          <Typography variant='body2'>
            National Conference of State Legislatures
          </Typography>
          <Typography variant='body2'>
            <a href='https://www.ncsl.org/research/human-services/domestic-violence-domestic-abuse-definitions-and-relationships.aspx'>
              https://www.ncsl.org/research/human-services/domestic-violence-domestic-abuse-definitions-and-relationships.aspx
            </a>
          </Typography>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Resources;
