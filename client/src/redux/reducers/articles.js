import * as actions from '../actions/actionType';
const initialState = {
    articles: []
}
export default (state=initialState, action) => {
    switch (action.type) {
        case actions.GET_ARTICLES :
            return {...state,articles: action.articles};
        default:
            return state
    }
}