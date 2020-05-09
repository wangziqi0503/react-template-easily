/**
 * @file mainReducer.jsx
 * @desc main Reducer
 * @author wangziqi
 * @data 2017/05/25
 */
import * as Redux from 'redux';
import commonReducer from './commonReducer.jsx';
import pageHomeReducer from './pageHomeReducer.jsx';

const { combineReducers } = Redux;

const mainReducer = combineReducers({
  commonReducer,
  pageHomeReducer,
});

export default mainReducer;
