import React from 'react';
import { Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Routes from './routes';
import GlobalStyles from './styles/global';
import history from './services/history';
import Theme from './styles/layout';

library.add(fas);

export default () => (
  <ThemeProvider theme={Theme}>
    <Router history={history}>
      <Routes />
      <GlobalStyles />
    </Router>
  </ThemeProvider>
);
