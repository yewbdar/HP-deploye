import * as types from '../actions/actionType';
const initialState = {
    userInfo: {},
    isGettingUserInfo : false,
    error:"",
    isGettingCurrentUser : false,
    currentInfoError : ""
};
export default (state=initialState, action) => {
    switch (action.type) {
        case types.BEGIN_LOGGING_IN :
            return {...state, isGettingUserInfo: true };
        case types.LOGGING_IN_SUCCESS :
            return {...state, userInfo: action.userInfo, isGettingUserInfo: false , error :"" };
        case types.LOGGING_IN_FAILURE :
            return {...state, isGettingUserInfo: false, error: action.errMsg };
        case types.BEGIN_GET_CURRENT_USER :
            return {...state, isGettingCurrentUser: true };
        case types.GET_CURRENT_USER_SUCCESS :
            return {...state, userInfo: action.userInfo, isGettingCurrentUser: false , currentInfoError :"" };
        case types.GET_CURRENT_USER_FAILURE :
            return {...state, isGettingCurrentUser: false, currentInfoError: action.errMsg };
        case types.LOGOUT_CURRENT_USER :
            return {...state, userInfo : action.userInfo};
        default:
            return state
    }
}
