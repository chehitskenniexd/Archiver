// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import registerReducer from './login';
import counter from './counter';

const rootReducer = combineReducers({
  counter,
  login: registerReducer, 
  routing
});

export default rootReducer;
