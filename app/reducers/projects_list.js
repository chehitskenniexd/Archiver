import axios from 'axios';

/*----------  INITIAL STATE  ----------*/
const initialState = {};

/*----------  ACTION TYPES  ----------*/
const LOAD_PROJECTS = 'LOAD_PROJECTS';

/*----------  ACTION CREATORS  ----------*/
export const loadProjects = (projectsArray) => ({
  type: LOAD_PROJECTS,
  payload: projectsArray
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
    default: return state;
  }
};
