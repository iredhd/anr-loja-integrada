import { ActionTypes } from '.';
import { Auth } from '../../services';

export const login = user => {
  return async dispatch => {
    dispatch(requestLogin());

    const AuthData = await Auth.Login(user.email, user.password);

    if (AuthData.loggedIn) {
      dispatch(registerUser({
        name: AuthData.user.name,
        email: AuthData.user.email,
        id: AuthData.user.id
      }));
    } else {
      dispatch(failLogin(AuthData.message));
    }
  };
};

export const registerUser = user => {
  return ({
    type: ActionTypes.USER_LOGGED_IN,
    payload: {
      ...user
    }
  });
};

export const requestLogin = () => ({
  type: ActionTypes.USER_REQUESTING_LOGIN
});

export const failLogin = message => ({
  type: ActionTypes.USER_FAIL_LOGIN,
  payload: {
    message
  }
});

export const logout = () => {
  return async dispatch => {
    await Auth.Logout();

    dispatch({
      type: ActionTypes.USER_LOGGED_OUT
    });
  };
};
