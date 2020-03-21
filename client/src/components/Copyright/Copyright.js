import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

/**
 * For displaying copyright information in the login and register page
 */
function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link
        color='inherit'
        href='http://epsipv-env.hq2w62cyzp.us-west-2.elasticbeanstalk.com/'
      >
        EPS-IPV
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
