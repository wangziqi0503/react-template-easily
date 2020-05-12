/**
 * @file pageHomeAction.jsx
 * @desc 首页action
 * @author wangziqi
 * @data 2017/08/23
 * @update 2017/11/09
 */

import Const from '../../common/constant/Constant'
import Service from '../../service/Service'
import { GET_ALL_DATA, GET_CAR_LIST } from './pageHomeActionType'

const carInfo = {
    carUserModelId: 29857031,
    modelId: 65105,
    typeIds: '',
    mileages: 0,
    lng: 39.907687,
    lat: 116.397625,
    provinceCode: 1,
    cityCode: 2810,
    areaCode: 51081
}

class PageHomeAction extends Object {
    static getAllData() {
        return (dispatch) => {
            Service.jsonp(Const.requestUrl.allData, carInfo)
                .then((result) => {
                    if (result) {
                        dispatch(PageHomeAction.getHomeData(result.data))
                    }
                })
                .catch((err) => {
                    console.log('err==', err)
                })
        }
    }
    static getCarList() {
        return (dispatch) => {
            Service.jsonp(Const.requestUrl.carList, {})
                .then((result) => {
                    if (result) {
                        dispatch(PageHomeAction.getCarListData(result.data))
                    }
                })
                .then(() => {
                    PageHomeAction.getAllData()
                })
                .catch((err) => {
                    console.log('err==', err)
                })
        }
    }
    static getHomeData(data) {
        return {
            type: GET_ALL_DATA,
            allData: data
        }
    }
    static getCarListData(data) {
        return {
            type: GET_CAR_LIST,
            carList: data
        }
    }
}

export default PageHomeAction
