// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Signup from './components/Signup';
import Other from './components/Other';


// TODO: Change the IndexRoute back to Home.
//  Main is added for the sake of trying to render things.
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/signup" component={Signup} />
    <Route path="/main" component={Other} />
  </Route>
);
