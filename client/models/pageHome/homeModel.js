/*
 * @Author: wangziqi
 * @Date: 2020-05-16 17:01:43
 * @LastEditTime: 2020-05-24 12:57:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-template-easily/client/models/pageHome/model.js
 */

// import { routerRedux } from 'dva/router'
import { getCarList, getAllData, getAddress, setDefaultCarData } from '../../api/home'
import { setUserAddress } from '@/common/utils/Common'
import { fromJS } from 'immutable'
export default {
    namespace: 'homeInfo',
    state: {
        mainData: [], // 用户地址信息
        carList: [], // 车辆列表
        allData: [], // sku商品数据
        defaultCar: [], // 当前展示车辆信息
        carListStatus: false // 控制车辆列表展示隐藏开关
    },
    effects: {
        *getAddress({ url }, { call, put }) {
            const res = yield call(getAddress)
            // 获取调用sku接口所需参数
            const mainData = setUserAddress(res)
            yield put({ type: 'saveMainData', payload: mainData })
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
                const mainData = Object.assign(payload.mainData, { carUserModelId: id, modelId, mileage })

                // 获取车辆sku信息
                yield put({ type: 'getAllData', payload: mainData })
            }
        },
        *getAllData({ payload }, { call, put }) {
            const res = yield call(getAllData, payload)
            yield put({ type: 'saveAllData', payload: res.data.classifiedMainItems })
        },
        *resetAllData({ payload, callback }, { call, put }) {
            yield put({ type: 'saveAllData', payload: payload })
            if (callback && typeof callback === 'function') {
                callback()
            }
        },
        *getCarListStatus({ status, callback }, { call, put }) {
            yield put({ type: 'setCarList', payload: { status: status } })
            // if (callback && typeof callback === 'function') {
            //     console.log('1111')
            // } else {
            //     console.log('ca', callback)
            // }
        },
        *setDefaultCarData({ payload }, { call, put }) {
            const res = yield call(setDefaultCarData, payload)
        }
    },
    reducers: {
        // 保存用户地址信息
        saveMainData(state, { payload }) {
            return {
                ...state,
                mainData: payload
            }
        },
        // 保存车辆列表信息
        saveCarList(state, { payload }) {
            return {
                ...state,
                carList: payload.data
            }
        },
        // 设置展示车辆信息
        saveDefaultCar(state, { payload }) {
            return {
                ...state,
                defaultCar: fromJS(payload)
            }
        },
        // 保存当前车辆sku信息
        saveAllData(state, { payload, callback }) {
            console.log('in model')
            return {
                ...state,
                allData: fromJS(payload),
                callback: () => {}
            }
        },
        // 更新车辆列表展示隐藏状态
        setCarList(state, { payload }) {
            return {
                ...state,
                carListStatus: payload.status
            }
        }
    }
}
