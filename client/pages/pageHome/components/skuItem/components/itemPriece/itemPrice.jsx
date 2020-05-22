import React, { useMemo } from 'react'
import { connect } from 'dva'
const mapStateToProps = (state) => {
    return {
        allData: state.homeInfo.allData
    }
}
const ItemPrice = (props) => {
    console.log('ItemPrice')
    const { item, sku } = props
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
                        <div className='number-change add-number J_ping' report-eventid='MCarSteward_SelfService_Add'>
                            +
                        </div>
                        <span className='number-show'>{sku.skuNumber}</span>
                        {sku.skuNumber <= 1 ? (
                            <div className='number-change sub-number gray'>-</div>
                        ) : (
                            <div className='number-change sub-number J_ping'>-</div>
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
