import Service from '../service/Service'
import Const from '../common/constant/Constant'

export function getCarList() {
    return Service.jsonp(Const.requestUrl.carList, {})
}
