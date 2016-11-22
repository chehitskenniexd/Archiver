import axios from 'axios';

/*----------  INITIAL STATE  ----------*/
const initialState = { loggedIn: false };

/*----------  ACTION TYPES  ----------*/
const LOGIN_USER = 'LOGIN_USER';

/*----------  ACTION CREATORS  ----------*/
export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user
});

export const newUser = (user) => ({
    type: REGISTER_USER,
    payload: user
})


/*----------  THUNKS  ----------*/
export const createUser = (userCred) => {
    const thunk = (dispatch) => {
        axios.post('../backend_routes/api/register', userCred)
            .then(res => dispatch(newUser(res.data)))
            .catch(err => console.error('Error creating user: ', err))
    }
    return thunk;
}


/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_CATEGORIES: return action.categories;
    default: return state;
  }
};
