import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './introduce.scss'

const Introduce = () => {
    const dispatch = useDispatch()
    const isShow = useSelector((state) => state.introduce.introduceStatus)
    const data = useSelector((state) => state.introduce.introduceData)
    const closeDialog = () => {
        dispatch({
            type: 'introduce/setIntroduceData',
            payload: {}
        })
        dispatch({
            type: 'introduce/setIntroduceStatus',
            payload: false
        })
    }
    return (
        <React.Fragment>
            {isShow ? (
                <div className='popup'>
                    <div className='content'>
                        <div className='off-btn' onClick={closeDialog}></div>
                        <div className='serve-title'>{data.name}</div>
                        <div className='serve-tips'>{data.intervalStr}</div>
                        <div className='serve-intrudes'>{data.introduce}</div>
                    </div>
                </div>
            ) : null}
        </React.Fragment>
    )
}

export default Introduce
