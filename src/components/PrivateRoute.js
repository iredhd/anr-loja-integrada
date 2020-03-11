import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = props => {
  console.log(firebase.auth().currentUser);
  return (
    <Route {...props} />
  );
};

export default PrivateRoute;
