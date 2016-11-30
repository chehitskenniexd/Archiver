import axios from 'axios';

/*----------  INITIAL STATE  ----------*/
const initialState = {};

/*----------  ACTION TYPES  ----------*/
const LOAD_PROJECTS = 'LOAD_PROJECTS';
const CLEAR_PROJECTS = 'CLEAR_PROJECTS';

/*----------  ACTION CREATORS  ----------*/
export const loadProjects = (projectsArray) => ({
  type: LOAD_PROJECTS,
  payload: projectsArray
});

export const clearProjects = () => ({
  type: CLEAR_PROJECTS,
  payload: null
});


/*----------  THUNKS  ----------*/
export const fetchUserProjects = (userId) => {
  const thunk = (dispatch) => {
    axios.get(`http://localhost:3000/api/users/${userId}/projects`)
      .then(projectsArray => {
        dispatch(loadProjects(projectsArray.data))
      })
      .catch(err => console.error('Error fetching projects: ', err))
  }
  return thunk;
}


/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROJECTS: {
      const newProjects = action.payload.projects.map(project =>
        Object.assign({}, project, { commits: project.commits.reverse() })
      )
      return Object.assign({}, action.payload, { projects: newProjects })
    }
    case CLEAR_PROJECTS:
      return action.payload;
    default: return state;
  }
};
