/** */
import axios, { post } from 'axios';
import * as types from './actionType';

//This will be evaluated to const url = "http://localhost:5000/api/" for dev environment
const url = process.env.NODE_ENV === 'production' ? "/hp-api/" : "http://localhost:5000/hp-api";
/**
 * Get CURRENT User Begin >>
 * @returns {function(*)}
 */
export default {
    getCurrentUser: function () {
        console.log("_>>>getting CURRENT User . . .");
        return (dispatch) => {
            dispatch(beginGetCurrentUser());
            axios.get(`${url}/currentUser`)
                .then((res) => {
                    dispatch(getCurrentUserSuccess(res.data));
                }).catch((err) => {
                dispatch(getCurrentUserFailure(err));
                console.log(err)
            })
        }
    }

}
function beginGetCurrentUser (){ return { type: types.BEGIN_GET_CURRENT_USER } }

function getCurrentUserSuccess (currentUser){
    return {
        type : types.GET_CURRENT_USER_SUCCESS,
        currentUser :currentUser
    }
}

function getCurrentUserFailure (errMsg){
    return {
        type: types.GET_CURRENT_USER_FAILURE,
        errMsg
    }
}

/**
 * Get CURRENT User  Ends <<
 */
