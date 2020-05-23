import React, { useEffect, useState } from 'react'
import { connect } from 'dva'
const mapStateToProps = (state) => {
    return {
        allData: state.homeInfo.allData
    }
}
const ItemPrice = (props) => {
    const { item, sku, index, subIndex, relateServiceIndex, skuIndex } = props
    const [num, setNum] = useState(-1)
    const allData = props.allData.toJS()

    // 加减商品数量
    const addNum = (type) => {
        type === 'add' ? sku.skuNumber++ : sku.skuNumber--
        setNum(sku.skuNumber)
    }
    useEffect(() => {
        if (num !== -1) {
            allData[index].maintenanceItemInstances[subIndex].relateService[relateServiceIndex].maintenanceBSkus[
                skuIndex
            ] = sku
            props.dispatch({
                type: 'homeInfo/saveAllData',
                payload: allData
            })
        }
    }, [num])

    return (
        <div className='maintain-item-goods-number-show'>
            {sku.carBSku.mJdPrice == '暂无报价' || sku.carBSku.mJdPrice == null ? (
                <span className='maintain-item-goods-price-flag hide'>¥</span>
            ) : (
                <span className='maintain-item-goods-price-flag'>¥</span>
            )}
            {sku.carBSku.mJdPrice == '暂无报价' || sku.carBSku.mJdPrice == null ? (
                <span className='maintain-item-goods-price'>暂无报价</span>
            ) : (
                <span className='maintain-item-goods-price'>{sku.carBSku.mJdPrice}</span>
            )}
            {item.showType == 1 ? (
                <div className='maintain-item-goods-num-flag'>
                    X<span className='maintain-item-goods-num'>{sku.skuNumber}</span>
                </div>
            ) : null}
            {item.showType === 2 ? (
                <div className='maintain-item-goods-change'>
                    <div className='maintain-item-goods-number-change'>
                        <div
                            className='number-change add-number J_ping'
                            onClick={() => {
                                addNum('add')
                            }}>
                            +
                        </div>
                        <span className='number-show'>{sku.skuNumber}</span>
                        {sku.skuNumber <= 1 ? (
                            <div className='number-change sub-number gray'>-</div>
                        ) : (
                            <div
                                className='number-change sub-number J_ping'
                                onClick={() => {
                                    addNum('remove')
                                }}>
                                -
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
            {sku.carBSku.complimentarySkuNames != null && sku.carBSku.complimentarySkuNames != '' ? (
                <div className='maintain-item-goods-gift'>
                    <span className='gift-icon'>赠</span>
                    {sku.carBSku.complimentarySkuNames}
                </div>
            ) : null}
        </div>
    )
}

export default connect(mapStateToProps)(ItemPrice)
