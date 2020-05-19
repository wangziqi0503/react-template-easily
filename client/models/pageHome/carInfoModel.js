/*
 * @Author: wangziqi
 * @Date: 2020-05-17 20:36:58
 * @LastEditTime: 2020-05-19 21:43:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-template-easily/client/models/pageHome/carListModel.js
 */
import { setDefaultCarData } from '../../api/home'

export default {
    namespace: 'carInfo',
    state: {
        topBanHeight: 0
    },
    effects: {
        *getTopBanHeight({ payload }, { call, put }) {
            yield put({ type: 'setTopBanHeight', payload: payload })
        }
    },
    reducers: {
        setTopBanHeight(state, { payload }) {
            return {
                ...state,
                topBanHeight: payload
            }
        }
    }
}
