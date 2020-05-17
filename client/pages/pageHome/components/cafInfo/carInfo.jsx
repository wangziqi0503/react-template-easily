import React, { useState, useRef, useMemo, useEffect } from 'react'
import { connect } from 'dva'
import Loading from '@/components/Loading/Loading'
import './carinfo.scss'

const mapStateToProps = (state) => {
    return {
        carListStatus: state.homeInfo.carListStatus
    }
}

const carInfo = (props) => {
    let [isCarListShow, setIsCarListShow] = useState(false)
    const changeCar = (status) => {
        props.dispatch({
            type: 'homeInfo/setCarList',
            payload: { status: status }
        })
        setIsCarListShow(status)
    }

    useMemo(() => {
        setIsCarListShow(props.carListStatus)
    }, [props.carListStatus])

    return (
        <div id='carInfo' className='top-ban space-between-r'>
            <div className='car-name'>
                <span className='car-info'>车辆信息</span>
                <div
                    className='arrow-change'
                    onClick={() => {
                        changeCar(!isCarListShow)
                    }}>
                    切换
                    {!isCarListShow ? (
                        <span className='arrow arrow-down'></span>
                    ) : (
                        <span className='arrow arrow-up'></span>
                    )}
                </div>
                <span className='car-now'>
                    {props.carList.brandName ? `${props.carList.brandName} ${props.carList.brandName}` : '车系信息'}
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
export default connect(mapStateToProps)(carInfo)
