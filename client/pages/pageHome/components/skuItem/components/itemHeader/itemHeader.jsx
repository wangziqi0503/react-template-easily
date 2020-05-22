import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'dva'

const mapStateToProps = (state) => {
    return {
        allData: state.homeInfo.allData
    }
}

const ItemHeader = (props) => {
    const allData = JSON.parse(JSON.stringify(props.allData))
    const item = JSON.parse(JSON.stringify(props.item))
    // const allData = [...props.allData]
    // const item = props.item
    // const item = props.item
    // console.log('item===', props)
    const [showType, setShowType] = useState(1)

    const editShowType = () => {
        if (showType === 1) {
            console.log('here')
            setShowType(2)
        } else if (showType === 2) {
            setShowType(1)
        }
    }

    useEffect(() => {
        item.showType = showType
        allData[props.index].maintenanceItemInstances[props.subIndex] = item
        props.dispatch({
            type: 'homeInfo/saveAllData',
            payload: allData
        })
    }, [showType])

    return (
        <div className='maintain-item-header'>
            <div className='header-bg' style={{ display: item.checked === 1 ? 'block' : 'none' }}></div>
            <div className='maintain-item-header-left'>
                <input
                    type='checkbox'
                    className='goods-check J_ping'
                    checked={item.checked === 1}
                    onChange={() => {
                        console.log('aaa')
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
            <div className='maintain-item-header-right' onClick={editShowType}>
                {item.showType === 1 ? <span className='edit J_ping'>编辑</span> : null}
                {item.showType === 2 ? <span className='editing'>保存</span> : null}
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(ItemHeader)
