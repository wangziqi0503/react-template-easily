import React from 'react'
import { useSelector } from 'react-redux'
import './loadState.scss'

const LoadState = () => {
    const isAll = useSelector((state) => state.commodiy.isAll)
    const loadStatus = useSelector((state) => state.commodiy.loadStatus)

    return (
        <div className='load-state'>
            {/* <div className='loadingmore'>加载失败,滑动重试</div> */}
            {isAll ? <div className='loadingmore'>数据全部加载完毕</div> : null}
            {loadStatus ? <div className='loadingmore'>数据加载中...</div> : null}
        </div>
    )
}

export default LoadState
