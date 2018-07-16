import * as types from '../actions/actionType';
const initialState = {
    position: [],
    isGettingPosition : false,
    error:""
}
export default (state=initialState, action) => {
    switch (action.type) {
        case types.BEGIN_GET_POSITION :
            return {...state, isGettingPosition: true };
        case types.GET_POSITION_SUCCESS :
            return {...state, position: action.position, activePosition:action.activePosition, isGettingPosition: false , error :"" };
        case types.GET_POSITION_FAILURE :
            return {...state, isGettingPosition: false, error: action.errMsg };
        case types.BEGIN_GET_ACTIVE_POSITION :
            return {...state, isGettingPosition: true };
        case types.GET_ACTIVE__POSITION_SUCCESS :
            return {...state, position:action.position, isGettingPosition: false , error :"" };
        case types.GET_ACTIVE_POSITION_FAILURE :
            return {...state, isGettingPosition: false, error: action.errMsg };
        default:
            return state
    }
}