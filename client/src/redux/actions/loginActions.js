/** */
import axios from 'axios';
import * as types from './actionType';

//This will be evaluated to const url = "http://localhost:5000/api/" for dev environment
const url = process.env.NODE_ENV === 'production' ? "/hp-api/" : "http://localhost:5000/hp-api";
/**
 *  Logging In Begins >>
 * @returns {function(*)}
 */

export default {

    login:function(data) {
        const {userName , password} = data;
        return (dispatch)=>{
            dispatch(beginLoggingIn());
            axios(`${url}/login`, {
                                    data : { userName , password } ,
                                    withCredentials: true,
                                    method: "post"
            })
            .then((result)=>{
                console.log(result);
                dispatch(loggingInSuccess(result.data));
            }).catch((err)=>{
                dispatch(loggingInFailure(err));
            });
        }

    },

    getCurrentUser: function () {
        return (dispatch) => {
            dispatch(beginGetCurrentUser());
            axios(`${url}/currentUser`, {
                method : "get",
                withCredentials: true

            })
                .then((res) => {
                    dispatch(getCurrentUserSuccess(res.data));
                }).catch((err) => {
                dispatch(getCurrentUserFailure(err));
                console.log(err)
            })
        }
    },
    logout: function () {
        return (dispatch) => {
            axios(`${url}/logout`, {
                method : "get",
                withCredentials: true

            })
                .then(() => {
                    dispatch(logoutCurrentUser({ type  : "NA",firstName : "NA", lastName : "NA"} ));
                }).catch((err) => {
                console.log(err)
            })
        }
    }

}
function logoutCurrentUser(userInfo){return { type : types.LOGOUT_CURRENT_USER,userInfo }}
function beginLoggingIn (){ return { type : types.BEGIN_LOGGING_IN } }
function loggingInSuccess(userInfo) { return { type : types.LOGGING_IN_SUCCESS , userInfo } }
function loggingInFailure (errMsg){
    return {
        type: types.LOGGING_IN_FAILURE,
        errMsg
    }
}

function beginGetCurrentUser (){ return { type: types.BEGIN_GET_CURRENT_USER } }
function getCurrentUserSuccess (userInfo){
    return {
        type : types.GET_CURRENT_USER_SUCCESS,
        userInfo :userInfo
    }
}
function getCurrentUserFailure (errMsg){
    return {
        type: types.GET_CURRENT_USER_FAILURE,
        errMsg
    }
}

/**
 * Logging In Ends <<
 */
