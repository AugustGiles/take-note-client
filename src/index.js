import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { configureStore } from './redux/configureStore'
import { Provider } from 'react-redux'
import HttpsRedirect from 'react-https-redirect'


const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <HttpsRedirect>
        <App />
      </HttpsRedirect>
    </BrowserRouter>
  </Provider>,
    document.getElementById('root'))
