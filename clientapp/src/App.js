import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Navbar from './components/Navbar/Navbar';
import Todos from './components/Todos/Todos';
import { Provider } from 'react-redux';
import './App.css';

import PublicRoute from './components/HOC/PublicRoute/PublicRoute';
import PrivateRoute from './components/HOC/PrivateRoute/PrivateRoute';
import store, { history } from './store';
import { loadUser } from './actions/authActions';
import { ConnectedRouter } from 'connected-react-router';

/**
 * The root component of the react project.
 * This file is included in the "index.js" file under the same directory,
 * which is then included in the "index.html" file in the public directory.
 */
function App() {
  // When the application starts, try to load user from using
  // The localStorage's user information and JWT token
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      {/* Wrap everything into a redux store */}
      <ConnectedRouter history={history}>
        <div className='AppContainer'>
          <Navbar />
          <Switch>
            {/* Login and Register are public routes */}
            <PublicRoute exact path='/login' component={Login} />
            <PublicRoute exact path='/register' component={Register} />
            {/* Todo list is a private route, requiring user to login before use */}
            <PrivateRoute exact path='/' component={Todos} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
