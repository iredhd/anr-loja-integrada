import React from 'react';
import { Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Routes from './routes';
import GlobalStyles from './styles/global';
import history from './services/history';
import Theme from './styles/layout';
import { Auth, User } from './services';
import { registerUser, logout } from './store/actions/User';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

firebase.initializeApp(firebaseConfig);

library.add(fas);

export default () => {
  const dispatch = useDispatch();

  firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      const { name } = await User.getUser(user.uid);
      dispatch(registerUser({
        name,
        email: user.email,
        id: user.uid
      }));
    } else {
      Auth.Logout();
      dispatch(logout());
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
