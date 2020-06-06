import React from 'react'
import { connect } from 'dva'
import { getCookie, isNotEmpty } from '@/common/utils/Common'
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

    const choseCommodity = (commoditItem) => {
        console.log('alldata', allData)
        // 更换商品
        let goodsList =
            allData[index].maintenanceItemInstances[subIndex].relateService[relateServiceIndex].maintenanceBSkus[
                skuIndex
            ]
        let goodsItem = goodsList[this.myIndexParams.goodsIndex]
        let goodsItem2 = {}

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
                payload: data
            })
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
