import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Login, Home, ProjectsManager, ProjectManager, OrderSender } from './pages';

export default () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/projects-manager" component={ProjectsManager} />
    <Route exact path="/projects-manager/create" component={ProjectManager} />
    <Route exact path="/projects-manager/:id" component={ProjectManager} />
    <Route exact path="/order-sender" component={OrderSender} />
  </Switch>
);
