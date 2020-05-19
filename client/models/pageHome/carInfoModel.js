/*
 * @Author: wangziqi
 * @Date: 2020-05-17 20:36:58
 * @LastEditTime: 2020-05-17 21:47:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-template-easily/client/models/pageHome/carListModel.js
 */
import { setDefaultCarData } from '../../api/home'

export default {
    namespace: 'carInfo',
    state: {
        topBanHeight: 0,
        navFixed: false
    },
    effects: {
        *getTopBanHeight({ payload }, { call, put }) {
            yield put({ type: 'setTopBanHeight', payload: payload })
        },
        *getNavFixed({ payload }, { call, put, select }) {
            const flag = yield select((state) => state.carInfo.navFixed)
            if (payload !== flag) {
                console.log('change')
                yield put({ type: 'setNavFixed', payload: payload })
            }
        }
    },
    reducers: {
        setTopBanHeight(state, { payload }) {
            return {
                ...state,
                topBanHeight: payload
            }
        },
        setNavFixed(state, { payload }) {
            return {
                ...state,
                navFixed: payload
            }
        }
    }
}
