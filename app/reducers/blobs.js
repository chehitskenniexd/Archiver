import axios from 'axios';

/*----------  INITIAL STATE  ----------*/
const initialState = {};

/*----------  ACTION TYPES  ----------*/
const GET_BUFFER = 'GET_BUFFER';


/*----------  ACTION CREATORS  ----------*/
export const getBuffer = () => ({
  type: GET_BUFFER,
  payload: ();
});



/*----------  THUNKS  ----------*/
export const createUser = (userCred) => {
    const thunk = (dispatch) => {
        axios.post('http://localhost:3000/api/register', userCred)
            .then(res => {
              if (res.data.message){
                dispatch(userAlreadyExists(res.data.foundUser))
              } else {
                dispatch(newUser(res.data))
              }
            })
            .catch(err => console.error('Error creating user: ', err))
    }
    return thunk;
}


/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BUFFER:
      return Object.assign({}, state, {
        onMainHome: action.payload,
        onAddProject: false,
        onCollaborator: false,
        onPageRender: false
      });
    default: return state;
  }
};
