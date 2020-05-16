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
