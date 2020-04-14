import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import PublicRoute from '../HOC/PublicRoute/PublicRoute';
import PrivateRoute from '../HOC/PrivateRoute/PrivateRoute';
import RedirectRoute from '../HOC/RedirectRoute/RedirectRoute';
import Appbar from '../Appbar/Appbar';
import NavDrawer from '../NavDrawer/NavDrawer';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import CheckUserType from '../Auth/CheckUserType/CheckUserType';
import Education from '../Education/Education';
import NewPost from '../Education/NewPost/NewPost';
import Post from '../Education/Post/Post';
import Logs from '../Logs/Logs';
import NewLog from '../Logs/NewLog/NewLog';
import Resources from '../Resources/Resources';
import Messages from '../Messages/Messages';
import Account from '../Account/Account';
import RetrieveLogs from '../RetrieveLogs/RetrieveLogs';

/**
 * Defines all routing information.
 * Routes higher-order components such as PrivateRoute, RedirectRoute and PublicRoute
 * are defined in the HOC components directory.
 */
const Routes = ({ isAuthenticated }) => {
  // A boolean to track whether the mobile navbar is opened or not
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <Appbar handleDrawerToggle={handleDrawerToggle} />
      {isAuthenticated && (
        <NavDrawer
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        />
      )}
      <Switch>
        <PublicRoute exact path='/login' component={Login} />
        <PublicRoute exact path='/register' component={Register} />
        <PublicRoute exact path='/check' component={CheckUserType} />
        <RedirectRoute exact path='/' component={() => <></>} />
        <PrivateRoute exact path='/education' component={Education} />
        <PrivateRoute path='/education/post/:postId' component={Post} />
        <PrivateRoute exact path='/education/new' component={NewPost} />
        <PrivateRoute exact path='/logs' component={Logs} />
        <PrivateRoute exact path='/logs/new' component={NewLog} />
        <PrivateRoute exact path='/messages' component={Messages} />
        <PrivateRoute exact path='/resources' component={Resources} />
        <PrivateRoute exact path='/account' component={Account} />
        <PrivateRoute exact path='/retrieve-logs' component={RetrieveLogs} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Routes);
