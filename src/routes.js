import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';

export default () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/home" component={Home} />
  </Switch>
);