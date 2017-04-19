import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import * as Cookies from 'js-cookie';

import LoginPage from './components/login-page';
import QuestionPage from './components/question-page';
import App from './components/app';

const routes = (
  <Router history={browserHistory}>
    <Route exact path='/' component={App} />
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
      {routes}
  </Provider>,
  document.getElementById('root')
);
