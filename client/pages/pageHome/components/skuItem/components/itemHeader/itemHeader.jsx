import React, { useState, useEffect } from 'react'
import { connect } from 'dva'

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

    // 检查栏目下所有SKU数量是否全部为0
    const checkSkuNumber = () => {
        item.checked = checked
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
            if (checked === 1) {
                checkSkuNumber()
            }
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
            setShowType(1)
            setChecked(1)
        } else {
            setShowType(0)
            setChecked(0)
        }
    }

    useEffect(() => {
        if (checked !== -1) {
            // 检查skuNumber
            checkSkuNumber()
            item.showType = checked
            allData[index].maintenanceItemInstances[subIndex] = item
            if (checked !== -1) {
                props.dispatch({
                    type: 'homeInfo/resetAllData',
                    payload: allData
                })
            }
        }
    }, [checked])

    // 监听全局checked状态，修改havingCount数量
    useEffect(() => {
        props.item.checked === 1 ? allData[index].havingCount++ : allData[index].havingCount--
        props.item.checked === 0 ? (props.item.showType = 0) : (props.item.showType = 1)
        props.dispatch({
            type: 'homeInfo/resetAllData',
            payload: allData
        })
    }, [props.item.checked])

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
                    <span className='maintain-item-tip'></span>
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
                            display: item.discountInfo != null && item.discountInfo != '' ? 'block' : 'none'
                        }}>
                        满减
                    </p>
                    <span
                        className='maintain-item-discount'
                        style={{
                            display: item.discountInfo != null && item.discountInfo != '' ? 'block' : 'none'
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
            <div className='maintain-item-header-right' onClick={() => editShowType(item.showType)}>
                {item.showType === 1 ? <span className='edit'>编辑</span> : null}
                {item.showType === 2 ? <span className='editing'>保存</span> : null}
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(ItemHeader)
