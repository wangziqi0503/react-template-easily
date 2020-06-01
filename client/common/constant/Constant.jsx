/**
 * @file Constant.jsx
 * @desc 常量
 * @author wangziqi
 * @data 2017/07/31
 */
import Service from '../../service/Service.jsx'
import { setDefaultCar } from '../../api/home.js'

const Const = {}
Const.DEBUG = process.env.NODE_ENV === 'dev'

// 开发机环境
if (process.env.NODE_ENV === 'dev') {
    Const.server = 'https://cargw.jd.com'
}
// QA环境
else if (process.env.NODE_ENV === 'test') {
    Const.server = ''
}
// 线上环境
else {
    Const.server = ''
}

// 内部版本更新时间
Const.internalVersion = '2017-11-09'

/** open API* */

// na和url参数
Const.nativeInfo = {}
// 打点参数
Const.statisticalInfo = {}

Const.requestUrl = {
    allData: '/mClient/maintenance/self-maintenanceUpdate',
    carList: '/mClient/userCar/listCars4bc',
    address: `/mClient?functionId=addressOperate&body={"operate":"15"}&client=m&uuid='${new Date().valueOf()}`,
    setDefaultCarData: '/mClient',
    discountAndFreeData: '/mClient/maintenance/discountAndFree',
    getOspPublishData: '/mClient/maintenance/ospPublish',
    getSkuData: '/mClient/sku/search',
    getShaiXuanData: '/mClient/sku/agg'
}

export default Const
