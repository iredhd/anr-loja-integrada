import { ActionTypes } from '../actions';

const initialState = {
  name: null,
  email: null,
  id: null,
  errorMessage: null,
  loggedIn: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGGED_IN:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        id: action.payload.id,
        errorMessage: null,
        loggedIn: true,
        loading: false
      };
    case ActionTypes.USER_LOGGED_OUT:
      return {
        ...initialState
      };
    case ActionTypes.USER_REQUESTING_LOGIN:
      return {
        ...initialState,
        loading: true
      };
    case ActionTypes.USER_FAIL_LOGIN:
      return {
        ...initialState,
        errorMessage: action.payload.message,
        loggedIn: false,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
