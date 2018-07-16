import * as types from '../actions/actionType';
const initialState = {
    qualification: [],
    isGettingPosition : false,
    error:""
}
export default (state=initialState, action) => {
    switch (action.type) {
        case types.BEGIN_GET_QUALIFICATION :
            return {...state, isGettingQualification: true };
        case types.GET_QUALIFICATION_SUCCESS :
            return {...state, qualification: action.qualification, isGettingQualification: false , error :"" };
        case types.GET_QUALIFICATION_FAILURE :
            return {...state, isGettingQualification: false, error: action.errMsg };

        default:
            return state
    }
}