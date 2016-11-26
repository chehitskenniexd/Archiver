// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Signup from './components/Signup';
import Other from './components/Other';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/signup" component={Signup} />
    <Route path="/main" component={Other} />
  </Route>
);
