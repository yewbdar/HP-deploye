/** */
import axios from 'axios';
import * as types from './actionType';


//This will be evaluated to const url = "http://localhost:5000/api/" for dev environment
const url = process.env.NODE_ENV === 'production' ? "/hp-api/" : "http://localhost:5000/hp-api";
/**
 * Get position Begin >>
 * @returns {function(*)}
 */

export default {
    // getFeedBack: function() {
    //     console.log("_>>>getting position . . .");
    //     return (dispatch) => {
    //         dispatch(beginGetposition());
    //         axios.get(`${url}/position`)
    //             .then((res) => {
    //                 dispatch(getpositionSuccess(res.data));
    //             }).catch((err) => {
    //             dispatch(getpositionFailure(err));
    //             console.log(err)
    //         })
    //     }
    // },
    postProfile:function(data) {
        console.log(data);
        console.log("_>>>posting candidate . . .");
        // return (dispatch)=>{
        //     dispatch(beginPostposition());
        axios.post(`${url}/candidate-save`, data)
        // .then((res)=>{
        // dispatch(postpositionSuccess(res.data))
        //  console.log("saved data");
        // }).catch((err)=>{postpositionFailure(err)
        //     console.log(err);
        // });
        // }

    }

}

function beginPostposition (){
    console.log("beginPostPosition")
    return { type: types.BEGIN_POST_POSITION } }
function postPositionSuccess(position) {
    return {
        type : types.POST_POSITION_SUCCESS,
        position :position
    }
}
function postPositionFailure (errMsg){
    return {
        type: types.POST_POSITION_FAILURE,
        errMsg
    }
}
function beginGetPosition (){ return { type: types.BEGIN_GET_POSITION } }

function getPositionSuccess (position){
    return {
        type : types.GET_POSITION_SUCCESS,
        position :position
    }
}


function getPositionFailure (errMsg){
    return {
        type: types.GET_POSITION_FAILURE,
        errMsg
    }
}
/**
 * Get position Ends <<
 */
