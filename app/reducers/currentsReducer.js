import axios from 'axios';

/*----------  INITIAL STATE  ----------*/
const initialState = {
    currentProject: null,
    currentCommit: null
};

/*----------  ACTION TYPES  ----------*/
const ON_SET_CURRENT_PROJECT = 'ON_SET_CURRENT_PROJECT';
const ON_SET_CURRENT_COMMIT = 'ON_SET_CURRENT_COMMIT';

/*----------  ACTION CREATORS  ----------*/
export const onSetCurrentProject = (currentProject) => ({
    type: ON_SET_CURRENT_PROJECT,
    currentProject
})

export const onSetCurrentCommit = (currentCommit) => ({
    type: ON_SET_CURRENT_COMMIT,
    currentCommit
})

/*----------  THUNKS  ----------*/
export const setCurrentProject = (currentProject) => dispatch => {
    dispatch(onSetCurrentProject(currentProject));
}

export const setCurrentCommit = (currentCommit) => dispatch => {
    dispatch(onSetCurrentCommit(currentCommit));
}

/*----------  REDUCER  ----------*/
export default (prevState = initialState, action) => {
    switch(action.type) {
        case ON_SET_CURRENT_PROJECT: 
            return Object.assign({}, prevState, {currentProject: action.currentProject});
        case ON_SET_CURRENT_COMMIT: 
            return Object.assign({}, prevState, {currentCommit: action.currentCommit});
        default:
            return prevState;          
    }
}