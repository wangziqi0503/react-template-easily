/*
 * @Author: your name
 * @Date: 2020-06-10 22:57:57
 * @LastEditTime: 2020-06-10 23:53:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-template-easily/client/models/pageHome/mileage.js
 */

import { getCouponList, getCarCoupon } from '../../api/home'
import { fromJS } from 'immutable'

export default {
    namespace: 'couponList',
    state: {
        couponStatus: false,
        skuCouponList: []
    },
    effects: {
        *getCouponList({ payload }, { call, put }) {
            const res = yield call(getCouponList, payload)
            yield put({ type: 'setCouponList', payload: res.data })
        },
        *getCarCoupon({ payload, callback }, { call }) {
            const res = yield call(getCarCoupon, payload)
            if (callback && typeof callback === 'function') {
                callback(res.data.result)
            }
        }
    },
    reducers: {
        setCouponList(state, { payload }) {
            return {
                ...state,
                skuCouponList: fromJS(payload)
            }
        },
        setCouponListStatus(state, { payload }) {
            return {
                ...state,
                couponStatus: payload
            }
        }
    }
}
