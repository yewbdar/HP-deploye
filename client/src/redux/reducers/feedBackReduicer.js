import * as types from '../actions/actionType';
const initialState = {
    feedBack: [],
    isGettingFeedBack: false,
    error:""
}
export default (state=initialState, action) => {

    // switch (action.type) {
    //     case types.BEGIN_GET_FEEDBACK :
    //         return {...state, isGettingPosition: true };
    //     case types.GET_FEEDBACK_SUCCESS :
    //         return {...state, position: action.feedBack, isGettingFeedBack: false , error :"" };
    //     case types.GET_FEEDBACK_FAILURE :
    //         return {...state, isGettingFeedBack: false, error: action.errMsg };
    //
    //     default:
    //         return state
    // }
    return state;
}