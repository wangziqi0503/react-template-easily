import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './carList.scss'
const CarList = (props) => {
    return (
        <div className='new-car-list-shade'>
            <div className='car-list'>
                <div className='car-tit'>
                    <span className='title'>更换车辆</span>
                    <span className='car-manage'>爱车管理</span>
                    <span className='close'></span>
                </div>
                <ul class='content'>
                    <li class='car-con' v-for='(item, index) in carList' v-if='item.defaultCar == 1'>
                        <img />
                        <div class='car-info'>
                            <span class='car-default-tag'>默认</span>
                            <span class='car-des'></span>
                        </div>
                    </li>
                    <li class='car-con' v-for='(item, index) in carList' v-if='item.defaultCar == 0'>
                        <img />
                        <div class='car-info'>
                            <span class='car-des'></span>
                        </div>
                    </li>
                </ul>
                <div class='add-car'>添加爱车</div>
            </div>
        </div>
    )
}
export default CarList
