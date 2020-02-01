import React from 'react';
import Todos from './components/Todos/Todos';
import './App.css';

function App() {
  return (
    <div className='AppContainer'>
      <h1>My Todo List</h1>
      <h3>Engineering Privacy in Software - IPV</h3>
      <Todos />
    </div>
  );
}

export default App;
