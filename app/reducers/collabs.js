import axios from 'axios';

/*----------  INITIAL STATE  ----------*/
const initialState = {};

/*----------  ACTION TYPES  ----------*/
const CURRENT_PROJECT_INFO = 'CURRENT_PROJECT_INFO';


/*----------  ACTION CREATORS  ----------*/
export const currentProject = (projectInfo) => ({
  type: CURRENT_PROJECT_INFO,
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
      if (res.data > 0) {
        dispatch(fetchCurrentProjectInfo(project))
      } else {
        next()
      }
    })
    .catch(err => console.error('Error deleting current collaborator ', err));
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
