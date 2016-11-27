import axios from 'axios';

/*----------  INITIAL STATE  ----------*/
const initialState = [];

/*----------  ACTION TYPES  ----------*/
const CURRENT_COLLABS = 'CURRENT_COLLABS';


/*----------  ACTION CREATORS  ----------*/
export const currentCollabs = (pendingArray) => ({
  type: CURRENT_COLLABS,
  payload: pendingArray
});


/*----------  THUNKS  ----------*/
export const checkCurrentCollabs = (user) => {
  const thunk = (dispatch) => {
  axios.get(`http://localhost:3000/api/users/${user.id}/collabs`, user)
    .then(res => {
      dispatch(currentCollabs(res.data))
    })
    .catch(err => console.error('Error finding current collaborators ', err));
  };
  return thunk;
};

/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_COLLABS:
      return action.payload;
    default: return state;
  }
};
