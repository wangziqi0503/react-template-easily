/**
 * @file pageHomeReducer.jsx
 * @author wangziqi
 * @data 2017/08/31
 * @update 2017/09/25
 */

import { fromJS } from 'immutable'
import { GET_ALL_DATA, GET_CAR_LIST } from './pageHomeActionType.js'

const pageHomeInitialState = fromJS({
    allData: [],
    carList: []
})

export default (state = pageHomeInitialState, action) => {
    switch (action.type) {
        case GET_ALL_DATA:
            return state.set('allData', action.allData)
        case GET_CAR_LIST:
            return state.set('carList', action.carList)
        default:
            return state
    }
}
