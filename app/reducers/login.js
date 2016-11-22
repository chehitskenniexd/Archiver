import axios from 'axios';

/*----------  INITIAL STATE  ----------*/
const initialState = { loggedIn: false };

/*----------  ACTION TYPES  ----------*/
const LOGIN_USER = 'LOGIN_USER';

/*----------  ACTION CREATORS  ----------*/
export const loginUser = () => ({
  type: LOGIN_USER,
  categories
});

/*----------  THUNKS  ----------*/
export const loadAllCategories = () => dispatch => {
   axios.get('/api/categories')
   .then(res => dispatch(receiveAllCategories(res.data)))
   .catch( (err) => console.error(err));

};


/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_CATEGORIES: return action.categories;
    default: return state;
  }
};
