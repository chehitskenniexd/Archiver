// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import registerReducer from './login';
import mainbarToggleReducer from './mainhome';
import counter from './counter';
import projects from './projects_list';

const rootReducer = combineReducers({
  counter,
  mainhome: mainbarToggleReducer,
  login: registerReducer,
  projects: projects,
  routing
});

export default rootReducer;
