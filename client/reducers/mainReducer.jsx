/**
 * @file mainReducer.jsx
 * @desc main Reducer
 * @author wangziqi
 * @data 2017/05/25
 */
import { combineReducers } from 'redux-immutable'
import { reducer as pageHomeReducer } from './pageHomeRereducer'

const mainReducer = combineReducers({
    pageHomeReducer
})

export default mainReducer
