import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './carinfo.scss'

const carInfo = () => {
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
                <span className='car-now'>车系名称</span>
            </div>
            <div className='car-msg'>
                <span className='mile-info'>行驶里程</span>
                <div className='mile-edit'>
                    编辑
                    <span className='edit'></span>
                </div>
                <span className='mile'>100</span>
                <span className='edit-btn'></span>
            </div>
        </div>
    )
}

export default carInfo
