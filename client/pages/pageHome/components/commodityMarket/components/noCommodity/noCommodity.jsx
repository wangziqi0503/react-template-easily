import React from 'react'
import './noCommodity.scss'
import '../../../../../../common/assets/default_icon.png'

const NoCommodity = () => {
    const imgUrl = '../../../../../../common/assets/default_icon.png'
    return (
        <div className='no-data'>
            <div className='top-interest'>
                <img src={imgUrl} className='iconImg' />
                <div className='not-content-txt'>
                    <span className='sorry'>对不起 暂无此车品</span>
                </div>
            </div>
            <div className='feedback'>
                <div className='feedback-to'>点我反馈</div>
            </div>
        </div>
    )
}

export default NoCommodity