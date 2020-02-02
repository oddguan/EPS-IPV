import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Navbar from './components/Navbar/Navbar';
import Todos from './components/Todos/Todos';
import './App.css';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
