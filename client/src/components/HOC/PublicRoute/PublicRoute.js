import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

/**
 * A HOC for public routes, using react-router under the hood.
 * It is needed because the app wants to redirect user from the login page
 * when the user is already logged in before.
 * @param { component, isAuthenticated, ...rest } props
 */
function PublicRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      // destructure other props down the line
      {...rest}
      render={props =>
        // Check authentication status, if authenticated then redirect to home page
        // if not, stay at the component page
        isAuthenticated ? (
          <Redirect
            to={{ pathname: '/education', state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    ></Route>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PublicRoute);
