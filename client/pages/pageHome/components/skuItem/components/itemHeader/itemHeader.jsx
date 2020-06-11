import React, { useState, useEffect } from 'react'
import { connect } from 'dva'
import { getCookie, isNotEmpty } from '@/common/utils/Common'
const mapStateToProps = (state) => {
    return {
        allData: state.homeInfo.allData
    }
}

// 校验当前保养项目下全部sku数量都为0方法
const checkAdult = (item) => {
    return item.skuNumber === 0
}

const ItemHeader = (props) => {
    const allData = props.allData.size > 0 ? props.allData.toJS() : null
    const item = props.item
    const { index, subIndex } = props
    const [showType, setShowType] = useState(-1)
    const [checked, setChecked] = useState(-1)

    // 若当前栏目sku全部删除，则将当前栏目下sku的skuNmuber置为1，否则不进行处理
    const checkSkuNumber = () => {
        item.relateService.forEach((items, i) => {
            if (items.maintenanceBSkus.every(checkAdult)) {
                items.maintenanceBSkus.forEach((subItem, j) => {
                    if (subItem.skuNumber === 0) {
                        item.relateService[i].maintenanceBSkus[j].skuNumber = checked
                    }
                })
            }
        })
    }
    // 获取满减接口所需参数
    const getFreeParams = () => {
        let skuArr = []
        let maintenanceBSkusArr = []

        item.relateService.forEach((ele, i) => {
            maintenanceBSkusArr = ele.maintenanceBSkus
            ele.maintenanceBSkus.forEach((item, index) => {
                if (item.skuNumber !== 0) {
                    skuArr.push(item.carBSku.sku)
                }
            })
        })
        const data = {
            provinceCode: getCookie('person_area1'),
            skuIds: skuArr.join(','),
            lng: getCookie('longitude') ? getCookie('longitude') : '',
            lat: getCookie('latitude') ? getCookie('latitude') : '',
            cityCode: getCookie('person_area2') ? getCookie('person_area2') : '',
            areaCode: getCookie('person_area3') ? getCookie('person_area3') : ''
        }
        const SkuData = {
            skuArr,
            maintenanceBSkusArr,
            data
        }

        return SkuData
    }

    // 编辑保存切换
    const editShowType = (showType) => {
        if (showType === 1) {
            setShowType(2)
        } else if (showType === 2) {
            setShowType(1)
        }
    }

    useEffect(() => {
        if (showType !== -1) {
            item.showType = showType
            allData[index].maintenanceItemInstances[subIndex] = item
            props.dispatch({
                type: 'homeInfo/saveAllData',
                payload: allData
            })
        }
    }, [showType])

    // 改变checked状态
    const changeChecked = (checked) => {
        if (checked === 0) {
            setChecked(1)
        } else {
            setChecked(0)
        }
    }

    useEffect(() => {
        if (checked !== -1) {
            item.checked = checked
            checkSkuNumber()
            if (checked === 1) {
                item.showType = 1
                const getParmas = getFreeParams()
                props.dispatch({
                    type: 'homeInfo/getDiscount',
                    payload: getParmas.data,
                    callback: (res) => {
                        if (res.code === '0') {
                            // 满减
                            if (isNotEmpty(res.data.discounts) && res.data.discounts != null) {
                                item.discountInfo = res.data.discounts
                            }
                            // // 免费安装
                            if (res.data.skuFreeInstalls) {
                                res.data.skuFreeInstalls.forEach((element, index) => {
                                    if (element.freeInstall) {
                                        if (element.skuId == getParmas.skuArr[index]) {
                                            getParmas.maintenanceBSkusArr[index].carBSku.freeInstall =
                                                element.freeInstall
                                        }
                                    } else {
                                        getParmas.maintenanceBSkusArr[index].carBSku.freeInstall = false
                                    }
                                    getParmas.maintenanceBSkusArr[index].carBSku.complimentarySkuNames =
                                        res.data.skuFreeInstalls[index].complimentarySkuNames
                                })
                            }
                            // 优惠券显示与否
                            item.skuCouponFlag = res.data.skuCouponFlag
                        }
                        allData[index].havingCount++
                        allData[index].maintenanceItemInstances[subIndex] = item

                        props.dispatch({
                            type: 'homeInfo/resetAllData',
                            payload: allData
                        })
                    }
                })
            } else {
                allData[index].havingCount--
                allData[index].maintenanceItemInstances[subIndex] = item
                if (checked !== -1) {
                    props.dispatch({
                        type: 'homeInfo/resetAllData',
                        payload: allData
                    })
                }
            }
        }
    }, [checked])

    // 监听itemEdit组件将checked置0时处理
    useEffect(() => {
        // 加一层判断，初始化时不执行setChecked
        if (checked !== -1) {
            if (props.item.checked === 1) {
                setChecked(1)
                setShowType(1)
            } else {
                setChecked(0)
            }
        }
    }, [props.item.checked])

    // 展示项目说明
    const showTip = (item) => {
        props.dispatch({
            type: 'introduce/setIntroduceData',
            payload: item
        })
        props.dispatch({
            type: 'introduce/setIntroduceStatus',
            payload: true
        })
    }

    return (
        <div className='maintain-item-header'>
            <div className='header-bg' style={{ display: item.checked === 1 ? 'block' : 'none' }}></div>
            <div className='maintain-item-header-left'>
                <input
                    type='checkbox'
                    className='goods-check'
                    checked={item.checked === 1}
                    onChange={() => {
                        changeChecked(item.checked)
                    }}
                />
            </div>
            <div className='maintain-item-header-middle'>
                <div className='maintain-item-header-middle-top'>
                    <span className='maintain-item-title'>{item.name}</span>
                    <span
                        className='maintain-item-tip'
                        onClick={() => {
                            showTip(item)
                        }}></span>
                    {item.emergency === 1 || item.emergency === 2 ? (
                        <span className='maintain-item-status-icon'></span>
                    ) : null}
                    {item.emergency === 0 ? <span className='maintain-item-status-text'></span> : null}
                    {item.emergency === 1 ? <span className='maintain-item-status-text'>紧急</span> : null}
                    {item.emergency === 2 ? <span className='maintain-item-status-text'>非常紧急</span> : null}
                </div>
                <div className='maintain-item-header-middle-center'>
                    <span className='maintain-item-describe'>{item.intervalStr}</span>
                </div>
                <div
                    className='maintain-item-header-middle-bottom'
                    style={{
                        display: item.checked === 1 ? 'block' : 'none'
                    }}>
                    <p
                        className='discount-icon'
                        style={{
                            display: item.discountInfo !== null && item.discountInfo !== '' ? 'flex' : 'none'
                        }}>
                        满减
                    </p>
                    <span
                        className='maintain-item-discount'
                        style={{
                            display: item.discountInfo != null && item.discountInfo != '' ? 'inline-block' : 'none'
                        }}>
                        {item.discountInfo}
                    </span>
                    <span
                        className='discount-icon-text'
                        style={{
                            display: item.skuCouponFlag != null && item.skuCouponFlag ? 'block' : 'none'
                        }}>
                        优惠券
                    </span>
                </div>
            </div>
            {item.checked === 1 ? (
                <div className='maintain-item-header-right' onClick={() => editShowType(item.showType)}>
                    {item.showType === 1 ? <span className='edit'>编辑</span> : null}
                    {item.showType === 2 ? <span className='editing'>保存</span> : null}
                </div>
            ) : null}
        </div>
    )
}

export default connect(mapStateToProps)(ItemHeader)
