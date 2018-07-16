import { combineReducers } from 'redux';
import articles from './reducers/articles';
import authUser from './reducers/authUser';
import common from './reducers/common';
import candidateReduicer from './reducers/candidateReduicer';
import positionReduicer from './reducers/positionReduicer';
import qualificationReduicer from './reducers/qualficationReduicer';
import feedBackReduicer from './reducers/feedBackReduicer';
import currentUserReducer from './reducers/currentUserReducer'
import { routerReducer } from 'react-router-redux';
import loginReduicer from './reducers/loginReducer';

export default combineReducers({
  articles,
  authUser,
  common,
  candidateReduicer,
  positionReduicer,
  qualificationReduicer,
  feedBackReduicer,
  currentUserReducer,
  loginReduicer,

  router: routerReducer
});
