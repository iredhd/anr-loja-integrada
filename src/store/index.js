import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { User } from './reducers';

export default createStore(
  combineReducers({
    user: User
  }),
  compose(applyMiddleware(
    thunk
  ))
);
