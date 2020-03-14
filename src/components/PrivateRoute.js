import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = props => {
  const user = useSelector(state => state.user);

  if (!user.loggedIn) {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <Route {...props} />
  );
};

export default PrivateRoute;
