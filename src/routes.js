import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';

export default () => (
  <Switch>
    <Route exact path="/" component={Login} />
  </Switch>
);