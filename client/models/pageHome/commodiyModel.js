/*
 * @Author: wangziqi
 * @Date: 2020-05-17 20:36:58
 * @LastEditTime: 2020-05-25 22:54:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-template-easily/client/models/pageHome/carListModel.js
 */
import { setDefaultCarData, getSkuData } from '../../api/home'
import { fromJS } from 'immutable'
export default {
    namespace: 'commodiy',
    state: {
        showTag: [
            {
                name: '综合',
                tag: true
            },
            {
                name: '销量',
                tag: false
            },
            {
                name: '价格',
                tag: false,
                sort: 0
            },
            {
                name: '筛选',
                tag: false,
                sort: 0
            }
        ],
        skuData: [],
        filterData: [],
        commodityPageIndex: 1,
        loadStatus: true,
        commodiyStatus: false
    },
    effects: {
        *getSkuData({ payload, isMore }, { call, put, select }) {
            console.log('payload', payload)
            const flag = yield select((state) => state.commodiy.loadStatus)
            if (flag) {
                yield put({ type: 'setLoadStatus', payload: false })
                const res = yield call(getSkuData, payload)
                let newArr = []
                if (isMore) {
                    let skuData = yield select((state) => state.commodiy.skuData)
                    // newArr = skuData.toJS()
                    newArr = skuData.toJS().concat(res.data.data)
                } else {
                    newArr = res.data.data
                }
                yield put({ type: 'setSkuData', payload: newArr })
                yield put({ type: 'setLoadStatus', payload: true })
            }
        }
    },
    reducers: {
        setShowTag(state, { payload }) {
            return {
                ...state,
                showTag: payload
            }
        },
        setSkuData(state, { payload }) {
            return {
                ...state,
                skuData: fromJS(payload)
            }
        },
        concatSkuData(state, { payload }) {
            return {
                ...state,
                skuData: payload
            }
        },
        setStatus(state, { payload }) {
            return {
                ...state,
                commodiyStatus: payload
            }
        },
        setPage(state, { payload }) {
            console.log('payload', payload)
            return {
                ...state,
                commodityPageIndex: payload
            }
        },
        setLoadStatus(state, { payload }) {
            return {
                ...state,
                loadStatus: payload
            }
        }
    }
}
