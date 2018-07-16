/** */
import axios, { post } from 'axios';
import * as types from './actionType';

//This will be evaluated to const url = "http://localhost:5000/api/" for dev environment
const url = process.env.NODE_ENV === 'production' ? "/hp-api/" : "http://localhost:5000/hp-api";
/**
 * Get Candidates Begin >>
 * @returns {function(*)}
 */
export default {
    getCandidates: function () {
        console.log("_>>>getting Candidates . . .");
        return (dispatch) => {
            dispatch(beginGetCandidates());
            axios.get(`${url}/candidates`)
                .then((res) => {
                    dispatch(getCandidatesSuccess(res.data));
                }).catch((err) => {
                dispatch(getCandidatesFailure(err));
                console.log(err)
            })
        }
    },


    saveCandidate: function(data) {
        const { firstName, lastName, DOB, telephone, email,
                street, city, country, zip, userName, password,
                file, yearsOfExperience, selectedQualifications} = data;
        return (dispatch) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('yearsOfExperience', yearsOfExperience);
            formData.append('firstName',firstName);
            formData.append('lastName', lastName);
            formData.append('DOB', DOB);
            formData.append('telephone', telephone);
            formData.append('email', email);
            formData.append('street', street);
            formData.append('city', city);
            formData.append('country', country);
            formData.append('zip', zip);
            formData.append('userName', userName);
            formData.append('password', password);
            formData.append('selectedQualifications', selectedQualifications);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            return post(`${url}/candidate`, formData, config);

            dispatch(beginGetCandidateAppliedPositionStatus());
        };
    },
    saveDocument: function(data){
        const {firstName,lastName,DOB,
                telephone,email,street,city,country,zip,
                userName,password,
                file, yearsOfExperience, selectedQualifications} = data;

        return (dispatch)=> {
            dispatch(beginCandidateSave());
            let formData = new FormData();
            formData.append('file', file);
            formData.append('yearsOfExperience', data.yearsOfExperience);
            formData.append('firstName', data.firstName);
            formData.append('lastName', data.lastName);
            formData.append('DOB', data.DOB);
            formData.append('telephone', data.telephone);
            formData.append('email', data.email);
            formData.append('street', data.street);
            formData.append('city', data.city);
            formData.append('country', data.country);
            formData.append('zip', data.zip);
            formData.append('userName', data.userName);
            formData.append('password', data.password);
            formData.append('gender', "F");
            formData.append('selectedQualifications', data.selectedQualifications);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
             post(`${url}/candidate`, formData, config)
                 .then( ()=>{
                     dispatch(candidateSaveSuccess());
                }).catch( error =>{
                      dispatch(candidateSaveFailure(error));
             });


        };

    },
    getAppliedPositionsStatusForCandidate : function(candidateId){
        return (dispatch) => {
            dispatch(beginGetCandidateAppliedPositionStatus());
            axios.get(`${url}/candidate-feedback?id=`+ candidateId)
                .then((res) => {
                    /**
                     * Parsing data to this format
                     * Candidate (Last, First Name), Applied Position Title , Behavioural Status , Technical Status
                     */
                    let parsedData = [];
                        let lastFirstName =  res.data.lastName + ", " + res.data.firstName;
                        if(res.data.appliedPositions){

                            res.data.appliedPositions.map((appliedPosition , index) =>{

                                let positionTitle = appliedPosition.position.title
                                let interviewType = "";
                                let result = "";
                                let comment = "";
                                if(appliedPosition.interview){
                                    appliedPosition.interview.map(interview => {
                                        interviewType = interview.interviewType;
                                        comment = interview.comment;
                                        result = interview.passed ? "Passed" : "Failed";
                                        parsedData.push ({lastFirstName, positionTitle ,interviewType,result,comment });
                                    });
                                }

                            });
                    }
                    dispatch(getCandidateSuccessAppliedPositionStatus(parsedData));
                }).catch((err) => {
                dispatch(getCandidateFailureAppliedPositionStatus(err));
                console.log(err)
            })
        }
    },
    getCandidatesByPosition: function (data) {
        console.log("_>>>getting Candidates . . .");
        return (dispatch) => {
            dispatch(beginGetCandidates());
            axios.get(`${url}/candidates-position?id=` + data)
                .then((res) => {
                    dispatch(getCandidatesSuccess(res.data));
                }).catch((err) => {
                dispatch(getCandidatesFailure(err));
                console.log(err)
            })
        }
    },
    // getCandidatesByPositionStatus: function (data) {
    //     console.log("_>>>getting Candidates . . .");
    //     return (dispatch) => {
    //         dispatch(beginGetCandidates());
    //         axios.get(`${url}/candidates-position-Status?id=` + data)
    //             .then((res) => {
    //                 let parsedData = [];
    //                 let lastFirstName =  res.data.lastName + ", " + res.data.firstName;
    //                 if(res.data.appliedPositions){
    //
    //                     res.data.appliedPositions.map((appliedPosition , index) =>{
    //
    //                         if(appliedPosition.interview){
    //                             appliedPosition.interview.filter(interview => {
    //                                 interview.passed ===true
    //
    //                             });
    //                         }
    //
    //
    //                     });
    //                 }
    //                 dispatch(getCandidateSuccessAppliedPositionStatus(parsedData));
    //             }).catch((err) => {
    //             dispatch(getCandidateFailureAppliedPositionStatus(err));
    //             // console.log(err)
    //             //     dispatch(getCandidatesSuccess(res.data));
    //             // }).catch((err) => {
    //             // dispatch(getCandidatesFailure(err));
    //             // console.log(err)
    //         })
    //     }
    // },
    getById: function (data) {
        console.log("_>>>getting Candidates . . .");
        return (dispatch) => {
            dispatch(beginGetCandidates());
            console.log(data);
            axios.get(`${url}/candidate?id=` + data)
                .then((res) => {
                    dispatch(getCandidatesSuccess(res.data));
                }).catch((err) => {
                dispatch(getCandidatesFailure(err));
                console.log(err)
            })
        }
    },
    getResumeById: function (data) {
        console.log("_>>>getting Candidates . . .");
        return (dispatch) => {
            dispatch(beginGetCandidates());
            console.log(data.data);
            axios(`${url}/candidateResumeById?id=` + data, {method:'GET', responseType : 'blob'})
                .then((res) => {
                    const file = new Blob( [res.data],{type: 'application/pdf'});
                    const fileURL = URL.createObjectURL(file);
                    dispatch(loadCandidateResumeSuccess(fileURL));


                }).catch((err) => {
                dispatch(getCandidatesFailure(err));
                console.log(err)
            })
        }
    },


     applyForPosition: function (data) {
            console.log("_>>>updating  Candidates . . .",data);
            return (dispatch) => {
                dispatch(beginGetCandidates());
                axios.put(`${url}/apply`, data)
                    .then((res) => {
                        dispatch(getCandidatesSuccess(res.data));
                    }).catch((err) => {
                    dispatch(getCandidatesFailure(err));
                    console.log(err)
                })
            }
        },

    feedbackForApplyedPosition: function (data) {
        console.log("_>>>updating  Candidates . . .",data);
        return (dispatch) => {
            dispatch(beginGetCandidates());
                axios.put(`${url}/addfeedback`, data)
                .then((res) => {
                    dispatch(getCandidatesSuccess(res.data));
                }).catch((err) => {
                dispatch(getCandidatesFailure(err));
                console.log(err)
            })
        }
    }

}
function beginGetCandidates (){ return { type: types.BEGIN_GET_CANDIDATE } }


