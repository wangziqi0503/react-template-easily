/*
 * @Author: wangziqi
 * @Date: 2020-05-16 17:01:43
 * @LastEditTime: 2020-06-06 23:16:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-template-easily/client/api/home.js
 */

import Service from '../service/Service'
import Const from '../common/constant/Constant'

// 获取车列表接口
export function getCarList() {
    return Service.jsonp(Const.requestUrl.carList, {})
}

// 获取全部sku数据接口
export function getAllData(info) {
    return Service.jsonp(Const.requestUrl.allData, info)
}

// 获取用户地址信息接口
export function getAddress() {
    return Service.jsonp(Const.requestUrl.address, {})
}

// 设置默认车辆接口
export function setDefaultCarData(data) {
    return Service.jsonp(Const.requestUrl.setDefaultCarData, data)
}

// 获取满减信息接口
export function getDiscountAndFree(data) {
    return Service.jsonp(Const.requestUrl.discountAndFreeData, data)
}

// 获取sku中是否有服务市场
export function getOspPublish(data) {
    return Service.jsonp(Const.requestUrl.getOspPublishData, data)
}

// 获取车品列表
export function getSkuData(data) {
    return Service.jsonp(Const.requestUrl.getSkuData, data)
}

// 更换商品的筛选列表拉取
export function getShaiXuanData(data) {
    return Service.jsonp(Const.requestUrl.getShaiXuanData, data)
}

// 查询实时价格
export const querySkuPrice = (skuArr, callback) => {
    return Service.jsonp('//pm.3.cn/prices/mgets', {
        skuids: skuArr.join(','),
        source: 'jdcar',
        origin: 2
    })
}

//更换商品时sku补全接口
export const getSkuMakeUp = (data) => {
    return Service.jsonp(Const.requestUrl.skuMakeUp, data)
}
