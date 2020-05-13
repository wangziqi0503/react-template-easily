/**
 * @file pageHomeReducer.jsx
 * @author wangziqi
 * @data 2017/08/31
 * @update 2017/09/25
 */

import { fromJS } from 'immutable'
import { GET_ALL_DATA, GET_CAR_LIST, GET_DEFAULT_CAR, SET_URL_PARMAS } from './pageHomeActionType.js'

const pageHomeInitialState = fromJS({
    allData: [],
    carList: [],
    defaultCar: {},
    urlParmas: {}
})

export default (state = pageHomeInitialState, action) => {
    switch (action.type) {
        case GET_ALL_DATA:
            return state.set('allData', action.allData)
        case GET_CAR_LIST:
            return state.set('carList', action.carList)
        case GET_DEFAULT_CAR:
            return state.set('defaultCar', action.defaultCar)
        case SET_URL_PARMAS:
            return state.set('urlParmas', action.urlParmas)
        default:
            return state
    }
}
