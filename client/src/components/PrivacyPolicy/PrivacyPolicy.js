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

const PrivacyPolicy = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>Privacy Policy</Typography>
        <Divider />
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
          If you choose to use our Service, then you agree to the collection and
          use of information in relation with this policy. To better protect
          your information security and privacy, we refer to and abide by the EU
          General Data Protection Regulation (GDPR) and the California Consumer
          Privacy Act (CCPA) to securely collect, use, and store your personal
          information.
        </Typography>
        <Typography paragraph>
          The Personal Information that we collect is used for helping and
          protecting any potential IPV victims. We will not use or share
          personal information with anyone or any third parties except as
          described in this Privacy Policy.
        </Typography>
        <Typography paragraph>
          The terms used in this Privacy Policy have the same meanings as in our
          Terms and Conditions, which is accessible at
          https://protect-ipv-victims.xyz, unless otherwise defined in this
          Privacy Policy.
        </Typography>
        <Typography variant='h6'>Information Collection and Use</Typography>
        <Typography paragraph>
          For a better experience while using our service, we may require you to
          provide us with certain personally identifiable information. The
          information to be collected from victims includes but not limited to
          name, email address, and phone number. Also, the information to be
          collected from help providers includes but not limited to name, email
          address, organization name, and phone number. We will not use
          collected information to contact or identify users.
        </Typography>
        <Typography variant='h6'>Cookies</Typography>
        <Typography paragraph>
          To protect your security and privacy, our website will not use cookies
          to gather and store information of you and your browser.
        </Typography>
        <Typography variant='h6'>Service Providers</Typography>
        <Typography paragraph>
          We will not employ third-party companies and individuals in order to
          protect your safety and privacy. However, we want to inform our
          potential victims that help providers have access to your personal
          information. The reason is to allow help providers to perform
          functions on time so as to support and protect potential victims.
          However, they are obligated not to disclose or use the information for
          any other purpose.
        </Typography>
        <Typography variant='h6'>Security</Typography>
        <Typography paragraph>
          We value your trust in providing us your personal information, thus we
          are striving to use effective and efficient methods such as
          encryptions to transmit and store your password, logs, and images.
        </Typography>
        <Typography variant='h6'>Changes to This Privacy Policy</Typography>
        <Typography paragraph>
          We may update our Privacy Policy from time to time. Thus, we advise
          you to review this page periodically for any changes. We will notify
          you of any changes by posting the new Privacy Policy on this page.
          These changes are effective immediately, after they are posted on this
          page.
        </Typography>
        <Typography variant='h6'>Contact Us</Typography>
        <Typography paragraph>
          If you have any questions or suggestions about our Privacy Policy, do
          not hesitate to contact us.
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default PrivacyPolicy;
