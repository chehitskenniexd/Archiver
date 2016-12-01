import axios from 'axios';

/*----------  INITIAL STATE  ----------*/
const initialState = {};

/*----------  ACTION TYPES  ----------*/
const LOGIN_USER = 'LOGIN_USER';
const REGISTER_USER = 'REGISTER_USER';
const USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS';
const INCORRECT_USER = 'INCORRECT_USER';
const INCORRECT_PASSWORD = 'INCORRECT_PASSWORD';
const LOG_OUT = 'LOG_OUT';
const REMOVE_ERRORS = 'REMOVE_ERRORS';

/*----------  ACTION CREATORS  ----------*/
export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user
});

export const newUser = (user) => ({
    type: REGISTER_USER,
    payload: user
})

export const userAlreadyExists = (userEmail) => ({
    type: USER_ALREADY_EXISTS,
    payload: userEmail,
    userExists: true
})

export const incorrectUser = () => ({
    type: INCORRECT_USER,
    incorrectUser: true
})

export const incorrectPassword = () => ({
    type: INCORRECT_PASSWORD,
    incorrectPassword: true
})

export const logUserOut = () => ({
  type: LOG_OUT,
  payload: {}
});

export const removeRedErrors = () => ({
  type: REMOVE_ERRORS,
  incorrectUser: false,
  incorrectPassword: false
});



/*----------  THUNKS  ----------*/
export const createUser = (userCred) => {
    const thunk = (dispatch) => {
        axios.post('http://localhost:3000/api/register', userCred)
            .then(res => {
              if (res.data.message){
                dispatch(userAlreadyExists(userCred.email))
              } else {
                // Must extract out our user so login for new user and login for existing user returns the same user state
                let user = res.data.foundUser;
                dispatch(newUser(user))
              }
            })
            .catch(err => console.error('Error creating user: ', err))
    }
    return thunk;
}

export const authenticateUser = (userCred) => {
    const thunk = (dispatch) => {
        axios.post('http://localhost:3000/api/login', userCred)
            .then(res => {
              if (res.data.notFound){
                dispatch(incorrectUser());
              } else if (res.data.message) {
                dispatch(incorrectPassword());
              } else {
                dispatch(loginUser(res.data.foundUser));
              }
            })
            .catch(err => console.error('Error creating user: ', err))
    }
    return thunk;
}


/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_ALREADY_EXISTS:
      return Object.assign({}, state, {
        userExists: action.userExists,
        user: action.payload
      });
    case REGISTER_USER:
      return action.payload;
    case INCORRECT_USER:
      return Object.assign({}, state, {
        incorrectUser: action.incorrectUser
      });
    case INCORRECT_PASSWORD:
      return Object.assign({}, state, {
        incorrectPassword: action.incorrectPassword
      });
    case LOGIN_USER:
      return action.payload;
    case LOG_OUT:
      return action.payload
    case REMOVE_ERRORS:
      return Object.assign({}, state, {
        incorrectUser: action.userExists,
        incorrectPassword: action.incorrectPassword
      })
    default: return state;
  }
};
