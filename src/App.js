import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Room from './components/Room/Room';
import NotFound from './components/NotFound/NotFound';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/room/:name" exact component={Room}/>
        <Route path="*" exact={true} component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
