// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import registerReducer from './login';
import mainbarToggleReducer from './mainhome';
import counter from './counter';

const rootReducer = combineReducers({
  counter,
  mainhome: mainbarToggleReducer,
  login: registerReducer,
  routing
});

export default rootReducer;
