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
    const carList = props.carList.size > 0 ? props.carList.toJS() : null
    const topBan = useRef(null)
    let [isCarListShow, setIsCarListShow] = useState(false)
    const changeCar = (status) => {
        props.dispatch({
            type: 'homeInfo/setCarList',
            payload: { status: status }
        })
        setIsCarListShow(status)
    }

    useEffect(() => {
        props.dispatch({
            type: 'carInfo/getTopBanHeight',
            payload: topBan.current.clientHeight
        })
    }, [])

    useMemo(() => {
        setIsCarListShow(props.carListStatus)
    }, [props.carListStatus])

    return (
        <div id='carInfo' className='top-ban space-between-r' ref={topBan}>
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
                <span className='car-now'>{carList ? `${carList.brandName} ${carList.seriesName}` : '车系信息'}</span>
            </div>
            <div className='car-msg'>
                <span className='mile-info'>行驶里程</span>
                <div className='mile-edit'>
                    编辑
                    <span className='edit'></span>
                </div>
                <span className='mile'>{carList && carList.mileage ? `${carList.mileage} 公里` : '待完善'}</span>
                <span className='edit-btn'></span>
            </div>
        </div>
    )
}
export default connect(mapStateToProps)(carInfo)
