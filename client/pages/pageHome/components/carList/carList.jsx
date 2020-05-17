import React from 'react'
import { useState } from 'react'
import { connect } from 'dva'
import { CSSTransition } from 'react-transition-group'
import './carList.scss'

const CarList = (props) => {
    const { fullImg } = window.common

    // 关闭车列表弹窗
    const closeList = (event) => {
        // 判断点击区域，点击列表外或X则关闭
        const tagName = event.target.getAttribute('data-type')
        if (tagName === 'carlist-shade' || tagName === 'carlist-close') {
            props.dispatch({
                type: 'homeInfo/setCarList',
                payload: { status: false }
            })
        }
    }

    // 更换默认车辆
    const setDefaultCar = (e, item) => {
        e.stopPropagation()
        console.log('itemId==', item.id)
    }

    return (
        <div className='new-car-list-shade' data-type='carlist-shade' onClick={closeList}>
            <CSSTransition in={props.carListStatus} timeout={1000} classNames='show' unmountOnExit appear={true}>
                <div className='car-list'>
                    <div className='car-tit'>
                        <span className='title'>更换车辆</span>
                        <span className='car-manage'>爱车管理</span>
                        <span className='close' onClick={closeList} data-type='carlist-close'></span>
                    </div>
                    <ul className='content'>
                        {console.log(props)}
                        {props.carList.map((item, index) => {
                            return (
                                <li
                                    className={`car-con ${item.defaultCar === 1 ? 'current' : null}`}
                                    key={index}
                                    onClick={(e) => setDefaultCar(e, item)}>
                                    <img src={fullImg(item.logoUrl)} />
                                    <div className='car-info'>
                                        {item.defaultCar === 1 ? <span className='car-default-tag'>默认</span> : null}
                                        <span className='car-des'>
                                            {item.brandName + '-' + item.seriesName + ' '}
                                            {item.seriesYear ? item.seriesYear + '款' : ''}
                                            {item.modelName || ''}
                                        </span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <div className='add-car'>添加爱车</div>
                </div>
            </CSSTransition>
        </div>
    )
}
export default connect()(CarList)
