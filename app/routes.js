// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Signup from './components/Signup';
import Other from './components/Other';
import MainRender from './components/MainRender';
import MainHome from './components/MainHome';
import Add from './components/Add';
import Collaborator from './components/Collaborator';
import PageRender from './components/PageRender';
import TestModal from './components/TestModal';
import Info from './components/Info';


// TODO: Change the IndexRoute back to Home.
//  Main is added for the sake of trying to render things.
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/signup" component={Signup} />
    <Route path="/main" component={Other}>
      <Route path="/mainRender" component={MainRender}>
        <Route path="/mainHome" component={MainHome} />
        <Route path="/add" component={Add} />
        <Route path="/collabs" component={Collaborator} />
        <Route path="/pageRender" component={PageRender} />
        <Route path="/info" component={Info} />
        <Route path="/testmodal" component={TestModal} />
      </Route>
    </Route>
  </Route>
);
