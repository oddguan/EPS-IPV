import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

/**
 * A HOC for securing private routes, using react-router under the hood
 * @param { component, isAuthenticated, ...rest } props
 */
function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      // map all props into the next level component
      {...rest}
      render={props =>
        // Check authentication status, if authenticated then display component
        // if not, redirect to login page
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    ></Route>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
