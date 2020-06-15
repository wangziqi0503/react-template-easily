import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addSkusToShopcar } from '@/api/home'
import Toast from '@/components/Toast/Toast'
import {
    counttotalPrice,
    getMantainArr,
    isHaveShop,
    getCookie,
    isIPhoneXSMax,
    filterArr,
    goJdCart
} from '@/common/utils/Common'
import './settlement.scss'

const Settlement = React.memo(() => {
    const dispatch = useDispatch()
    let [skuAllArr, setSkuAllArr] = useState([])
    let skuServerList = []
    let skuData = {}
    let allData = useSelector((state) => state.homeInfo.allData)
    let defaultCar = useSelector((state) => state.homeInfo.defaultCar)
    defaultCar = defaultCar.size > 0 ? defaultCar.toJS() : null
    const tipsBarState = useSelector((state) => state.settlement.tipsBarState)

    useEffect(() => {
        allData = allData.size > 0 ? allData.toJS() : null
        if (allData && allData.length > 0) {
            skuServerList = getMantainArr(allData)
            setSkuAllArr(counttotalPrice(skuServerList))
            skuData = isHaveShop(allData)
            dispatch({
                type: 'settlement/getOspPublish',
                payload: skuData
            })
        }
    }, [allData])

    const dealgoshop = (stateNum) => {
        if (stateNum == 0) {
            let lng = getCookie('longitude') ? getCookie('longitude') : '116.34159'
            let lat = getCookie('latitude') ? getCookie('latitude') : '39.72684'
            let person_area1 = getCookie('person_area1') ? getCookie('person_area1') : '1'
            let person_area2 = getCookie('person_area2') ? getCookie('person_area2') : '2810'
            let area = person_area1 + '_' + person_area2
            let skuOther = skuAllArr[1]
            let skuSmall = skuAllArr[0]

            const resultOther = filterArr(skuOther)
            const resultSmall = filterArr(skuSmall)
            //跳转服务市场页面地址
            let str = `https://fcar.jd.com/carService/m/index.html#indexMaintain/sku:${resultOther[0].join(
                '_'
            )}/skuNum:${resultOther[1].join('_')}/prices:${resultOther[2].join('_')}/sku2:${resultSmall[0].join(
                '_'
            )}/skuNum2:${resultSmall[1].join('_')}/prices2:${resultSmall[2].join(
                '_'
            )}/area:${area}/lng:${lng}/lat:${lat}/modelId:${defaultCar.modelId}`
            // console.log(str)
            // let str = `http://fcaryf.jd.com/carService/m/index.html#indexMaintain/sku:${strArr.join('_')}/skuNum:${skuNum.join('_')}/prices:${skuprice.join('_')}/area:${area}/lng:${lng}/lat:${lat}/modelId:${this.archivesCar.modelId}`
            window.location.href = str
        } else if (stateNum == 1) {
            //没有门店
            const choseSkuObj = JSON.parse(sessionStorage.getItem('choseSkuObj'))
            const skus = choseSkuObj.choseSkuList
            addSkusToShopcar({
                skus: skus,
                success: (issuccess) => {
                    if (issuccess) {
                        Toast.toastInstance('成功加入购物车！', 1500)
                        goJdCart()
                    } else {
                        Toast.toastInstance('成功加入购物车！', 1500)
                    }
                },
                error: function () {
                    console.log('报错了')
                }
            })
        }
    }

    return (
        <React.Fragment>
            <div className='new-settlement'>
                <div className={`${tipsBarState.stateCode == 0 ? '' : 'warning'}`}>
                    <div className={`${tipsBarState.stateCode == 0 ? 'hideclass' : `${tipsBarState.activeClass}`}`}>
                        {tipsBarState.stateCode == 2
                            ? '请先选择推荐的保养项目呦~'
                            : '当地暂无门店支持所选服务，您可以单独购买相关商品~'}
                    </div>
                </div>
                <div className={`new-shop-car-div ${isIPhoneXSMax() ? 'iPhoneXSMAX' : ''}`}>
                    <div className='price-service'>
                        {skuAllArr[2] > 0 ? <span className='total-num'>共{skuAllArr[2]}件</span> : null}
                        {/* <div className='total-price'>
                            <div className='total-price-tit'>合计：￥</div>
                            <div className='price-val'>
                                <div className='price-num'>
                                    .<span className='xiaoshu'></span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div
                        className={`${
                            tipsBarState.stateCode == 2 || tipsBarState.stateCode == 4 ? 'banshop' : 'shop-check'
                        }`}
                        onClick={() => {
                            dealgoshop(tipsBarState.stateCode)
                        }}>
                        {tipsBarState.stateCode == 1 ? '加入购物车' : '去选门店'}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
})

export default Settlement
