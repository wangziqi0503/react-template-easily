import React, { useState, useRef, useMemo } from 'react'
import './carinfo.scss'

const carInfo = (props) => {
    console.log('props==', props.carList)
    let [isCarListShow, setIsCarListShow] = useState(false)
    return (
        <div id='carInfo' className='top-ban space-between-r'>
            <div className='car-name'>
                <span className='car-info'>车辆信息</span>
                <div className='arrow-change'>
                    切换
                    {!isCarListShow ? (
                        <span className='arrow arrow-down'></span>
                    ) : (
                        <span className='arrow arrow-up'></span>
                    )}
                </div>
                <span className='car-now'>
                    {props.carList.brandName ? `${props.carList.brandName} ${props.carList.seriesName}` : '车系信息'}
                </span>
            </div>
            <div className='car-msg'>
                <span className='mile-info'>行驶里程</span>
                <div className='mile-edit'>
                    编辑
                    <span className='edit'></span>
                </div>
                <span className='mile'>{props.carList.mileage ? props.carList.mileage : 0}</span>
                <span className='edit-btn'></span>
            </div>
        </div>
    )
}

export default React.memo(carInfo)
