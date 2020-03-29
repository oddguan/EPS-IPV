import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import PublicRoute from '../HOC/PublicRoute/PublicRoute';
import PrivateRoute from '../HOC/PrivateRoute/PrivateRoute';
import Appbar from '../Appbar/Appbar';
import NavDrawer from '../NavDrawer/NavDrawer';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import Education from '../Education/Education';

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
        <PrivateRoute exact path='/education' component={Education} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Routes);
