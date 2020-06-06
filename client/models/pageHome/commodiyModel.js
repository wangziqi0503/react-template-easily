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
        commodityPageIndex: 0,
        loadStatus: false,
        isAll: false,
        commodiyStatus: false
    },
    effects: {
        *getSkuData({ payload, isMore }, { call, put, select }) {
            const flag = yield select((state) => state.commodiy.loadStatus)
            const isAll = yield select((state) => state.commodiy.isAll)
            if (!flag && !isAll) {
                console.log('------------------------')
                let pageIndex = yield select((state) => state.commodiy.commodityPageIndex)
                let pageSize = 20
                yield put({ type: 'setLoadStatus', payload: true })
                yield put({ type: 'setPage', payload: ++pageIndex })
                payload.page = pageIndex // 获取页码数
                const res = yield call(getSkuData, payload)
                let newArr = []
                // 是否是加载更多
                if (isMore) {
                    let skuData = yield select((state) => state.commodiy.skuData)
                    newArr = skuData.toJS().concat(res.data.data)
                } else {
                    newArr = res.data.data
                }
                yield put({ type: 'setSkuData', payload: newArr })
                yield put({ type: 'setLoadStatus', payload: false })

                // 判断数据是否已经全部加载
                if (res.data.totalCount <= pageIndex * pageSize) {
                    yield put({ type: 'setIsAll', payload: true })
                }
            }
        }
    },
    reducers: {
        // 设置导航
        setShowTag(state, { payload }) {
            return {
                ...state,
                showTag: payload
            }
        },
        // 设置当前展示数据
        setSkuData(state, { payload }) {
            console.log('payload', payload)
            return {
                ...state,
                skuData: fromJS(payload)
            }
        },
        // 展示隐藏当前模块
        setStatus(state, { payload }) {
            return {
                ...state,
                commodiyStatus: payload
            }
        },
        // 设置当前页码数
        setPage(state, { payload }) {
            return {
                ...state,
                commodityPageIndex: payload
            }
        },
        // 设置当前是否可以加载新数据开关
        setLoadStatus(state, { payload }) {
            return {
                ...state,
                loadStatus: payload
            }
        },
        // 设置加载完全部数据开关状态
        setIsAll(state, { payload }) {
            return {
                ...state,
                isAll: payload
            }
        }
    }
}
