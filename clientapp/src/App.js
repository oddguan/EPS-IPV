import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Navbar from './components/Navbar/Navbar';
import Todos from './components/Todos/Todos';
import { Provider } from 'react-redux';
import './App.css';

import PublicRoute from './components/PublicRoute/PublicRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import store, { history } from './store';
import { loadUser } from './actions/authActions';
import { ConnectedRouter } from 'connected-react-router';

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
            <PublicRoute path='/login' component={Login} />
            <PublicRoute path='/register' component={Register} />
            {/* Todo list is a private route, requiring user to login before use */}
            <PrivateRoute path='/' component={Todos} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
