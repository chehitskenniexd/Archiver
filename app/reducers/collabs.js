import axios from 'axios';

/*----------  INITIAL STATE  ----------*/
const initialState = {};

/*----------  ACTION TYPES  ----------*/
const CURRENT_PROJECT_INFO = 'CURRENT_PROJECT_INFO';
const REMOVE_CURRENT_COLLAB = 'REMOVE_CURRENT_COLLAB';
const REMOVE_CURRENT_INV = 'REMOVE_CURRENT_INV';


/*----------  ACTION CREATORS  ----------*/
export const currentProject = (projectInfo) => ({
  type: CURRENT_PROJECT_INFO,
  payload: projectInfo
});

export const removeCurrentCollab = (projectInfo) => ({
  type: REMOVE_CURRENT_COLLAB,
  payload: projectInfo
});

export const removeCurrentInv = (projectInfo) => ({
  type: REMOVE_CURRENT_INV,
  payload: projectInfo
});


/*----------  THUNKS  ----------*/
export const fetchCurrentProjectInfo = (project) => {
  const thunk = (dispatch) => {
  axios.get(`http://localhost:3000/api/projects/${project.id}`, project)
    .then(res => {
      dispatch(currentProject(res.data))
    })
    .catch(err => console.error('Error finding current project data ', err));
  };
  return thunk;
};

export const deleteCurrentCollab = (project, user) => {
  const thunk = (dispatch) => {
  axios.delete(`http://localhost:3000/api/projects/${project.id}/${user.id}`, project)
    .then(res => {
      console.log("REVISED PROJ", res.data[0])
      dispatch(fetchCurrentProjectInfo(res.data[0]))
    })
    .catch(err => console.error('Error deleting current collaborator ', err));
  };
  return thunk;
};

export const deleteCurrentInv = (project, user) => {
  const thunk = (dispatch) => {
  axios.delete(`http://localhost:3000/api/projects/${project.id}/${user.id}`, project)
    .then(res => {
      dispatch(currentProject(res.data))
    })
    .catch(err => console.error('Error deleting current invitee ', err));
  };
  return thunk;
};

/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_PROJECT_INFO:
      return action.payload;
    default: return state;
  }
};
