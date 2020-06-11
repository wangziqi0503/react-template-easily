/*
 * @Author: your name
 * @Date: 2020-06-10 22:57:57
 * @LastEditTime: 2020-06-10 23:53:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-template-easily/client/models/pageHome/mileage.js
 */

import { getOspPublish } from '@/api/home'

export default {
    namespace: 'settlement',
    state: {
        tipsBarState: {
            stateCode: 0,
            activeClass: ''
        }
    },
    effects: {
        *getOspPublish({ payload }, { call, put }) {
            const res = yield call(getOspPublish, payload)
            if (res.data == 0) {
                //未选择项目
                yield put({
                    type: 'setTipsBarState',
                    payload: {
                        stateCode: 2,
                        activeClass: 'tipBarDark'
                    }
                })
            } else if (res.data == 1) {
                yield put({
                    type: 'setTipsBarState',
                    payload: {
                        stateCode: 1,
                        activeClass: 'tipBar'
                    }
                })
            } else if (res.data == 2) {
                yield put({
                    type: 'setTipsBarState',
                    payload: {
                        stateCode: 0,
                        activeClass: ''
                    }
                })
            }
        }
    },
    reducers: {
        gettipsBarState(state, { payload }) {
            return {
                ...state,
                isShow: payload
            }
        },
        setTipsBarState(state, { payload }) {
            return {
                ...state,
                tipsBarState: payload
            }
        }
    }
}
