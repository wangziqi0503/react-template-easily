/**
 * @file pageHomeAction.jsx
 * @desc 首页action
 * @author wangziqi
 * @data 2017/08/23
 * @update 2017/11/09
 */

import commonActionName from '../common/constant/CommonActionName.jsx'
import Const from '../common/constant/Constant.jsx'
import Service from '../service/Service.jsx'
import { GET_ALL_DATA, UPDATE_ALL_DATA } from '../actionType/pageHomeActionType'

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
    /**
     * Demo
     */

    static getAlltData() {
        console.log('执行了')
        return (dispatch) => {
            Service.jsonp(Const.requestUrl.allData, carInfo)
                .then((result) => {
                    if (result) {
                        console.log('result==', result)
                        dispatch(PageHomeAction.updateTestData(result.data))
                    }
                })
                .catch((err) => {
                    console.log('err==', err)
                })
        }
    }
    static updateTestData(data) {
        return {
            type: GET_ALL_DATA,
            allData: data
        }
    }
}

export default PageHomeAction
