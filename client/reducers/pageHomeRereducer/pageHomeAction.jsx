/**
 * @file pageHomeAction.jsx
 * @desc 首页action
 * @author wangziqi
 * @data 2017/08/23
 * @update 2017/11/09
 */

import Const from '../../common/constant/Constant'
import Service from '../../service/Service'
import { GET_ALL_DATA, GET_CAR_LIST, GET_DEFAULT_CAR, SET_URL_PARMAS } from './pageHomeActionType'
import { push } from 'react-router-redux'

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
    static getCarList(urlParmas) {
        return (dispatch) => {
            Service.jsonp(Const.requestUrl.carList, {})
                .then((result) => {
                    if (result) {
                        dispatch(PageHomeAction.getCarListData(result.data))
                        result.data.forEach((item) => {
                            if (item.defaultCar === 1) {
                                dispatch(PageHomeAction.getDefaultCar(item))
                                // 判断当前url是否存在车辆信息
                                const { fetchNAParams } = window.common
                                if (!urlParmas) {
                                    dispatch(PageHomeAction.setUrlParmas(item))
                                    dispatch(push({ pathname: '/home', query: item }))
                                } else {
                                    fetchNAParams(urlParmas).then((res) => {
                                        dispatch(PageHomeAction.setUrlParmas(res))
                                    })
                                }
                            }
                        })
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
    static getDefaultCar(data) {
        return {
            type: GET_DEFAULT_CAR,
            defaultCar: data
        }
    }
    static setUrlParmas(data) {
        return {
            type: SET_URL_PARMAS,
            urlParmas: data
        }
    }
}

export default PageHomeAction