function loadCandidateResumeSuccess (candidateResume){
    console.log("Resume",candidateResume)
    return {
        type : types.GET_CANDIDATE_RESUME_SUCCESS,
        candidateResume :candidateResume
    }
}

function getCandidatesSuccess (candidates){
    return {
        type : types.GET_CANDIDATE_SUCCESS,
        candidates :candidates
    }
}


function getCandidatesFailure (errMsg){
    return {
        type: types.GET_CANDIDATE_FAILURE,
        errMsg
    }
}


function beginCandidateSave (){
    return {
        type : types.CANDIDATE_SAVE_BEGIN
    }
}

function candidateSaveSuccess (){
    return {
        type : types.CANDIDATE_SAVE_SUCCESS
    }
}


function candidateSaveFailure (errMsg){
    return {
        type: types.CANDIDATE_SAVE_FAILURE,
        errMsg
    }
}


function beginGetCandidateAppliedPositionStatus (){ return { type: types.BEGIN_GET_CANDIDATE_APPLIED_POSITION_STATUS } }

function getCandidateSuccessAppliedPositionStatus (candidateAppliedPositionStatus){
    return {
        type : types.GET_CANDIDATE_SUCCESS_APPLIED_POSITION_STATUS,
        candidateAppliedPositionStatus :candidateAppliedPositionStatus
    }
}


function getCandidateFailureAppliedPositionStatus (errMsg){
    return {
        type: types.GET_CANDIDATE_FAILURE_APPLIED_POSITION_STATUS,
        errMsg
    }
}


/**
 * Get Candidate Ends <<
 */
