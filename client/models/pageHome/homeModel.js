/*
 * @Author: wangziqi
 * @Date: 2020-05-16 17:01:43
 * @LastEditTime: 2020-05-17 19:54:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-template-easily/client/models/pageHome/model.js
 */

import { routerRedux } from 'dva/router'
import { getCarList, getAllData, getAddress, setDefaultCarData } from '../../api/home'
const { setUserAddress } = window.common
export default {
    namespace: 'homeInfo',
    state: {
        carList: [],
        allData: [],
        defaultCar: [],
        carListStatus: false
    },
    effects: {
        *getAddress({ url }, { call, put }) {
            const res = yield call(getAddress)
            // 获取调用sku接口所需参数
            const mainData = setUserAddress(res)
            yield put({ type: 'getCarList', payload: { url, mainData } })
        },
        *getCarList({ payload }, { call, put }) {
            // 存储车辆列表信息
            const res = yield call(getCarList)
            yield put({ type: 'saveCarList', payload: res })

            // 判断地址栏是否携带车辆信息，渲染当前车辆sku信息
            if (payload.url) {
                yield put({ type: 'saveDefaultCar', payload: payload.url })
            } else {
                let carData = {}
                res.data.forEach((item) => {
                    if (item.defaultCar === 1) {
                        carData = item
                    }
                })
                yield put({ type: 'saveDefaultCar', payload: carData })

                // 根据车辆信息，补全情况sku接口所需参数
                const { id, modelId, mileage } = carData
                const mainData = Object.assign(payload.mainData, { id, modelId, mileage })

                // 获取车辆sku信息
                yield put({ type: 'getAllData', payload: mainData })
            }
        },
        *getAllData({ payload }, { call, put }) {
            const res = yield call(getAllData, payload)
            yield put({ type: 'saveAllData', payload: res })
        },
        *getCarListStatus({ status, callback }, { call, put }) {
            yield put({ type: 'setCarList', payload: { status: status } })
            if (callback && typeof callback === 'function') {
                callback(status)
            }
        },
        *setDefaultCarData({ payload }, { call, put }) {
            console.log('payload', payload)
            const res = yield call(setDefaultCarData, payload)
        }
    },
    reducers: {
        saveCarList(state, { payload }) {
            return {
                ...state,
                carList: payload.data
            }
        },
        saveDefaultCar(state, { payload }) {
            return {
                ...state,
                defaultCar: payload
            }
        },
        saveAllData(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        setCarList(state, { payload }) {
            return {
                ...state,
                carListStatus: payload.status
            }
        }
    }
}
