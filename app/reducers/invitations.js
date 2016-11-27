import axios from 'axios';

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


/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case PENDING_INV:
      return action.payload;
    default: return state;
  }
};
