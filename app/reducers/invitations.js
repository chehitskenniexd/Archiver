import axios from 'axios';

/*----------  INITIAL STATE  ----------*/
const initialState = {};

/*----------  ACTION TYPES  ----------*/
const PENDING_INV = 'PENDING_INV';


/*----------  ACTION CREATORS  ----------*/
export const pendingInv = (projectsArray) => ({
  type: PENDING_INV,
  payload: projectsArray
});


/*----------  THUNKS  ----------*/
export const checkPendingInv = (user) => {
    const thunk = (dispatch) => {
        axios.post('http://localhost:3000/api/user/roles', user)
            .then(res => {
              console.log("in checkPendingInv RES", res)
              // if (res.data.message){
              //   dispatch(userAlreadyExists(res.data.foundUser))
              // } else {
              //   dispatch(newUser(res.data))
              // }
            })
            .catch(err => console.error('Error finding user roles ', err))
    }
    return thunk;
}


/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case PENDING_INV:
      return action.payload;
    default: return state;
  }
};
