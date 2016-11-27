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
export const fetchUserProjects = (user) => {
  // console.log("USER.ID", user);
    const thunk = (dispatch) => {
        axios.get(`http://localhost:3000/api/users/${user}/projects`)
          .then(projectsArray => dispatch(loadProjects(projectsArray.data)))
          .catch(err => console.error('Error fetching projects: ', err))
    }
    return thunk;
}


/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROJECTS:
      return action.payload;
    default: return state;
  }
};
