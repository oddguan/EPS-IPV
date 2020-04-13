import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: 'calc(75% - 240px)',
      marginLeft: 240
    }
  },
  toolbar: theme.mixins.toolbar,
  center: {
    textAlign: 'center'
  },
  authorInfo: {
    display: 'flex',
    margin: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2)
    }
  },
  authorInfoLeft: {
    top: 3
  },
  authorInfoRight: {
    marginLeft: theme.spacing(1)
  },
  postImage: {
    display: 'block',
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      maxWidth: '50em',
      maxHeight: '50em'
    }
  }
}));

/**
 * The main page of the readmore post detail.
 * Routed using query parameters.
 * Should put the postId as a query parameter to make this functional.
 */
const Post = () => {
  // Get the postId by accessing query parameters
  const { postId } = useParams();
  const classes = useStyles();
  const title = `Title ${postId}`;

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h4' className={classes.center}>
          {title}
        </Typography>
        <div className={classes.authorInfo}>
          <Avatar className={classes.authorInfoLeft}>JD</Avatar>
          <div className={classes.authorInfoRight}>
            <Typography variant='button' className={classes.authorInfoName}>
              John Doe
            </Typography>
            <br />
            <Typography variant='button' className={classes.authorInfoDate}>
              March 3rd, 2020
            </Typography>
          </div>
        </div>
        <Divider />
        <img src="/static/placeholder-img.jpg" alt={title + ' image'} className={classes.postImage} />
        <Typography paragraph>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
          cumque nostrum assumenda quae debitis deserunt modi corrupti, mollitia
          sed ipsum laudantium illum quam labore deleniti. Illum dicta libero
          eveniet ipsum. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Reiciendis, consequatur velit consequuntur rem laudantium a
          delectus aperiam maiores vero voluptas expedita sapiente nulla? Eum
          nostrum, est ipsa quo necessitatibus ex? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eveniet cum dolorem esse, suscipit
          facere quas eius sunt repellendus animi magnam velit. Fugiat libero
          eos praesentium, aut fugit repellendus nisi molestiae?
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default Post;
