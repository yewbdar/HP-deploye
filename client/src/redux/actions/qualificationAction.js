/** */
import axios from 'axios';
import * as types from './actionType';


//This will be evaluated to const url = "http://localhost:5000/api/" for dev environment
const url = process.env.NODE_ENV === 'production' ? "/hp-api/" : "http://localhost:5000/hp-api";
/**
 * Get Position Begin >>
 * @returns {function(*)}
 */

export default {
    getQualification: function() {
        console.log("_>>>getting qualification . . .");
        return (dispatch) => {
            dispatch(beginGetQualification());
            axios.get(`${url}/qualification`)
                .then((res) => {
                    dispatch(getQualificationSuccess(res.data));
                }).catch((err) => {
                dispatch(getQualificationFailure(err));
                console.log(err)
            })
        }
    },
    postQualification:function(data) {
        console.log(data);
        console.log("_>>>posting qualification . . .");
        // return (dispatch)=>{
        //     dispatch(beginPostVacancy());
        axios.post(`${url}/qualification-save`, data)
        // .then((res)=>{
        // dispatch(postVacancySuccess(res.data))
        //  console.log("saved data");
        // }).catch((err)=>{postVacancyFailure(err)
        //     console.log(err);
        // });
        // }

    }
}
// function beginPostPosition (){
//     console.log("beginPostPosition")
//     return { type: types.BEGIN_POST_POSITION } }
// function postPositionSuccess(position) {
//     return {
//         type : types.POST_POSITION_SUCCESS,
//         position :position
//     }
// }
// function postPositionFailure (errMsg){
//     return {
//         type: types.POST_POSITION_FAILURE,
//         errMsg
//     }
// }
function beginGetQualification (){ return { type: types.BEGIN_GET_QUALIFICATION } }

function getQualificationSuccess (qualification){
    return {
        type : types.GET_QUALIFICATION_SUCCESS,
        qualification :qualification
    }
}


function getQualificationFailure (errMsg){
    return {
        type: types.GET_QUALIFICATION_FAILURE,
        errMsg
    }
}
/**
 * Get Position Ends <<
 */
