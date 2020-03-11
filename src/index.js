import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import Store from './store';

const Redux = () => (
  <Provider store={Store}>
    <App />
  </Provider>
);

ReactDOM.render(<Redux />, document.getElementById('root'));
