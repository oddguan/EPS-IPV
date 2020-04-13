import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

/**
 * A HOC for redirecting to the education tab, using react-router under the hood
 * @param { component, isAuthenticated, ...rest } props
 */
function RedirectRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      // map all props into the next level component
      {...rest}
      render={props =>
        // Check authentication status, if authenticated then display component
        // if not, redirect to login page
        isAuthenticated ? (
          <Redirect
            to={{ pathname: '/education', state: { from: props.location } }}
          />
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

export default connect(mapStateToProps)(RedirectRoute);
