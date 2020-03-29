import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store';
import { loadUser } from './actions/authActions';
import Routes from './components/Routes/Routes';

import './App.css';
import 'typeface-roboto';

/**
 * The root component of the react project.
 * This file is included in the "index.js" file under the same directory,
 * which is then included in the "index.html" file in the public directory.
 */
function App() {
  // When the application starts, try to load user from using
  // The localStorage's user information and JWT token
  useEffect(() => {
    if (localStorage.getItem('token') || localStorage.getItem('user')) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      {/* Wrap everything into a redux store */}
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;