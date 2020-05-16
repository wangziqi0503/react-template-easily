import React from 'react'
import { useState } from 'react'
import { connect } from 'dva'
import { CSSTransition } from 'react-transition-group'
import './carList.scss'

const CarList = (props) => {
    let [show, setShow] = useState(false)
    // setTimeout(() => {
    //     setShow(true)
    // }, 0)
    // let status = false
    // status = props.carListStatus
    return (
        <div className='new-car-list-shade'>
            <button
                style={{ position: 'absolute', zIndex: 3000 }}
                onClick={() => {
                    setShow(true)
                }}>
                点我
            </button>

            <CSSTransition in={props.carListStatus} timeout={600} classNames='show' unmountOnExit appear={true}>
                <div className='car-list'>
                    <div className='car-tit'>
                        <span className='title'>更换车辆</span>
                        <span className='car-manage'>爱车管理</span>
                        <span className='close'></span>
                    </div>
                    <ul className='content'>
                        <li className='car-con' v-for='(item, index) in carList' v-if='item.defaultCar == 1'>
                            <img />
                            <div className='car-info'>
                                <span className='car-default-tag'>默认</span>
                                <span className='car-des'></span>
                            </div>
                        </li>
                        <li className='car-con' v-for='(item, index) in carList' v-if='item.defaultCar == 0'>
                            <img />
                            <div className='car-info'>
                                <span className='car-des'></span>
                            </div>
                        </li>
                    </ul>
                    <div className='add-car'>添加爱车</div>
                </div>
            </CSSTransition>
        </div>
    )
}
export default CarList
