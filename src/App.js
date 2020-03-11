import React from 'react';
import { Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import { ThemeProvider } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Routes from './routes';
import GlobalStyles from './styles/global';
import history from './services/history';
import Theme from './styles/layout';
import { User, Auth } from './services';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};

firebase.initializeApp(firebaseConfig);

library.add(fas);

export default () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      Auth.setUID(user.uid);
    } else {
      Auth.Logout();
    }
  });

  return (
    <ThemeProvider theme={Theme}>
      <Router history={history}>
        <Routes />
        <GlobalStyles />
      </Router>
    </ThemeProvider>
  );
};
