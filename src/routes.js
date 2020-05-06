import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PrivateRoute } from './components';
import { Login, Home, ProjectsManager, ProjectManager, OrderSender, NotFound, CoursesManager, CourseManager } from './pages';

export default () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <PrivateRoute exact path="/home" component={Home} />
    <PrivateRoute exact path="/projects-manager" component={ProjectsManager} />
    <PrivateRoute exact path="/projects-manager/create" component={ProjectManager} />
    <PrivateRoute exact path="/projects-manager/:id" component={ProjectManager} />
    <PrivateRoute exact path="/courses-manager" component={CoursesManager} />
    <PrivateRoute exact path="/courses-manager/create" component={CourseManager} />
    <PrivateRoute exact path="/courses-manager/:id" component={CourseManager} />
    <PrivateRoute exact path="/order-sender" component={OrderSender} />
    <Route path="*" component={NotFound} />
  </Switch>
);
