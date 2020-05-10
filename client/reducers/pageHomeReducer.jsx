import { GET_ALL_DATA, UPDATE_ALL_DATA } from '../actionType/pageHomeActionType'

/**
 * @file pageHomeReducer.jsx
 * @author wangziqi
 * @data 2017/08/31
 * @update 2017/09/25
 */
const pageHomeInitialState = {}

const pageHomeReducer = (state = pageHomeInitialState, action) => {
    switch (action.type) {
        case GET_ALL_DATA:
            return action.data
        default:
            return state
    }
}

export default pageHomeReducer
