/*
 * @Author: wangziqi
 * @Date: 2020-05-16 17:01:43
 * @LastEditTime: 2020-06-10 23:40:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-template-easily/client/api/home.js
 */

import Service from '../service/Service'
import Const from '../common/constant/Constant'
import { isEmpty, isNotEmpty, getBasePath } from '../common/utils/Common'

// 获取车列表接口
export function getCarList() {
    return Service.jsonp(Const.requestUrl.carList, {})
}

// 获取全部sku数据接口
export function getAllData(info) {
    return Service.jsonp(Const.requestUrl.allData, info)
}

// 获取当前点击sku数据
export const getSkuItemData = (val) => {
    return Service.jsonp(Const.requestUrl.clickUnitSku, val)
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
    return Service.jsonp('https://pm.3.cn/prices/mgets', {
        skuids: skuArr.join(','),
        source: 'jdcar',
        origin: 2
    })
}

//更换商品时sku补全接口
export const getSkuMakeUp = (data) => {
    return Service.jsonp(Const.requestUrl.skuMakeUp, data)
}

//里程和上传时间接口
export const setMileage = (val) => {
    return Service.jsonp(Const.requestUrl.mileage, val)
}

//加入购物车
export const addSkusToShopcar = (options) => {
    let skus = options.skus
    if (isEmpty(skus)) {
        return
    }
    let newSkus = []
    for (let i = 0, l = skus.length; skus != null && i < l; i++) {
        let item = skus[i]
        newSkus.push({
            id: item.Id,
            num: item.num,
            lsid: isNotEmpty(item.lsid) ? item.lsid : '',
            packId: isNotEmpty(item.packId) ? item.packId : '',
            packMainSku: isNotEmpty(item.packMainSku) ? item.packMainSku : ''
        })
    }
    let json = JSON.stringify(newSkus)
    // let url = utils.getHost()+"?functionId=cartOperate&body={\"operate\":2,\"skus\":"+json+"}&uuid= + (new Date()).valueOf();
    let url =
        "https://cargw.jd.com/mClient/carCart/cart?functionId=cartOperate&body={'operate':2,'skus':" +
        json +
        ",'uniqueKey':\"" +
        options.uniqueKey +
        '"}&uuid=' +
        new Date().valueOf()
    Service.jsonp(url).then(
        function (res) {
            if (res.code == 0) {
                if (options.success) {
                    options.success(true)
                }
            } else {
                if (options.success) {
                    options.success(false)
                }
            }
        },
        function (error) {
            if (options.error) {
                options.error(error)
            }
        }
    )
}
