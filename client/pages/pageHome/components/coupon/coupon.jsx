import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDate } from '@/common/utils/Common'
import Toast from '@/components/Toast/Toast'
import { CSSTransition } from 'react-transition-group'
import './coupon.scss'

const formatDate = (time, type) => {
    // 时间转换
    return getDate(time, type)
}
const Coupon = () => {
    const dispatch = useDispatch()
    const couponStatus = useSelector((state) => state.couponList.couponStatus)
    let couponList = useSelector((state) => state.couponList.skuCouponList)
    couponList = couponList.size > 0 ? couponList.toJS() : null

    const closeCoupon = () => {
        dispatch({
            type: 'couponList/setCouponListStatus',
            payload: false
        })
    }

    const getCoupon = (index) => {
        const data = couponList[index]
        const { roleId, encryptedKey } = data
        let newData = { roleId, encryptedKey }
        dispatch({
            type: 'couponList/getCarCoupon',
            payload: newData,
            callback: (result) => {
                Toast.toastInstance(result)
                couponList[index].isDraw = true
                dispatch({
                    type: 'couponList/setCouponList',
                    payload: couponList
                })
            }
        })
    }
    return (
        <React.Fragment>
            {couponStatus ? <div className='mask-fade'></div> : null}
            {couponStatus ? (
                <CSSTransition in={true} timeout={1000} classNames='show' unmountOnExit appear={true}>
                    <div className='coupon-list' id='coupon-box'>
                        <div className='coupon-list__content'>
                            <p className='coupon-list__title space-between-r'>
                                <span>优惠券</span>
                                <img
                                    src={require('../../../../common/assets/close-car.png')}
                                    className='close-img'
                                    onClick={closeCoupon}
                                />
                            </p>
                            <ul className='coupon-list__all'>
                                {couponList
                                    ? couponList.map((item, index) => {
                                          return (
                                              <li className='coupon-list__item space-between-r' key={index}>
                                                  <div className='item-left'>
                                                      <p className='price'>
                                                          <span className='rmb'>￥</span>
                                                          <span className='discount'>{item.discount}</span>
                                                      </p>
                                                      <span className='quota'>{`满${item.quota}`}</span>
                                                  </div>
                                                  <div className='item-right space-between-r'>
                                                      <div className='coupon-info space-between-c'>
                                                          <p>
                                                              <span className='type'>
                                                                  {item.couponType == 0
                                                                      ? '京券'
                                                                      : item.couponType == 1
                                                                      ? '东券'
                                                                      : '免运费券'}
                                                              </span>
                                                              <span className='name'>{item.name}</span>
                                                          </p>
                                                          <p className='time'>{`${formatDate(
                                                              item.beginTime,
                                                              'ymd'
                                                          )} - ${formatDate(item.endTime, 'ymd')}`}</p>
                                                      </div>
                                                      {item.isDraw ? (
                                                          <span className='btn received' v-if=''>
                                                              已领取
                                                          </span>
                                                      ) : (
                                                          <span
                                                              className='btn'
                                                              onClick={() => {
                                                                  getCoupon(index)
                                                              }}>
                                                              点击领取
                                                          </span>
                                                      )}
                                                  </div>
                                              </li>
                                          )
                                      })
                                    : null}
                            </ul>
                        </div>
                    </div>
                </CSSTransition>
            ) : null}
        </React.Fragment>
    )
}

export default Coupon
