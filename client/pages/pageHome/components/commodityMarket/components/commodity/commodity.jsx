import React from 'react'
import { connect } from 'dva'
import { getCookie, isNotEmpty, filterPrice } from '@/common/utils/Common'
import { querySkuPrice, getDiscountAndFree } from '@/api/home'
import './commodity.scss'

const mapStateToProps = (state) => {
    return {
        skuData: state.commodiy.skuData,
        defaultCar: state.homeInfo.defaultCar,
        indexArr: state.commodiy.indexArr,
        allData: state.homeInfo.allData
    }
}

const Commodity = (props) => {
    const commodity = props.data
    const defaultCar = props.defaultCar.size > 0 ? props.defaultCar.toJS() : null
    const indexArr = props.indexArr.size > 0 ? props.indexArr.toJS() : null
    const allData = props.allData.size > 0 ? props.allData.toJS() : null
    const [index, subIndex, relateServiceIndex, skuIndex] = [...indexArr]

    // 关闭更换商品弹窗
    const closeMaker = () => {
        props.dispatch({
            type: 'commodiy/setStatus',
            payload: false
        })
        props.dispatch({
            type: 'commodiy/setPage',
            payload: 0
        })
        props.dispatch({
            type: 'commodiy/setIsAll',
            payload: false
        })
        sessionStorage.removeItem('LOCAL_FILTER_DATA')
        sessionStorage.removeItem('LOCAL_PRICE_RANGE')
        sessionStorage.removeItem('LOCAL_SHOW_TAG')
    }
    // 选取满减信息
    const fullScale = () => {
        let goodsItem =
            allData[index].maintenanceItemInstances[subIndex].relateService[relateServiceIndex].maintenanceBSkus[
                skuIndex
            ]
        let skuArr =
            allData[index].maintenanceItemInstances[subIndex].relateService[relateServiceIndex].maintenanceBSkus
        let skuArr2 = []
        let skuList =
            allData[index].maintenanceItemInstances[subIndex].relateService[relateServiceIndex].maintenanceBSkus
        skuArr.forEach((item) => {
            if (item.carBSku.sku && item.carBSku.sku != '') {
                if (item.skuNumber != 0) {
                    skuArr2.push(item.carBSku.sku)
                }
            }
        })
        const data = {
            provinceCode: getCookie('person_area1'),
            skuIds: skuArr2.join(','),
            lng: getCookie('longitude') ? getCookie('longitude') : '',
            lat: getCookie('latitude') ? getCookie('latitude') : '',
            cityCode: getCookie('person_area2') ? getCookie('person_area2') : '',
            areaCode: getCookie('person_area3') ? getCookie('person_area3') : ''
        }
        getDiscountAndFree(data).then((res) => {
            if (res.code == 0) {
                if (isNotEmpty(res.data)) {
                    if (isNotEmpty(res.data.discounts) && res.data.discounts != null) {
                        allData[index].maintenanceItemInstances[subIndex].discountInfo = res.data.discounts
                    } else {
                        allData[index].maintenanceItemInstances[subIndex].discountInfo = null
                    }

                    //优惠券
                    allData[index].maintenanceItemInstances[subIndex].skuCouponFlag = res.data.skuCouponFlag

                    if (res.data.skuFreeInstalls) {
                        res.data.skuFreeInstalls.forEach((element, index) => {
                            if (element.freeInstall) {
                                if (element.skuId == goodsItem.carBSku.sku) {
                                    skuList[index].carBSku.freeInstall = element.freeInstall
                                }
                            } else {
                                skuList[index].carBSku.freeInstall = false
                            }
                            skuList[index].carBSku.complimentarySkuNames =
                                res.data.skuFreeInstalls[index].complimentarySkuNames
                        })
                    }
                }
                props.dispatch({
                    type: 'homeInfo/saveAllData',
                    payload: allData
                })
                closeMaker()
            }
        })
    }

    // 选择更换的商品
    const choseCommodity = (commoditItem) => {
        // 更换商品
        let goodsList =
            allData[index].maintenanceItemInstances[subIndex].relateService[relateServiceIndex].maintenanceBSkus[
                skuIndex
            ]
        let goodsItem2 = {}
        goodsList.carBSku = commoditItem
        // 如果更换的商品为火花塞或者机油则调用sku补全接口，进行sku补全
        if (commoditItem.cid3 == '6767' || commoditItem.cid3 == '11849') {
            let extAttrs = ''
            if (commoditItem.cid3 == '6767') {
                // 火花塞
                commoditItem.extAttrList.forEach((item) => {
                    if (item.labelId == 3237 || item.labelId == 2762) {
                        extAttrs += item.labelId + '-' + item.valId + ','
                    }
                })
                extAttrs = extAttrs.substring(0, extAttrs.length - 1)
            } else {
                // 机油
                commoditItem.extAttrList.forEach((item) => {
                    if (item.labelId == 1107 || item.labelId == 3382 || item.labelId == 4835 || item.labelId == 1948) {
                        extAttrs += item.labelId + '-' + item.valId + ','
                    }
                })
                extAttrs = extAttrs.substring(0, extAttrs.length - 1)
            }
            // sku补全接口需要的参数
            let data = {
                modelId: defaultCar.modelId,
                provinceCode: getCookie('person_area1'),
                cityCode: getCookie('person_area2'),
                areaCode: getCookie('person_area3'),
                extAttrs: extAttrs,
                cid3: commoditItem.cid3,
                brandId: commoditItem.brandId,
                oilFillingQuantity: defaultCar.oilFillingQuantity,
                cylinders: defaultCar.cylinders,
                name: commoditItem.name,
                spec: commoditItem.spec || ''
            }

            props.dispatch({
                type: 'commodiy/getSkuMakeUp',
                payload: data,
                callback: (data) => {
                    goodsList.skuNumber = data.mainSkuNum
                    // 如果sku补全中有商品
                    if (isNotEmpty(data.subSku)) {
                        goodsItem2.carBSku = data.subSku
                        goodsItem2.skuNumber = data.subSkuNum
                        goodsItem2.id = goodsList.id
                        // 查询实时价格，并替换保养项目中的车品价格
                        let goodsSkuArr = [data.subSku.sku]
                        let goodsPriceArr
                        if (isNotEmpty(goodsSkuArr)) {
                            // 调用价格接口
                            querySkuPrice(goodsSkuArr)
                                .then((result) => {
                                    var goodsArr = []
                                    if (result != null && result.length > 0) {
                                        goodsArr = result
                                    }
                                    goodsPriceArr = filterPrice ? filterPrice(goodsArr) : ''
                                    goodsItem2.carBSku.mJdPrice = goodsPriceArr[0].p
                                    goodsList = [goodsList, goodsItem2]
                                    const oldArr =
                                        allData[index].maintenanceItemInstances[subIndex].relateService[
                                            relateServiceIndex
                                        ].maintenanceBSkus
                                    oldArr.splice(0, oldArr.length - 1, ...goodsList)
                                    fullScale()
                                    return false
                                })
                                .catch((error) => {
                                    fullScale()
                                    return false
                                })
                        }
                    } else {
                        let newGoodlist =
                            allData[index].maintenanceItemInstances[subIndex].relateService[relateServiceIndex]
                                .maintenanceBSkus
                        newGoodlist.forEach((item, newIndex) => {
                            if (item.id === newGoodlist[newIndex].id && newIndex !== index) {
                                newGoodlist.splice(newIndex, 1)
                            }
                        })
                        fullScale()
                        return false
                    }
                }
            })
        } else {
            goodsList.skuNumber = 1
            fullScale()
            return false
        }
    }
    return (
        <div className='commodity-item'>
            <div className='goods-img'>
                <img
                    src={`//m.360buyimg.com/tcar/s240x240_${commodity.mainImage}!q60`}
                    className='lazy'
                    style={{ display: 'inline' }}
                />
                {commodity.mark == 1 ? <div className='origin-tag'>原厂件</div> : null}
            </div>
            <div className='goods-info-wrap'>
                <div className='goods-name'>
                    <span className='title'>{commodity.name}</span>
                </div>
                <div className='goods-content'>
                    <div className='goods-price'>
                        <span
                            className='price-str'
                            style={{
                                display:
                                    commodity.mJdPrice != 'null' &&
                                    commodity.mJdPrice != null &&
                                    commodity.mJdPrice != '暂无报价'
                                        ? 'inline-block'
                                        : ''
                            }}>
                            ¥
                        </span>
                        <span className='price'>{commodity.mJdPrice}</span>
                        {commodity.pinCount ? (
                            <span className='same-car-people'>{commodity.pinCount}位同款车主已买</span>
                        ) : null}
                    </div>
                    <div className='goods-comment'>
                        {commodity.self ? (
                            <span style={{ display: 'inline-block' }} className='goods-comment-span1'>
                                自营
                            </span>
                        ) : null}
                        {commodity.goodRate ? (
                            <span className='goods-comment-span3'>{(commodity.goodRate * 100).toFixed(0)}%好评</span>
                        ) : null}
                    </div>
                </div>
            </div>
            <div
                className='selectBtn'
                onClick={() => {
                    choseCommodity(commodity)
                }}>
                选择
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Commodity)
