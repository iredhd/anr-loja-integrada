import { ActionTypes } from '../actions';

const initialState = {
  name: null,
  email: null,
  token: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGGED_IN:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token
      };
    case ActionTypes.USER_LOGGED_OUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default reducer;
