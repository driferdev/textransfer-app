import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Room from './components/Room/Room';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}/>
      <Route path="/room" exact component={Room}/>
    </BrowserRouter>
  );
}

export default App;
