/*
 * @Author: wangziqi
 * @Date: 2020-05-16 17:01:43
 * @LastEditTime: 2020-05-17 19:51:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-template-easily/client/api/home.js
 */

import Service from '../service/Service'
import Const from '../common/constant/Constant'

export function getCarList() {
    return Service.jsonp(Const.requestUrl.carList, {})
}

export function getAllData(info) {
    return Service.jsonp(Const.requestUrl.allData, info)
}

export function getAddress() {
    return Service.jsonp(Const.requestUrl.address, {})
}

export function setDefaultCarData(data) {
    return Service.jsonp(Const.requestUrl.setDefaultCarData, data)
}
