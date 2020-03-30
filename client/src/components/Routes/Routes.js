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
import Education from '../Education/Education';
import Logs from '../Logs/Logs';
import NewLog from '../Logs/NewLog/NewLog';
import Resources from '../Resources/Resources';
import Messages from '../Messages/Messages';
import Account from '../Account/Account';

const Routes = ({ isAuthenticated }) => {
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
        <RedirectRoute exact path='/' component={() => <></>} />
        <PrivateRoute exact path='/education' component={Education} />
        <PrivateRoute exact path='/logs' component={Logs} />
        <PrivateRoute exact path='/logs/new' component={NewLog} />
        <PrivateRoute exact path='/messages' component={Messages} />
        <PrivateRoute exact path='/resources' component={Resources} />
        <PrivateRoute exact path='/account' component={Account} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Routes);
