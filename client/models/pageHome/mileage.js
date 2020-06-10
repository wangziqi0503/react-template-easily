/*
 * @Author: your name
 * @Date: 2020-06-10 22:57:57
 * @LastEditTime: 2020-06-10 23:53:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-template-easily/client/models/pageHome/mileage.js
 */

import { setMileage } from '../../api/home'

export default {
    namespace: 'mileage',
    state: {
        isShow: false
    },
    effects: {
        *getMileage({ payload, callback }, { call }) {
            yield call(setMileage, payload)
            if (callback && typeof callback === 'function') {
                callback()
            }
        }
    },
    reducers: {
        setMileageStatus(state, { payload }) {
            return {
                ...state,
                isShow: payload
            }
        }
        // setMileage(state, {payload}){
        //     return {
        //         ...state,

        //     }
        // }
    }
}
