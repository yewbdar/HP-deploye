import * as types from '../actions/actionType';
const initialState = {
    candidates: [],
    isGettingCandidates : false,
    error:"",
    candidateAppliedPositionsStatus : [],
    candidateResume: null,


}
export default (state=initialState, action) => {
    switch (action.type) {
        case types.BEGIN_GET_CANDIDATE :
            return {...state, isGettingCandidates: true };
        case types.GET_CANDIDATE_SUCCESS :
            return {...state, candidates: action.candidates, isGettingCandidates: false , error :"" };
        case types.GET_CANDIDATE_FAILURE :
            return {...state, isGettingCandidates: false, error: action.errMsg };
        case types.BEGIN_GET_CANDIDATE_APPLIED_POSITION_STATUS :
            return {...state, isGettingCandidateStatus: true };
        case types.GET_CANDIDATE_SUCCESS_APPLIED_POSITION_STATUS :
            return {...state, candidateAppliedPositionsStatus: action.candidateAppliedPositionStatus, isGettingCandidateStatus: false , error :"" };
        case types.GET_CANDIDATE_FAILURE_APPLIED_POSITION_STATUS :
            return {...state, isGettingCandidateStatus: false, error: action.errMsg };
        case types.GET_CANDIDATE_RESUME_SUCCESS :
            return {...state, candidateResume:  action.candidateResume };
        default:
            return state
    }
}
