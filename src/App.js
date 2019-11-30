import React from 'react';
import { Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from './routes';
import GlobalStyles from './styles/global';
import history from './services/history';

export default () => (
  <Router history={history}>
    <Routes />
    <GlobalStyles />
  </Router>
);