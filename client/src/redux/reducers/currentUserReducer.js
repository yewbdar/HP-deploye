import * as types from '../actions/actionType';
const initialState = {
    currentUser: {},
    isGettingCurrentUser : false,
    error:""
}
export default (state=initialState, action) => {
    switch (action.type) {
        case types.BEGIN_GET_CURRENT_USER :
            return {...state, isGettingCurrentUser: true };
        case types.GET_CURRENT_USER_SUCCESS :
            return {...state, currentUser: action.currentUser, isGettingCurrentUser: false , error :"" };
        case types.GET_CURRENT_USER_FAILURE:
            return {...state, isGettingCurrentUser: false, error: action.errMsg };
        default:
            return state
    }
}
