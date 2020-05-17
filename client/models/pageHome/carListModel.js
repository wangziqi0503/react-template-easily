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
    namespace: 'carList',
    state: {},
    effects: {
        *setDefaultCarData({ payload }, { call, put }) {
            console.log('payload', payload)
            const res = yield call(setDefaultCarData, payload.reqData)
            if (res.code === '-1') {
                yield put({ type: 'homeInfo/setCarList', payload: { status: false } })
                yield put({ type: 'homeInfo/saveDefaultCar', payload: payload.item })
                // 根据车辆信息，补全情况sku接口所需参数
                const { id, modelId, mileage } = payload.item
                const mainData = Object.assign(payload.mainData, { id, modelId, mileage })
                // 获取车辆sku信息
                yield put({ type: 'homeInfo/getAllData', payload: mainData })
            }
        }
    },
    reducers: {}
}
