import React from 'react'
import { connect } from 'dva'
import './commodity.scss'

const mapStateToProps = (state) => {
    return {
        skuData: state.commodiy.skuData
    }
}

const Commodity = (props) => {
    const commodity = props.data
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
            <div className='selectBtn'>选择</div>
        </div>
    )
}

export default connect(mapStateToProps)(Commodity)
