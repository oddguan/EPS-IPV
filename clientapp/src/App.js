import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Navbar from './components/Navbar/Navbar';
import Todos from './components/Todos/Todos';
import { Provider } from 'react-redux';
import './App.css';

import store from './store';
import { loadUser } from './actions/authActions';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Provider store={store}>
        <div className='AppContainer'>
          <Navbar />
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/'>
              <Todos />
            </Route>
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
