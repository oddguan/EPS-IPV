import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
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
  paragraphs: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    maxWidth: '70%',
  },
}));

const LogInstructions = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const goBackToLogsPage = () => {
    dispatch(push('/logs'));
  };

  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <CssBaseline />
        <Typography variant='h5'>Log Description</Typography>
        <Divider />
        <Paper className={classes.paragraphs}>
          <Typography paragraph>
            These private logs serve as a safe space for you [user] to document
            abusive behavior you have experienced from your intimate partner.
          </Typography>
          <Typography paragraph>
            You can document an abuse event including detailed descriptions of
            the event and picture uploads if applicable.
          </Typography>
          <Typography paragraph>
            Logs can also function like a diary, as a private place to lay out
            your thoughts and feelings.
          </Typography>
          <Typography paragraph>
            In the event of a legal proceeding such as criminal charges against
            your abuser or child custody cases, these logs can serve as evidence
            in your favor (only with your consent). Because of this it is
            important to be truthful and accurate in every single entry.
          </Typography>
          <Typography variant='h6'>Tips for writing a good log</Typography>
          <Typography paragraph>
            <ol>
              <li>
                Make sure to include specific details in every log that you
                create
                <ul>
                  <li>
                    This could include date, time, and location of each event
                    described
                  </li>
                </ul>
              </li>
              <li>
                Add image uploads if applicable
                <ul>
                  <li>
                    This could include images of damages to person or items,
                    screenshots of threatening messages, and relevant
                    documents/supporting details
                  </li>
                </ul>
              </li>
            </ol>
          </Typography>
          <Typography variant='h6'>Log instructions</Typography>
          <Typography paragraph>
            <ol>
              <li>
                Create a log by inputting a title for your log and text
                description
              </li>
              <li>
                Click “save log” to securely save your entry
                <ul>
                  <li>
                    Once “save log” is pressed you will no longer be able to
                    view or edit the log
                  </li>
                </ul>
              </li>
              <li>
                Click “share log” to send your log to a help provider through
                our chat function
              </li>
              <li>
                To retrieve your logs you must share them with a provider and
                have them print it out at their facility
              </li>
            </ol>
          </Typography>
          <Typography variant='h6'>Notes</Typography>
          <Typography paragraph>
            <ol>
              <li>
                Drop box style logs
                <ul>
                  <li>
                    User will not be able to edit or view logs once they are
                    saved
                  </li>
                  <li>
                    In order to view logs user can “send to shelter” to print
                    them out
                  </li>
                  <li>
                    This is done to protect user safety
                    <ul>
                      <li>
                        If account is compromised, abuser cannot view/edit logs
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                Legal
                <ul>
                  <li>
                    Logs remain privileged between our site/shelter workers and
                    user
                    <ul>
                      <li>Unless user gives up these rights</li>
                      <li>Unless user is killed :( </li>
                    </ul>
                  </li>
                  <li>
                    Logs can serve as evidence in legal proceedings so it’s
                    important that they are truthful and accurate
                  </li>
                </ul>
              </li>
            </ol>
          </Typography>
        </Paper>
        <Button
          style={{ margin: '20px' }}
          variant='contained'
          color='secondary'
          onClick={goBackToLogsPage}
        >
          Back
        </Button>
      </div>
    </React.Fragment>
  );
};

export default LogInstructions;
