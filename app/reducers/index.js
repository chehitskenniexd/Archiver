// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import registerReducer from './login';
import mainbarToggleReducer from './mainhome';
import counter from './counter';
import projects from './projects_list';
import inviteReducer from './invitations';
import collabsReducer from './collabs';
import currentsReducer from './currentsReducer';

const rootReducer = combineReducers({
  counter,
  mainhome: mainbarToggleReducer,
  login: registerReducer,
  projects: projects,
  invite: inviteReducer,
  collabs: collabsReducer,
  currents: currentsReducer,
  routing
});

export default rootReducer;
