/** */
import axios from 'axios';
import * as actions from './actionType';

//This will be evaluated to const url = "http://localhost:5000/api/" for dev environment
const url = process.env.NODE_ENV === 'production' ? "/hp-api/" : "http://localhost:5000/hp-api/";

export function getArticles () {
    console.log("_>>>getting Articles . . .");
    return (dispatch) => {
        axios.get(`${url}articles`)
        .then((res) => {
            dispatch({type: actions.GET_ARTICLES, articles : res.data})
        }).catch((err) => {
            console.log(err)
        })
    }
}



