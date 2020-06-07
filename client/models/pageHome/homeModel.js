/*
 * @Author: wangziqi
 * @Date: 2020-05-16 17:01:43
 * @LastEditTime: 2020-05-24 23:29:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-template-easily/client/models/pageHome/model.js
 */

// import { routerRedux } from 'dva/router'
import {
    getCarList,
    getAllData,
    getAddress,
    setDefaultCarData,
    getDiscountAndFree,
    getOspPublish
} from '../../api/home'
import { setUserAddress, getSkuArr, isNotEmpty, filterPrice, updatePrice } from '@/common/utils/Common'
import { querySkuPrice } from '@/api/home'
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
                const mainData = Object.assign(payload.mainData, {
                    carUserModelId: id,
                    modelId,
                    mileages: mileage ? mileage : ''
                })

                // 获取车辆sku信息
                yield put({ type: 'getAllData', payload: mainData })
            }
        },
        *getAllData({ payload }, { call, put, select }) {
            const res = yield call(getAllData, payload)
            yield put({ type: 'saveAllData', payload: res.data.classifiedMainItems })
            let allData = yield select((state) => state.homeInfo.allData)
            allData = allData.size > 0 ? allData.toJS() : []
            let maintenanceItemTotalList = []
            let maintenanceItemList = []
            let priceArr = []
            let newAllData = []
            allData.forEach((item) => {
                maintenanceItemTotalList.push(...item.maintenanceItemInstances)
            })
            maintenanceItemTotalList.forEach((element) => {
                // 获取保养项目中服务的id数组
                if (!element.serviceMaintenance) {
                    // 判断是否保养项目中只有服务的项目
                    maintenanceItemList.push(element)
                }
            })
            if (maintenanceItemList.length > 0) {
                const skuArr = getSkuArr(maintenanceItemList, [])
                // 查询实时价格，并替换保养项目中的车品价格
                if (isNotEmpty(skuArr)) {
                    const res = yield call(querySkuPrice, skuArr)
                    if (res && res.length > 0) {
                        let retArr = []
                        if (res != null && res.length > 0) {
                            retArr = res
                        }
                        filterPrice ? filterPrice(retArr) : ''
                        priceArr = retArr
                        newAllData = updatePrice(allData, priceArr)
                        yield put({ type: 'saveAllData', payload: newAllData })
                    }
                }
            }
        },
        *resetAllData({ payload, callback }, { call, put }) {
            yield put({ type: 'saveAllData', payload: payload })
            if (callback && typeof callback === 'function') {
                callback()
            }
        },
        *getPrice({ payload }, { call, put }) {
            const res = yield call(querySkuPrice, payload)
        },
        *getCarListStatus({ status, callback }, { call, put }) {
            yield put({ type: 'setCarList', payload: { status: status } })
        },
        *setDefaultCarData({ payload }, { call, put }) {
            const res = yield call(setDefaultCarData, payload)
        },
        *getDiscount({ payload, callback }, { call, put }) {
            const res = yield call(getDiscountAndFree, payload)
            if (callback && typeof callback === 'function') {
                callback(res)
            }
        },
        *getOspPublish({ payload }, { call, put }) {
            yield call(getOspPublish)
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
            payload.defaultCar = 1
            return {
                ...state,
                defaultCar: fromJS(payload)
            }
        },
        // 保存当前全部sku信息
        saveAllData(state, { payload, callback }) {
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
