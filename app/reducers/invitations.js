import axios from 'axios';
import { fetchUserProjects } from './projects_list';

/*----------  INITIAL STATE  ----------*/
const initialState = [];

/*----------  ACTION TYPES  ----------*/
const PENDING_INV = 'PENDING_INV';


/*----------  ACTION CREATORS  ----------*/
export const pendingInv = (pendingArray) => ({
  type: PENDING_INV,
  payload: pendingArray
});


/*----------  THUNKS  ----------*/
export const checkPendingInv = (user) => {
  const thunk = (dispatch) => {
  axios.get(`http://localhost:3000/api/users/${user.id}/invites`, user)
    .then(res => {
      dispatch(pendingInv(res.data))
    })
    .catch(err => console.error('Error finding user roles ', err));
  };
  return thunk;
};

export const updateInvStatus = (project, user) => {
  const thunk = (dispatch) => {
  axios.put(`http://localhost:3000/api/users/${user.id}/${project.projectId}`)
    .then(res => {
      if (res.data.message) {
        dispatch(checkPendingInv(user));
      } else {
        console.error('Error updating user roles ', err);
      }
    })
    .then(() => {
      dispatch(fetchUserProjects(user.id));
    })
    .catch(err => console.error('Error updating user roles ', err));
  };
  return thunk;
};


/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case PENDING_INV:
      return action.payload;
    default: return state;
  }
};
