import React from 'react'
import './coupon.scss'

const Coupon = () => {
    return (
        <React.Fragment>
            <div className='coupon-list' id='coupon-box'>
                <div className='coupon-list__content'>
                    <p className='coupon-list__title space-between-r'>
                        <span>优惠券</span>
                        <img src={require('../../../../common/assets/close-car.png')} className='close-img' />
                    </p>
                    <ul className='coupon-list__all'>
                        <li className='coupon-list__item space-between-r'>
                            <div className='item-left'>
                                <p className='price'>
                                    <span className='rmb'>￥</span>
                                    <span className='discount'></span>
                                </p>
                                <span className='quota'></span>
                            </div>
                            <div className='item-right space-between-r'>
                                <div className='coupon-info space-between-c'>
                                    <p>
                                        <span className='type'></span>
                                        <span className='name'></span>
                                    </p>
                                    <p className='time'></p>
                                </div>
                                <span className='btn received' v-if='item.isDraw'>
                                    已领取
                                </span>
                                <span className='btn'>点击领取</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Coupon
